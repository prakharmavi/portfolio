"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function CalFloatingButton() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("floatingButton", {
        calLink: "prakhar-mavi/30min",
        config: { layout: "month_view", theme: "light" },
        buttonText: "Talk to me",
      });
      cal("ui", { theme: "light", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return null;
}
