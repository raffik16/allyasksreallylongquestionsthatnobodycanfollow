<template>
    <div>
        <transition name="fade">
            <div v-if="!showText" class="word-revealer" v-html="currentWord" />
        </transition>

        <transition name="fade">
            <div v-if="showText" class="kroq">
                Famous words by Ally Johnson
                <button v-if="showReplayButton && currentTextIndex < props.texts.length - 1" @click="replay"
                    class="replay-btn">Replay</button>
                <button v-else-if="showReplayButton" @click="startOver" class="replay-btn">Start Over</button>
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
const isMuted = ref(false); // Track mute state
const isSpeaking = ref(false);

const showNextWord = () => {
    if (index < words.length) {
        // Only set isSpeaking to true at the start of the sequence
        if (index === 0) {
            isSpeaking.value = true;
        }

        currentWord.value = words[index];
        if (!isMuted.value) {
            const utterance = new SpeechSynthesisUtterance(words[index]);
            utterance.rate = 0.8;
            utterance.onend = () => {
                // Check if this was the last word
                if (index >= words.length - 1) {
                    isSpeaking.value = false; // No more words to speak
                }
                // Logic to move to the next word or handle end of speech remains the same
            };
            speechSynthesis.speak(utterance);
        }
        index += 1;
    } else {
        // When all words have been processed
        clearInterval(intervalId);
        intervalId = null;
        isSpeaking.value = false; // Ensure this is outside the if (!isMuted.value) block
        // Handle showing text or replay options as before
    }
};


const toggleMute = () => {
    isMuted.value = !isMuted.value;
};

const startOver = () => {
    currentTextIndex = 0; // Reset to the first text
    setupNextText(); // Initialize the component for the first text
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
        // Prepare for the next set of words
        setupNextText();
    }
};

const setupNextText = () => {
    // Reset the index and clear the current word for a clean start
    index = 0;
    currentWord.value = '';
    // Prepare the words for the new text
    words = props.texts[currentTextIndex].split(' ');
    // Make sure to clear any existing interval and reset visibility states
    clearInterval(intervalId);
    showText.value = false;
    showReplayButton.value = false;
    showNextQuestionButton.value = false;
    // Allow a brief moment before starting to display the next set of words
    // This ensures a clean transition, especially if there's any lingering UI updates
    setTimeout(() => {
        intervalId = setInterval(showNextWord, 500);
    }, 100);
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

    cursor: pointer;
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
