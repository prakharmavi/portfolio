"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Preline UI
async function loadPreline() {
    return import("preline/dist/index.js");
}

// Lazily load optional third-party libs if present
async function initOptionalLibs() {
    const ENABLE_HEAVY = process.env.NEXT_PUBLIC_ENABLE_OPTIONAL_LIBS === "1";
    if (!ENABLE_HEAVY) return; // Skip loading heavy optional libs by default
    // lodash
    try {
        const mod = await import("lodash");
        window._ = (mod as any).default ?? mod;
    } catch {}

    // jquery
    let jq: any = null;
    if (ENABLE_HEAVY) {
        try {
            const mod = await import("jquery");
            jq = (mod as any).default ?? mod;
            window.$ = jq;
            window.jQuery = jq;
        } catch {}
    }

    // datatables (extends jQuery)
    if (ENABLE_HEAVY) {
        try {
            await import("datatables.net");
            if (jq && jq.fn) {
                window.DataTable = jq.fn.dataTable;
            }
        } catch {}
    }

    // noUiSlider
    if (ENABLE_HEAVY) {
        try {
            const mod = await import("nouislider");
            window.noUiSlider = (mod as any).default ?? mod;
        } catch {}
    }

    // Dropzone
    if (ENABLE_HEAVY) {
        try {
            // @ts-expect-error - missing type declarations for this path
            const dz = await import("dropzone/dist/dropzone-min.js");
            // Some builds attach to global, others export default
            window.Dropzone = (dz as any)?.default ?? (window as any).Dropzone;
        } catch {}
    }

    // VanillaCalendarPro (optional: avoid bundler resolution if absent)
    if (ENABLE_HEAVY) {
        try {
            const dynamicImport = new Function("s", "return import(s)");
            const vcp = await dynamicImport("vanilla-calendar-pro");
            window.VanillaCalendarPro = (vcp as any).default ?? vcp;
        } catch {}
    }
}

export default function PrelineScript() {
    const path = usePathname();

    useEffect(() => {
        const init = async () => {
            await initOptionalLibs();
            await loadPreline();
        };
        init();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (
                window.HSStaticMethods &&
                typeof window.HSStaticMethods.autoInit === "function"
            ) {
                window.HSStaticMethods.autoInit();
            }
        }, 100);
    }, [path]);

    return null;
}
