<script setup lang="ts">
import CONTENEUR_VERT_PICTURE from "../assets/quiz/answers/conteneur-vert.webp";
import CONTENEUR_VERT_PICTURE_HIGHLIGHT from "../assets/quiz/answers/conteneur-vert-highlight.webp";
import CONTENEUR_JAUNE_PICTURE from "../assets/quiz/answers/conteneur-jaune.webp";
import CONTENEUR_JAUNE_PICTURE_HIGHLIGHT from "../assets/quiz/answers/conteneur-jaune-highlight.webp";
import SAC_BLEU_PICTURE from "../assets/quiz/answers/sac-bleu.webp";
import SAC_BLEU_PICTURE_HIGHLIGHT from "../assets/quiz/answers/sac-bleu-highlight.webp";
import SAC_JAUNE_PICTURE from "../assets/quiz/answers/sac-jaune.webp";
import SAC_JAUNE_PICTURE_HIGHLIGHT from "../assets/quiz/answers/sac-jaune-highlight.webp";

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
    pictureHighlight: CONTENEUR_VERT_PICTURE_HIGHLIGHT,
  },
  {
    title: "Conteneur<br/> jaune",
    color: "#917122",
    value: ANSWERS.CONTENEUR_JAUNE,
    picture: CONTENEUR_JAUNE_PICTURE,
    pictureHighlight: CONTENEUR_JAUNE_PICTURE_HIGHLIGHT,
  },
  {
    title: "Sac<br/> jaune",
    color: "#917122",
    value: ANSWERS.SAC_JAUNE,
    picture: SAC_JAUNE_PICTURE,
    pictureHighlight: SAC_JAUNE_PICTURE_HIGHLIGHT,
  },
  {
    title: "Sac<br/> bleu",
    color: "#106bac",
    value: ANSWERS.SAC_BLEU,
    picture: SAC_BLEU_PICTURE,
    pictureHighlight: SAC_BLEU_PICTURE_HIGHLIGHT,
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
import { SplitText } from "gsap/SplitText";
import { onMounted, ref } from "vue";
import { audio } from "../audio";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(SplitText);

const answersEls = ref<HTMLElement[]>([]);
const questionEls = ref<HTMLElement[]>([]);
const activeQuestionIndex = ref(0);

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

const CARD_INITIAL_ROTATION = 10; //deg
const CARD_ROTATION_INC = -10;
const setCardsStyle = (animate: boolean) => {
  const TL = gsap.timeline({
    defaults: {
      duration: animate ? 0.5 : 0,
      ease: "elastic.out(1, 0.75)",
    },
  });

  questionEls.value.forEach((el, i) => {
    const index = i - activeQuestionIndex.value;

    if (index >= 0) {
      const backgroundColor = (() => {
        if (index === 0) {
          return "#fff";
        } else if (index === 1) {
          return "#efece4";
        }

        return "#f1ecdf";
      })();

      TL.to(
        el,
        {
          rotateZ: index * CARD_ROTATION_INC + CARD_INITIAL_ROTATION,
          scale: gsap.utils.mapRange(0, QUESTIONS.length - 1, 1, 0.75, index),
          backgroundColor,
        },
        0,
      );

      const cardTitle = el.querySelector(".question__title");
      const cardPicture = el.querySelector(".question__picture-container");

      if (index === 0) {
        TL.to(
          cardPicture,
          {
            scale: 1,
            opacity: 1,
          },
          0,
        );

        let split = SplitText.create(cardTitle, {
          type: "words",
        });
        TL.set(
          cardTitle,
          {
            opacity: 1,
          },
          0,
        );
        TL.from(
          split.words,
          {
            y: 10,
            stagger: 0.05,
            opacity: 0,
            ease: "elastic.out(1, 0.75)",
          },
          0,
        );
      } else {
        TL.set(
          cardTitle,
          {
            opacity: 0,
          },
          0,
        );

        TL.set(
          cardPicture,
          {
            opacity: 0,
            scale: 0.75,
          },
          0,
        );
      }
    }
  });
};

const useDraggableCard = (draggableEl: HTMLElement) => {
  let isDragging = false;
  let resetCardTween: gsap.core.Tween;
  let activeAnswer: HTMLElement | null = null;

  const hitTestAnswer = (x: number, y: number, target: HTMLElement) => {
    const BCR = target.getBoundingClientRect();

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
    const cardHitboxAreaThresholdTest = draggable.hitTest(target, "60%");

    if (pointerHitTest && cardHitboxAreaThresholdTest) {
      activeAnswer = target;

      if (!target.classList.contains("highlight")) {
        audio.play("slide");

        gsap.killTweensOf(
          target.querySelector(".quiz__answer__picture-container"),
        );
        gsap.to(target.querySelector(".quiz__answer__picture-container"), {
          scale: 1.15,
          ease: "elastic.out(1, 0.3)",
          duration: 1.25,
        });
      }

      target.classList.add("highlight");
    } else {
      if (target.classList.contains("highlight")) {
        gsap.killTweensOf(
          target.querySelector(".quiz__answer__picture-container"),
        );
        gsap.to(target.querySelector(".quiz__answer__picture-container"), {
          scale: 1,
          ease: "elastic.out(1, 0.75)",
        });
      }

      target.classList.remove("highlight");
    }
  };

  const onDragUpdateCardRotation = (x: number, y: number) => {
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

    gsap.set(draggableEl, {
      rotateZ: CARD_INITIAL_ROTATION + relX * 15,
      rotateX: relY * 15,
    });
  };

  const onDragStart = () => {
    isDragging = true;

    resetCardTween?.kill();
  };

  const onDrag = (e: PointerEvent) => {
    const { x, y } = e;

    activeAnswer = null;
    answersEls.value.forEach((answerEl) => hitTestAnswer(x, y, answerEl));

    onDragUpdateCardRotation(x, y);
  };

  const resetCard = () => {
    audio.play("shove");

    resetCardTween?.kill();
    resetCardTween = gsap.to(draggableEl, {
      x: 0,
      y: 0,
      rotateZ: CARD_INITIAL_ROTATION,
      rotateX: 0,
      ease: "elastic.out(1, 0.75)",
    });
  };

  const validateAnswer = () => {
    audio.play("shove");

    gsap.to(draggableEl, {
      scale: 0,
      ease: "back.in(1.7)",
      duration: 0.25,
    });

    // Activate next card
    if (activeQuestionIndex.value < QUESTIONS.length - 1) {
      activeQuestionIndex.value++;
      useDraggableCard(questionEls.value[activeQuestionIndex.value]);
    }
  };

  const onDragEnd = () => {
    isDragging = false;
    if (activeAnswer) {
      validateAnswer();
    } else {
      resetCard();
    }
  };

  const [draggable] = Draggable.create(draggableEl, {
    bounds: document.querySelector(".quiz"),
    edgeResistance: 0.5,
    onDrag,
    onDragStart,
    onDragEnd,
    onClick: () => {
      audio.play("slide");
    },
  });

  setCardsStyle(activeQuestionIndex.value > 0);

  const dispose = () => {
    resetCardTween?.kill();
    draggable.kill();
  };

  return { draggable, dispose };
};

onMounted(() => {
  useDraggableCard(questionEls.value[0]);
});
</script>

<template>
  <section class="quiz">
    <div
      v-for="answer in ANSWERS_DISPLAY"
      :key="answer.value"
      :class="['quiz__answer', answer.value]"
      ref="answersEls"
    >
      <div class="quiz__answer__picture-container">
        <img
          :src="answer.picture"
          :alt="answer.title"
          class="quiz__answer__picture idle"
        />
        <img
          :src="answer.pictureHighlight"
          :alt="answer.title"
          class="quiz__answer__picture highlight"
        />
      </div>
      <div
        class="quiz__answer__title"
        v-html="answer.title"
        :style="{
          color: answer.color,
        }"
      ></div>
    </div>

    <div class="questions-container">
      <div
        v-for="(question, i) in QUESTIONS"
        :key="question.title"
        ref="questionEls"
        :class="[
          'question',
          {
            active: activeQuestionIndex === i,
          },
        ]"
        :style="{
          '--i': i,
          zIndex: QUESTIONS.length - i,
        }"
      >
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
  grid-template-rows: repeat(2, 40vh);
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
    background-image: url(/src/assets/logo.svg);
    background-size: 50px;
    animation: bg linear 2.5s infinite;
    background-color: #c9c7bb70;
    outline: 5px var(--c-stroke) solid;
    outline-offset: -5px;

    .quiz__answer__picture {
      &.idle {
        display: none;
      }

      &.highlight {
        display: block;
      }
    }
  }
}

@keyframes bg {
  from {
    background-position: 0px 0px;
  }

  to {
    background-position: 50px -50px;
  }
}

.quiz__answer__picture-container {
  width: fluid(35px, 150px);

  .conteneur-vert &,
  .conteneur-jaune & {
    translate: 0 -10%;
  }
}

.quiz__answer__picture {
  display: block;
  object-fit: contain;
  width: 100%;
  height: 100%;

  .sac-jaune & {
    width: 110%;
  }

  .sac-bleu & {
    width: 120%;
  }

  &.highlight {
    display: none;
  }
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
  // --question-initial-rotation: 10deg;

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
  // rotate: calc(var(--question-initial-rotation) + -10deg * var(--i));
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
