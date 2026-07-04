<script setup lang="ts">
import CONTENEUR_VERT_PICTURE from "../assets/quiz/answers/conteneur-vert.webp";
import CONTENEUR_JAUNE_PICTURE from "../assets/quiz/answers/conteneur-jaune.webp";
import SAC_BLEU_PICTURE from "../assets/quiz/answers/sac-bleu.webp";
import SAC_JAUNE_PICTURE from "../assets/quiz/answers/sac-jaune.webp";

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
</script>

<template>
  <section class="quiz">
    <div
      v-for="answer in ANSWERS_DISPLAY"
      :key="answer.value"
      class="quiz__answer"
    >
      <img
        :src="answer.picture"
        :alt="answer.title"
        class="quiz__answer__picture"
      />
      <div
        class="quiz__answer__title ff-alt"
        v-html="answer.title"
        :style="{
          color: answer.color,
        }"
      ></div>
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

  &:nth-child(even) {
    flex-direction: row-reverse;
    text-align: end;
    border-left: 1px var(--c-stroke) solid;
  }

  &:nth-child(3),
  &:nth-child(4) {
    border-top: 1px var(--c-stroke) solid;
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
</style>
