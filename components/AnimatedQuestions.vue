<template>
    <div class="container">
      <div class="question" v-if="currentQuestionIndex < questions.length">
        <span
          v-for="(word, index) in splitQuestions[currentQuestionIndex]"
          :key="`word-${currentQuestionIndex}-${index}`"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="word"
        >
          {{ word }}
        </span>
      </div>
      <button @click="showNextQuestion">Next Question</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      questions: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        splitQuestions: [],
        currentQuestionIndex: 0,
      };
    },
    watch: {
      questions: {
        immediate: true,
        handler(newVal) {
          this.prepareQuestions(newVal);
        },
      },
    },
    methods: {
      prepareQuestions(questions) {
        this.splitQuestions = questions.map(q => q.split(' '));
      },
      showNextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
          this.currentQuestionIndex++;
        } else {
          this.currentQuestionIndex = 0; // Loop back to the first question
        }
      },
    },
  };
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .question {
    text-align: center;
    overflow: hidden;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  .word {
    display: inline-block;
    opacity: 0;
    transform: scale(0);
    animation: waveIn 0.8s forwards;
    padding: 0 3px;
    font-size: 16px;
    font-family: cursive;
    color: rgb(93, 168, 7);
    font-weight: bold;
  }
  
  @keyframes waveIn {
    0% {
      opacity: 0;
      transform: translateY(50px) scale(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  button {
    padding: 5px 10px;
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    font-family: cursive;
    bottom: 50px;
    left: 20px;
    z-index: 10;
    font-weight: bold;
  }
  </style>
  