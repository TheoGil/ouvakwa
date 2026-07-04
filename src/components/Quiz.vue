<script setup lang="ts">
import CONTENEUR_VERT_PICTURE from "../assets/quiz/answers/conteneur-vert.webp";
import CONTENEUR_JAUNE_PICTURE from "../assets/quiz/answers/conteneur-jaune.webp";
import SAC_BLEU_PICTURE from "../assets/quiz/answers/sac-bleu.webp";
import SAC_JAUNE_PICTURE from "../assets/quiz/answers/sac-jaune.webp";
import PLASTIC_BAG_PICTURE from "../assets/quiz/items/plastic-bag.webp?url";
import CANDY_WRAPPER_PICTURE from "../assets/quiz/items/candy-wrapper.webp?url";
import CHICKEN_BONES_PICTURE from "../assets/quiz/items/chicken-bones.webp?url";
import COFFEE_PICTURE from "../assets/quiz/items/coffee.webp?url";
import TOILET_PAPER_PICTURE from "../assets/quiz/items/toilet-paper.webp?url";
import gsap from "gsap";

// Answers possible values
const ANSWERS = {
  CONTENEUR_VERT: "conteneur-vert",
  CONTENEUR_JAUNE: "conteneur-jaune",
  SAC_JAUNE: "sac-jaune",
  SAC_BLEU: "sac-bleu",
};

// Data structure representing the visual anwsers displayed to user
const ANSWERS_DISPLAY = [
  {
    title: "Conteneur<br/> vert",
    color: "#285c47",
    value: ANSWERS.CONTENEUR_VERT,
    picture: CONTENEUR_VERT_PICTURE,
  },
  {
    title: "Conteneur<br/> jaune",
    color: "#917122",
    value: ANSWERS.CONTENEUR_JAUNE,
    picture: CONTENEUR_JAUNE_PICTURE,
  },
  {
    title: "Sac<br/> jaune",
    color: "#917122",
    value: ANSWERS.SAC_JAUNE,
    picture: SAC_JAUNE_PICTURE,
  },
  {
    title: "Sac<br/> bleu",
    color: "#106bac",
    value: ANSWERS.SAC_BLEU,
    picture: SAC_BLEU_PICTURE,
  },
];

const QUESTIONS = [
  {
    title: "Un sac en plastique",
    answer: ANSWERS.SAC_BLEU,
    picture: PLASTIC_BAG_PICTURE,
    feedback: {
      correct: "Excellent !",
      incorrect: "Oups...",
    },
  },
  {
    title: "Des emballages de bonbons",
    answer: ANSWERS.SAC_BLEU,
    picture: CANDY_WRAPPER_PICTURE,
    feedback: {
      correct: "Excellent !",
      incorrect: "Oups...",
    },
  },
  {
    title: "Un rouleau de papier toilette",
    answer: ANSWERS.CONTENEUR_JAUNE,
    picture: TOILET_PAPER_PICTURE,
    feedback: {
      correct: "Excellent !",
      incorrect: "Oups...",
    },
  },
  {
    title: "Des restes d'os de poulet",
    answer: ANSWERS.SAC_JAUNE,
    picture: CHICKEN_BONES_PICTURE,
    feedback: {
      correct: "Excellent !",
      incorrect: "Oups...",
    },
  },
  {
    title: "Un emballage de café aluminium",
    answer: ANSWERS.SAC_JAUNE,
    picture: COFFEE_PICTURE,
    feedback: {
      correct: "Excellent !",
      incorrect: "Oups...",
    },
  },
];

import { Draggable } from "gsap/Draggable";
import { onMounted, ref } from "vue";
import { DoubleSide } from "three";
gsap.registerPlugin(Draggable);

let resetCardTween: gsap.core.Tween;
let isDragging = false;
const answersEls = ref<HTMLElement[]>([]);

function pointInRectangle(
  px: number,
  py: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number,
) {
  if (
    px >= rx && // right of the left edge AND
    px <= rx + rw && // left of the right edge AND
    py >= ry && // below the top AND
    py <= ry + rh
  ) {
    // above the bottom
    return true;
  }
  return false;
}

