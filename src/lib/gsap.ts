"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin, SplitText, Flip, CustomEase, useGSAP);
  CustomEase.create("fold", "0.76,0,0.24,1");
  CustomEase.create("cine", "0.16,1,0.3,1");
}

export { gsap, ScrollTrigger, MorphSVGPlugin, SplitText, Flip, useGSAP };
