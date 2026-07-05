import { Howl } from "howler";

import shove1 from "./assets/audio/card-shove-1.ogg?url";
import shove2 from "./assets/audio/card-shove-2.ogg?url";
import shove3 from "./assets/audio/card-shove-3.ogg?url";
import shove4 from "./assets/audio/card-shove-4.ogg?url";
import slide1 from "./assets/audio/card-slide-1.ogg?url";
import slide2 from "./assets/audio/card-slide-2.ogg?url";
import slide3 from "./assets/audio/card-slide-3.ogg?url";
import slide4 from "./assets/audio/card-slide-4.ogg?url";
import slide5 from "./assets/audio/card-slide-5.ogg?url";
import slide6 from "./assets/audio/card-slide-6.ogg?url";
import slide7 from "./assets/audio/card-slide-7.ogg?url";
import slide8 from "./assets/audio/card-slide-8.ogg?url";
import error1 from "./assets/audio/error_001.ogg?url";
import error2 from "./assets/audio/error_002.ogg?url";
import error3 from "./assets/audio/error_003.ogg?url";
import cheer from "./assets/audio/Kids Cheering.mp3?url";
import confirmation1 from "./assets/audio/confirmation_001.ogg?url";
import confirmation2 from "./assets/audio/confirmation_002.ogg?url";
import confirmation3 from "./assets/audio/confirmation_004.ogg?url";
import aww from "./assets/audio/aww.mp3?url";

import gsap from "gsap";

const AUDIO = {
  shove: [
    new Howl({
      src: [shove1],
    }),
    new Howl({
      src: [shove2],
    }),
    new Howl({
      src: [shove3],
    }),
    new Howl({
      src: [shove4],
    }),
  ],
  slide: [
    new Howl({
      src: [slide1],
    }),
    new Howl({
      src: [slide2],
    }),
    new Howl({
      src: [slide3],
    }),
    new Howl({
      src: [slide4],
    }),
    new Howl({
      src: [slide5],
    }),
    new Howl({
      src: [slide6],
    }),
    new Howl({
      src: [slide7],
    }),
    new Howl({
      src: [slide8],
    }),
  ],
  error: [
    new Howl({
      src: [error1],
      volume: 0.5,
    }),
    new Howl({
      src: [error2],
      volume: 0.5,
    }),
    new Howl({
      src: [error3],
      volume: 0.5,
    }),
  ],
  success: [
    new Howl({
      src: [confirmation1],
      volume: 0.5,
    }),
    new Howl({
      src: [confirmation2],
      volume: 0.5,
    }),
    new Howl({
      src: [confirmation3],
      volume: 0.5,
    }),
  ],
  cheer: [
    new Howl({
      src: [cheer],
      volume: 0.5,
    }),
  ],
  aww: [
    new Howl({
      src: [aww],
      volume: 0.5,
    }),
  ],
};

Howler.volume(0.5);

export const audio = {
  play: (key: "shove" | "slide" | "success" | "error" | "cheer" | "aww") => {
    const audio = gsap.utils.random(AUDIO[key]);
    audio.rate(gsap.utils.random(0.8, 1.2));
    audio.play();
  },
};
