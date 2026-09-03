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
  type Dispatch,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
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

function useDialogFocus(
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);
  const focusTrap = useRef({
    first: null as HTMLElement | null,
    last: null as HTMLElement | null,
  });

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement;
    const onKeyDown = (event: KeyboardEvent) => {
      const { first, last } = focusTrap.current;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === "Tab" && first && last) {
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
      focusTrap.current.first = focusables?.[0] ?? null;
      focusTrap.current.last = focusables?.[focusables.length - 1] ?? null;
      (focusTrap.current.first ?? dialogRef.current)?.focus();
    });
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused.current instanceof HTMLElement) {
        previouslyFocused.current.focus();
      }
      focusTrap.current = { first: null, last: null };
    };
  }, [open, setOpen]);

  return dialogRef;
}

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
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 px-3 py-3 backdrop-blur-sm sm:px-6 sm:py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative w-full max-w-5xl overflow-hidden border border-gray-900 bg-[#f7f7f4] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.55)]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-10 inline-flex size-10 items-center justify-center border border-gray-400 bg-[#f7f7f4] text-gray-700 hover:border-gray-900 hover:bg-gray-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Close contact form"
        >
          <LuX className="size-5" aria-hidden />
        </button>
        <div className="max-h-[92svh] overflow-y-auto px-6 py-10 sm:px-10 sm:py-12">
          <header className="grid gap-8 pr-14 md:grid-cols-12" id={labelledBy}>
            <div className="md:col-span-7">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500">
                Contact / Toronto
              </p>
              <h2 className="mt-4 max-w-xl font-display text-5xl font-semibold leading-[0.88] tracking-[-0.05em] text-gray-900 sm:text-6xl">
                Tell me what you&apos;re building.
              </h2>
            </div>
            <p className="self-end text-lg leading-relaxed text-gray-600 md:col-span-5">
              Send the rough version. What it does, where it is stuck, and what
              you need from me. I usually reply within one business day.
            </p>
          </header>
          <div className="mt-10 border-t border-gray-900 pt-8 md:mt-12 md:grid md:grid-cols-12 md:gap-8">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.14em] text-gray-500 md:col-span-3 md:mb-0">
              Start a conversation
            </p>
            <div className="md:col-span-9">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactModalTrigger({
  children,
}: ContactModalTriggerProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useDialogFocus(open, setOpen);
  const labelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {mounted && open
        ? createPortal(
            <ContactDialog
              onClose={() => setOpen(false)}
              dialogRef={dialogRef}
              labelledBy={labelId}
            />,
            document.body,
          )
        : null}
    </>
  );
}
