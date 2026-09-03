"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LuUserRound } from "react-icons/lu";

import type { AnswerStatus } from "@/lib/useFastmanAnswer";
import type { FastmanMessage } from "@/types/api";

type FastmanConversationProps = {
  error: string;
  messages: FastmanMessage[];
  status: AnswerStatus;
};

function PrakharAvatar() {
  return (
    <Image
      src="/images/software-developer-portfolio-image--t3chat--1.jpg"
      alt="Prakhar"
      width={28}
      height={28}
      className="size-7 rounded-full object-cover"
    />
  );
}

function UserAvatar() {
  return (
    <span
      role="img"
      aria-label="You"
      className="grid size-7 place-items-center rounded-full bg-white text-gray-900"
    >
      <LuUserRound className="size-3.5" aria-hidden />
    </span>
  );
}

export default function FastmanConversation(props: FastmanConversationProps) {
  const { error, messages, status } = props;
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    container.current?.scrollTo({ top: container.current.scrollHeight });
  }, [error, messages, status]);

  const awaitingAnswer = status === "loading" && messages.at(-1)?.role === "user";

  return (
    <div
      ref={container}
      aria-live="polite"
      aria-busy={status === "loading"}
      className="min-h-44 flex-1 overflow-y-auto bg-[#f7f7f4]"
    >
      {messages.map((message, index) =>
        message.role === "user" ? (
          <div
            key={index}
            className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-b border-gray-300 bg-gray-900 px-5 py-4 text-white"
          >
            <UserAvatar />
            <p className="text-sm leading-6">{message.content}</p>
          </div>
        ) : (
          <div
            key={index}
            className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-b border-gray-300 px-5 py-5"
          >
            <PrakharAvatar />
            <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
              {message.content}
              {status === "loading" && index === messages.length - 1 && (
                <span className="ml-1 inline-block size-1.5 animate-pulse rounded-full bg-gray-400" />
              )}
            </p>
          </div>
        ),
      )}
      {(awaitingAnswer || status === "error") && (
        <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 border-b border-gray-300 px-5 py-5">
          <PrakharAvatar />
          <p className="text-sm leading-6 text-gray-600">
            {awaitingAnswer ? "Checking the project notes..." : error}
          </p>
        </div>
      )}
    </div>
  );
}
