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
// import CANDY_WRAPPER_PICTURE from "../assets/quiz/items/candy-wrapper.webp?url";
import CHICKEN_BONES_PICTURE from "../assets/quiz/items/chicken-bones.webp?url";
import COFFEE_PICTURE from "../assets/quiz/items/coffee.webp?url";
import TOILET_PAPER_PICTURE from "../assets/quiz/items/toilet-paper.webp?url";
import PIZZA_PICTURE from "../assets/quiz/items/pizza.webp?url";
import BREAD_PICTURE from "../assets/quiz/items/sakapain.webp?url";
import POLA_PICTURE from "../assets/quiz/items/pola.webp?url";
import ALU_PICTURE from "../assets/quiz/items/alu.webp?url";
import GOB_PICTURE from "../assets/quiz/items/gobelet.webp?url";
import GRENA_PICTURE from "../assets/quiz/items/grena.webp?url";

import confetti from "canvas-confetti";
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
    title: "Déchets<br/> organiques",
    color: "#285c47",
    value: ANSWERS.CONTENEUR_VERT,
    picture: CONTENEUR_VERT_PICTURE,
    pictureHighlight: CONTENEUR_VERT_PICTURE_HIGHLIGHT,
  },
  {
    title: "Papier<br/> carton",
    color: "#917122",
    value: ANSWERS.CONTENEUR_JAUNE,
    picture: CONTENEUR_JAUNE_PICTURE,
    pictureHighlight: CONTENEUR_JAUNE_PICTURE_HIGHLIGHT,
  },
  {
    title: "Déchets<br/> résiduels",
    color: "#917122",
    value: ANSWERS.SAC_JAUNE,
    picture: SAC_JAUNE_PICTURE,
    pictureHighlight: SAC_JAUNE_PICTURE_HIGHLIGHT,
  },
  {
    title: "PMC",
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
    feedback: "Les sacs en plastique doivent être déposés dans le sac PMC.",
  },
  {
    title: "Un carton de pizza souillé",
    answer: ANSWERS.SAC_JAUNE,
    picture: PIZZA_PICTURE,
    feedback:
      "Le carton de la boite de pizza est souvent souillé ou gras. La graisse nuit au recyclage du carton. Déposez-le dans la poubelle des déchets résiduels.",
  },
  {
    title: "Un rouleau de papier toilette",
    answer: ANSWERS.CONTENEUR_JAUNE,
    picture: TOILET_PAPER_PICTURE,
    feedback:
      "Les rouleaux de papier toilette en carton doivent être déposés dans la papier - carton.",
  },
  {
    title: "Un sac à pain",
    answer: ANSWERS.CONTENEUR_JAUNE,
    picture: BREAD_PICTURE,
    // dans le conteneur vert des déchets organiques, en petits morceaux dans votre compost ou encore dans la poubelle des déchets résiduels
    feedback:
      "Les sacs vides ayant contenu du pain ou des viennoiseries vont dans le papier-carton.",
  },
  {
    title: "Des restes d'os de poulet",
    answer: ANSWERS.CONTENEUR_VERT,
    picture: CHICKEN_BONES_PICTURE,
    feedback:
      "Les os de poulet sont des déchets organiques et peuvent être déposées dans le conteneur vert.",
  },
  {
    title: "Un emballage de café aluminium",
    answer: ANSWERS.SAC_JAUNE,
    picture: COFFEE_PICTURE,
    feedback:
      "La majorité des sacs à café sont constitués d'une couche en aluminium et une couche en plastique. Ceux-ci sont encore à jeter dans les déchets résiduels",
  },
  {
    title: "Papier photo / Polaroïds",
    answer: ANSWERS.SAC_JAUNE,
    picture: POLA_PICTURE,
    feedback:
      "Le papier photo ne peut pas être recyclé comme du papier ordinaire. Ne le jetez donc jamais avec le papier-carton, mais avec les déchets résiduels.",
  },
  {
    title: "Papier aluminium",
    answer: ANSWERS.SAC_JAUNE,
    picture: ALU_PICTURE,
    feedback:
      "Un papier aluminium provenant d’un rouleau n’est pas un emballage et doit donc être jeté avec les déchets résiduels.",
  },
  {
    title: "Gobelet en carton",
    answer: ANSWERS.CONTENEUR_JAUNE,
    picture: GOB_PICTURE,
    feedback:
      "Les gobelets en carton ou les cartons de pâtes vont avec le papier-carton une fois vidés, à condition de ne pas contenir des résidus de nourriture, et de n'être paraffiné qu'à l'intérieur.",
  },
  {
    title: "Bouteille de sirop métallique",
    answer: ANSWERS.SAC_BLEU,
    picture: GRENA_PICTURE,
    feedback:
      "Les bouteilles métalliques pour grenadine et autres sirops , par exemple, peuvent être triées dans les PMC.",
  },
];