onMounted(() => {
  const questions = document.querySelectorAll(".question");
  const questionEl = questions[questions.length - 1];

  Draggable.create(questionEl, {
    bounds: document.querySelector(".quiz"),
    edgeResistance: 0.5,
    onDrag: function (e) {
      const { x, y } = e;

      answersEls.value.forEach((answerEl) => {
        const BCR = answerEl.getBoundingClientRect();

        // Is the pointer within answer BCR?
        const pointerHitTest = pointInRectangle(
          x,
          y,
          BCR.x,
          BCR.y,
          BCR.width,
          BCR.height,
        );

        // Check that at least 60% of the dragged el is within answer
        const cardHitboxAreaThresholdTest = this.hitTest(answerEl, "60%");

        answerEl.classList.toggle(
          "highlight",
          pointerHitTest && cardHitboxAreaThresholdTest,
        );
      });

      // Update card rotation values relatively to its position within quiz grid
      const quizBCR = document.querySelector(".quiz")!.getBoundingClientRect();

      const relX = gsap.utils.mapRange(
        quizBCR.left,
        quizBCR.right,
        -1,
        1,
        gsap.utils.clamp(quizBCR.left, quizBCR.right, x),
      );

      const relY = gsap.utils.mapRange(
        quizBCR.top,
        quizBCR.bottom,
        1,
        -1,
        gsap.utils.clamp(quizBCR.top, quizBCR.bottom, y),
      );

      gsap.set(questionEl, {
        rotateZ: relX * 15,
        rotateX: relY * 15,
      });
    },
    onDragStart: () => {
      isDragging = true;

      resetCardTween?.kill();
    },
    onDragEnd: function () {
      isDragging = false;

      resetCardTween?.kill();
      resetCardTween = gsap.to(questionEl, {
        x: 0,
        y: 0,
        rotateZ: 0,
        rotateX: 0,
        ease: "elastic.out(1, 0.75)",
      });
    },
  });
});
</script>

<template>
  <section class="quiz">
    <div
      v-for="answer in ANSWERS_DISPLAY"
      :key="answer.value"
      class="quiz__answer"
      ref="answersEls"
    >
      <img
        :src="answer.picture"
        :alt="answer.title"
        class="quiz__answer__picture"
      />
      <div
        class="quiz__answer__title"
        v-html="answer.title"
        :style="{
          color: answer.color,
        }"
      ></div>
    </div>

    <div class="questions-container">
      <div v-for="question in QUESTIONS" :key="question.title" class="question">
        <div class="question__picture-container">
          <img
            :src="question.picture"
            :alt="question.title"
            class="question__picture"
          />
        </div>
        <div v-html="question.title" class="question__title"></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../style/functions" as *;

.quiz {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  max-width: 1280px;
  background-color: var(--c-surface-accent);
  border: 1px var(--c-stroke) solid;
}

.quiz__answer {
  display: flex;
  align-items: center;
  gap: fluid(10px, 20px);
  padding-block: fluid(10px, 40px);
  padding-inline: fluid(10px, 50px);
  font-family: var(--ff-alt);
  font-weight: 800;
  user-select: none;

  &:nth-child(even) {
    flex-direction: row-reverse;
    text-align: end;
    border-left: 1px var(--c-stroke) solid;
  }

  &:nth-child(3),
  &:nth-child(4) {
    border-top: 1px var(--c-stroke) solid;
  }

  &.highlight {
    outline: 5px var(--c-stroke) dashed;
    outline-offset: 5px;
    background-color: #c9c7bb70;
  }
}

.quiz__answer__picture {
  display: block;
  width: fluid(35px, 150px);
  height: auto;
}

.quiz__answer__title {
  display: block;
  line-height: 1;
  font-size: fluid(14px, 50px);
}

.questions-container {
  perspective: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
}

.question {
  display: grid;
  grid-template-rows: auto max-content;
  position: absolute;
  translate: -50% -50%;
  z-index: 1;
  aspect-ratio: 2/3;
  width: fluid(35px, 200px);
  height: auto;
  border-radius: 8px;
  border: 1px var(--c-stroke) solid;
  background-color: var(--c-surface-default);
  overflow: hidden;
}

.question__picture-container {
  position: relative;
}

.question__picture {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.question__title {
  text-transform: uppercase;
  font-family: var(--ff-mono);
  text-align: center;
  background-color: var(--c-surface-default);
  padding: 10px;
  font-size: fluid(15px, 18px);
  line-height: 1;
}
</style>
