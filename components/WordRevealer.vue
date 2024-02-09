<template>
    <div>
        <transition name="fade">
            <div v-if="!showInput" class="word-revealer">
                {{ currentWord }}
            </div>
        </transition>
        <transition name="fade">
            <div v-if="showInput" class="kroq">
                Famous words by Ally Johnson
            </div>
        </transition>
        <transition name="fade">

        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    text: {
        type: String,
        required: true,
    },
});

const currentWord = ref('');
const words = props.text.split(' ');
let index = 0;
let intervalId;
const showInput = ref(false);
const userAnswer = ref('');

const showNextWord = () => {
    if (index < words.length) {
        currentWord.value = words[index];
        index += 1;
    } else {
        clearInterval(intervalId);
        showInput.value = true; // Show the input after all words have been shown
    }
};

onMounted(() => {
    intervalId = setInterval(showNextWord, 500);
});

onUnmounted(() => {
    clearInterval(intervalId);
});

const handleSubmit = () => {
    // Implement your submission logic here
    // For example, using EmailJS or a custom backend endpoint
    console.log("User's answer:", userAnswer.value);
    // Reset or provide feedback as needed
};
</script>

<style scoped>
.word-revealer {
    position: absolute;
    left: 50%;
    top: 50%;
    font-family: 'Barlow', sans-serif;
    font-family: 400;
    transform: translate(-50%, -50%);

    font-size: 100px;
}

.kroq {
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);
    display: flex;
    font-size: 24px;
    font-family: 'Barlow', sans-serif;
    font-family: 400;
    text-align: center;
}


/* .img {
    width: 100%;
    height: 100%;
} */

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
