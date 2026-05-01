"use client";

import { useEffect } from "react";
import { fbq } from "./FacebookPixel";

export function LeadEvent() {
  useEffect(() => {
    fbq("track", "Lead");
  }, []);

  return null;
}
