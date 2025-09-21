/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IStaticMethods } from "preline/dist";

declare global {
  interface Window {
    // Optional third-party libraries
    _;
    $: typeof import("jquery");
    jQuery: typeof import("jquery");
    DataTable: any;
    Dropzone: any;
    VanillaCalendarPro: any;
    noUiSlider: any;

    // Preline UI
    HSStaticMethods: IStaticMethods;
  }
}

export {};

// Module declarations for packages without types
declare module 'dropzone/dist/dropzone-min.js' {
  const Dropzone: any;
  export default Dropzone;
}
declare module 'dropzone' {
  const Dropzone: any;
  export default Dropzone;
}
declare module 'vanilla-calendar-pro';
