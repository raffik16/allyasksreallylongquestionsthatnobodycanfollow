<template>
    <div>
        <transition name="fade">
            <div v-if="!showText" class="word-revealer" v-html="currentWord" />
        </transition>

        <transition name="fade">
            <div v-if="showText" class="kroq">
                Famous words by Ally Johnson
                <button v-if="showReplayButton" @click="replay" class="replay-btn">Replay</button>
                <button v-if="showNextQuestionButton" @click="nextQuestion" class="next-question-btn">Next Question</button>
            </div>
        </transition>
    </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    texts: {
        type: Array,
        required: true,
    },
});
let currentTextIndex = 0; // Index to track the current text being shown
const currentWord = ref('');
let words = props.texts[currentTextIndex]?.split(' ') || []; // Safely handle potential undefined value
let index = 0;
let intervalId;
const showText = ref(false);
const showReplayButton = ref(false);
const showNextQuestionButton = ref(false); // New ref to control the visibility of the "Next Question" button

const showNextWord = () => {
    if (index < words.length) {
        currentWord.value = words[index];
        index += 1;
    } else {
        clearInterval(intervalId);
        setTimeout(() => {
            showText.value = true;
            showReplayButton.value = true;
            if (currentTextIndex < props.texts.length - 1) {
                showNextQuestionButton.value = true; // Show if there are more texts to display
            }
        }, 1000);
    }
};

const replay = () => {
    index = 0;
    showText.value = false;
    showReplayButton.value = false;
    showNextQuestionButton.value = false;
    currentWord.value = '';
    intervalId = setInterval(showNextWord, 500);
};

const nextQuestion = () => {
    if (currentTextIndex < props.texts.length - 1) {
        currentTextIndex++;
        index = 0; // Reset the index for the new text
        // Immediately clear the current word display to avoid flash of previous text
        currentWord.value = '';
        // Prepare the words for the new text
        words = props.texts[currentTextIndex].split(' ');
        // Reset the display states
        showText.value = false;
        showReplayButton.value = false;
        showNextQuestionButton.value = false;
        // Clear any existing interval to avoid duplicates
        clearInterval(intervalId);
        // Delay the start of the next question to ensure a clean transition
        // This also allows for any animations or transitions to complete
        intervalId = setInterval(showNextWord, 500);
    }
};

onMounted(() => {
    intervalId = setInterval(showNextWord, 500);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

</script>
<style>
body,
html {
    background: #eaf4fc;
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
}
</style>
<style scoped>
.word-revealer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: rgb(93, 168, 7);
    font-size: 100px;
}

.kroq {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 20px;

    font-size: 24px;
    color: rgb(93, 168, 7);
    text-align: center;
}

.replay-btn,
.next-question-btn {
    width: fit-content;
    margin: 0 auto;
    background: #91989e;
    color: #FFF;
    border: none;
    padding: 8px 12px;
    border-radius: 50px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
    {
    opacity: 0;
}

@media only screen and (max-width: 850px) {
    .word-revealer {


        font-size: 70px;
    }
}
</style>
