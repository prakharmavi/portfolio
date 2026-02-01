"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LuVolume2, LuSquare } from "react-icons/lu";

type Props = {
  text: string; // What to speak
  phonetic?: string; // e.g., "pruh-KHAR MAH-vee"
  className?: string;
  audioSrc?: string; // Optional pre-recorded audio for consistent playback
  voiceName?: string; // Optional preferred voice name pattern
  fallbackTTS?: boolean; // If true, fall back to speechSynthesis when audio missing
};

export default function PronunciationButton({ text, phonetic, className, audioSrc = "/pronunciation.mp3", voiceName, fallbackTTS = false }: Props) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cancelledRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioReady, setAudioReady] = useState(false);

  // Detect support and load voices
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const synth = window.speechSynthesis;
    const loadVoices = () => setVoices(synth.getVoices());
    loadVoices();
    synth.onvoiceschanged = loadVoices;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  const voice = useMemo(() => {
    if (!voices.length) return undefined;
    const en = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
    // If a specific voice pattern is desired, try to match it
    if (voiceName) {
      const match = voices.find((v) => v.name.toLowerCase().includes(voiceName.toLowerCase()));
      if (match) return match;
    }
    // Prefer a neural/enhanced voice if available
    return en.find((v) => /google|enhanced|neural/i.test(v.name)) || en[0] || voices[0];
  }, [voices, voiceName]);

  // Try preloading an optional audio file for consistent playback across devices
  useEffect(() => {
    if (!audioSrc) return;
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = audioSrc;
    const onReady = () => setAudioReady(true);
    const onError = () => setAudioReady(false);
    audio.addEventListener("canplaythrough", onReady, { once: true });
    audio.addEventListener("error", onError, { once: true });
    audioRef.current = audio;
    return () => {
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("error", onError);
      if (!audio.paused) audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  function stop() {
    if (!supported) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    setSpeaking(false);
    cancelledRef.current = true;
    // Stop audio if playing
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      try { audio.currentTime = 0; } catch {}
    }
  }

  function speak() {
    if (!supported) return;
    try {
      stop();
      cancelledRef.current = false;
      // Prefer pre-recorded audio if available for consistent pronunciation
      const audio = audioRef.current;
      if (audio && audioReady) {
        setSpeaking(true);
        audio.onended = () => setSpeaking(false);
        audio.play().catch(() => setSpeaking(false));
        return;
      }
      if (!fallbackTTS) {
        // No fallback requested; do nothing if audio isn't available
        return;
      }
      // Fallback: Split first and last name for a small pause between
      const firstSpace = text.indexOf(" ");
      const segments =
        firstSpace > -1
          ? [text.slice(0, firstSpace), text.slice(firstSpace + 1)]
          : [text];

      const speakSegment = (i: number) => {
        if (cancelledRef.current || i >= segments.length) {
          setSpeaking(false);
          return;
        }
        // Normalize for TTS: avoid hyphens causing letter spelling, tweak vowels
        const segRaw = segments[i].trim();
        let segSpeak = segRaw.replace(/-/g, " ");
        // Specific tweak for common patterns
        segSpeak = segSpeak.replace(/\bMaa\b/gi, "Mah");
        const u = new SpeechSynthesisUtterance(segSpeak);
        u.rate = 0.8; // slower for clarity
        u.pitch = 1.0;
        if (voice?.lang) u.lang = voice.lang;
        else u.lang = "en-US";
        if (voice) u.voice = voice;
        u.onstart = () => setSpeaking(true);
        u.onerror = () => setSpeaking(false);
        u.onend = () => {
          if (i < segments.length - 1) {
            // brief pause before next segment
            setTimeout(() => speakSegment(i + 1), 250);
          } else {
            setSpeaking(false);
          }
        };
        utterRef.current = u;
        window.speechSynthesis.speak(u);
      };

      speakSegment(0);
    } catch {
      // no-op
    }
  }

  return (
    <div className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <button
        type="button"
        onClick={speaking ? stop : speak}
        className="inline-flex items-center justify-center rounded-full border border-gray-300 text-gray-700 size-8 focus:outline-hidden"
        aria-label={speaking ? "Stop pronunciation" : `Hear pronunciation`}
        title={phonetic ? `Pronounced: ${phonetic}` : "Hear pronunciation"}
      >
        {speaking ? (
          <LuSquare className="size-4" aria-hidden />
        ) : (
          <LuVolume2 className="size-4" aria-hidden />
        )}
      </button>
      {phonetic ? (
        <span className="hidden md:inline text-sm text-gray-500" aria-hidden>
          {phonetic}
        </span>
      ) : null}
    </div>
  );
}
