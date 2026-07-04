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
};

export const audio = {
  play: (key: "shove" | "slide") => {
    gsap.utils.random(AUDIO[key]).play();
  },
};