const feedback = ref<null | {
  title: string;
  subtitle: string;
  status: string;
}>();

import { Draggable } from "gsap/Draggable";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";
import { onMounted, ref, watch } from "vue";
import { audio } from "../audio";

gsap.registerPlugin(Draggable, SplitText, CustomEase, CustomWiggle);

const answersEls = ref<HTMLElement[]>([]);
const questionEls = ref<HTMLElement[]>([]);
const activeQuestionIndex = ref(0);
const highlightedAnswer = ref<HTMLElement | null>();

const getClientXY = (e: PointerEvent | TouchEvent) => {
  if (e.type === "pointermove") {
    return {
      x: (e as PointerEvent).x,
      y: (e as PointerEvent).y,
    };
  } else if (e.type === "touchmove" && (e as TouchEvent).targetTouches.length) {
    return {
      x: (e as TouchEvent).targetTouches[0].clientX,
      y: (e as TouchEvent).targetTouches[0].clientY,
    };
  }

  return {
    x: 0,
    y: 0,
  };
};

watch(highlightedAnswer, (newValue, oldValue) => {
  if (oldValue) {
    gsap.killTweensOf(
      oldValue.querySelector(".quiz__answer__picture-container"),
    );
    gsap.to(oldValue.querySelector(".quiz__answer__picture-container"), {
      scale: 1,
      ease: "elastic.out(1, 0.75)",
    });
    oldValue.classList.remove("highlight");
  }

  if (newValue) {
    newValue.classList.add("highlight");
    audio.play("slide");
    gsap.killTweensOf(
      newValue.querySelector(".quiz__answer__picture-container"),
    );
    gsap.to(newValue.querySelector(".quiz__answer__picture-container"), {
      scale: 1.15,
      ease: "elastic.out(1, 0.3)",
      duration: 1.25,
    });
  }
});

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
          xPercent: -50,
          yPercent: -50,
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

const onFeedbackEnter = (el: Element, done: () => void) => {
  let split = SplitText.create(el, {
    type: "words",
  });

  gsap.from(split.words, {
    y: 10,
    stagger: 0.025,
    opacity: 0,
    ease: "elastic.out(2, 0.5)",
    duration: 1,
    onComplete: done,
  });
};

