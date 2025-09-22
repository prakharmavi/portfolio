"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { LuX } from "react-icons/lu";

import ContactForm from "@/app/contact/ContactForm";

type TriggerProps = {
  onClick?: (event: MouseEvent) => void;
  type?: string;
  disabled?: boolean;
  [key: string]: unknown;
};

type ContactModalTriggerProps = {
  children: ReactElement<TriggerProps>;
};

function ContactDialog({
  onClose,
  dialogRef,
  labelledBy,
}: {
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  labelledBy: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 18 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-gray-200/80 bg-white/95 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.4)] backdrop-blur"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-full border border-gray-200/70 bg-white/90 text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 focus:outline-hidden"
          aria-label="Close contact form"
        >
          <LuX className="size-5" aria-hidden />
        </button>
        <div className="max-h-[80svh] overflow-y-auto px-6 py-8 sm:px-12 sm:py-12">
          <div className="mb-8 space-y-2" id={labelledBy}>
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-gray-500">
              Let&apos;s talk
            </span>
            <h2 className="text-3xl font-semibold text-gray-900">
              Start the conversation
            </h2>
            <p className="max-w-prose text-sm text-gray-600">
              Share a few details about the product, challenge, or collaboration you have in mind. I&apos;ll get back within a day.
            </p>
          </div>
          <ContactForm />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ContactModalTrigger({
  children,
}: ContactModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);
  const labelId = useId();
  const focusTrap = useRef<{ first: HTMLElement | null; last: HTMLElement | null }>({
    first: null,
    last: null,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    previouslyFocused.current = document.activeElement;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Tab") {
        const { first, last } = focusTrap.current;
        if (!first || !last) {
          return;
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    queueMicrotask(() => {
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])",
      );
      if (!focusables?.length) {
        dialogRef.current?.focus();
        return;
      }
      focusTrap.current.first = focusables[0];
      focusTrap.current.last = focusables[focusables.length - 1];
      focusTrap.current.first.focus();
    });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
      focusTrap.current = { first: null, last: null };
    };
  }, [open]);

  const triggerElement = children;

  const clonedTrigger = useMemo(
    () =>
      cloneElement(triggerElement, {
        onClick: (event: MouseEvent) => {
          if (triggerElement.props.disabled) {
            return;
          }
          triggerElement.props.onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(true);
          }
        },
        type: triggerElement.props.type ?? "button",
        "aria-haspopup": "dialog",
        "aria-expanded": open,
      }),
    [triggerElement, open],
  );

  if (!mounted) {
    return clonedTrigger;
  }

  return (
    <>
      {clonedTrigger}
      {mounted
        ? createPortal(
            <AnimatePresence>
              {open ? (
                <ContactDialog
                  onClose={() => setOpen(false)}
                  dialogRef={dialogRef}
                  labelledBy={labelId}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