const useDraggableCard = (draggableEl: HTMLElement) => {
  let resetCardTween: gsap.core.Tween;

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
      highlightedAnswer.value = target;
      return true;
    }

    return false;
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
    resetCardTween?.kill();
  };

  const onDrag = (e: PointerEvent | TouchEvent) => {
    const { x, y } = getClientXY(e);

    let hasHit = false;
    answersEls.value.forEach((answerEl) => {
      const hit = hitTestAnswer(x, y, answerEl);
      if (!hasHit && hit) {
        hasHit = true;
      }
    });
    if (!hasHit) {
      highlightedAnswer.value = null;
    }

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

    if (
      QUESTIONS[activeQuestionIndex.value].answer ===
      highlightedAnswer.value?.getAttribute("data-answer-value")
    ) {
      feedback.value = {
        title: "Exactement!",
        subtitle: QUESTIONS[activeQuestionIndex.value].feedback,
        status: "success",
      };

      const BCR = highlightedAnswer.value.getBoundingClientRect();

      confetti({
        startVelocity: Math.max(innerWidth, innerHeight) / 30,
        scalar: 1.5,
        particleCount: 200,
        spread: 80,
        origin: {
          x: (BCR.x + BCR.width / 2) / innerWidth,
          y: (BCR.y + BCR.height / 2) / innerHeight,
        },
        ticks: 50,
      });

      audio.play("success");
      audio.play("cheer");

      gsap.killTweensOf(highlightedAnswer.value);
      gsap.from(highlightedAnswer.value, {
        backgroundColor: "rgb(125 189 170)",
      });
    } else {
      feedback.value = {
        title: "Dommage...",
        subtitle: QUESTIONS[activeQuestionIndex.value].feedback,
        status: "error",
      };

      gsap.killTweensOf(".quiz");
      gsap.to(".quiz", {
        x: 10,
        duration: 0.25,
        ease: "wiggle({type:easeOut, wiggles:6})", //advanced
      });

      audio.play("error");
      audio.play("aww");

      if (highlightedAnswer.value) {
        gsap.killTweensOf(highlightedAnswer.value);
        gsap.from(highlightedAnswer.value, {
          backgroundColor: "rgb(240 196 200)",
        });
      }
    }

    highlightedAnswer.value = null;

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
    if (highlightedAnswer.value) {
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
      :data-answer-value="answer.value"
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

    <div class="quiz__footer">
      <div :class="['quiz__footer__content', feedback?.status]">
        <Transition :css="false" @enter="onFeedbackEnter">
          <div
            v-if="feedback?.title"
            class="quiz__footer__title"
            :key="`${feedback.title}-${feedback.subtitle}`"
          >
            {{ feedback.title }}
          </div>
        </Transition>
        <Transition :css="false" @enter="onFeedbackEnter">
          <div
            v-if="feedback?.subtitle"
            class="quiz__footer__subtitle"
            :key="`${feedback.title}-${feedback.subtitle}`"
          >
            {{ feedback?.subtitle }}
          </div>
        </Transition>
      </div>
      <div class="quiz__footer__counter">
        {{ activeQuestionIndex + 1 }}/{{ QUESTIONS.length }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "../style/functions" as *;

.quiz {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, 40svh) 20svh;
  width: 100%;
  max-width: 1280px;
  border-top: 1px var(--c-stroke) solid;

  @media (min-width: 1000px) {
    grid-template-rows: repeat(2, 40svh) auto;
  }
}

.quiz__answer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: fluid(10px, 20px);
  padding-block: fluid(10px, 40px);
  padding-inline: fluid(10px, 50px);
  font-family: var(--ff-alt);
  font-weight: 800;
  user-select: none;
  background-color: var(--c-surface-accent);
  border-left: 1px var(--c-stroke) solid;

  &:nth-child(even) {
    border-right: 1px var(--c-stroke) solid;

    @media (min-width: 1000px) {
      flex-direction: row-reverse;
      text-align: end;
    }
  }

  &:nth-child(3),
  &:nth-child(4) {
    border-top: 1px var(--c-stroke) solid;

    @media (max-width: 650px) {
      justify-content: end;
    }
  }

  @media (max-width: 1000px) {
    text-align: center;
  }

  @media (max-width: 1000px) and (min-width: 650px) {
    justify-content: center;
  }

  @media (min-width: 1000px) {
    flex-direction: row;
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
  width: fluid(80px, 150px);

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
  font-size: fluid(20px, 50px);
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
  z-index: 1;
  aspect-ratio: 2/3;
  width: fluid(150px, 200px);
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

.quiz__footer {
  position: relative;
  display: grid;
  grid-template-columns: auto max-content;
  grid-column: 1 / 3;
  border: 1px var(--c-stroke) solid;
  overflow: hidden;

  @media (min-width: 1000px) {
    align-content: center;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
}

.quiz__footer__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-block: fluid(10px, 16px);
  padding-inline: fluid(10px, 16px);

  @media (min-width: 1000px) {
    gap: 10px;
    justify-content: center;
  }

  &.error {
    color: #ce2f2f;
    background-color: #d42d361c;
  }
}

.quiz__footer__title {
  line-height: 1;
  font-size: fluid(16px, 40px);
  font-family: var(--ff-alt);
  font-weight: 800;
}

.quiz__footer__subtitle {
  line-height: 1;
  font-family: var(--ff-alt);
}

.quiz__footer__counter {
  position: absolute;
  top: 10px;
  right: 10px;

  font-size: fluid(16px, 60px);
  font-family: var(--ff-alt);
  font-weight: 800;
  line-height: 1;
  display: flex;

  @media (min-width: 1000px) {
    align-items: center;
    padding: 1rem 2rem;
    border-left: 1px var(--c-stroke) solid;
  }
}
</style>
