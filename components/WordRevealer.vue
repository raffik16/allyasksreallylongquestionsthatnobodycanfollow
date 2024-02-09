<template>
    <div>
        <transition name="fade">
            <div v-if="!showText" class="word-revealer">
                {{ currentWord }}
            </div>
        </transition>
        <transition name="fade">
            <div v-if="showText" class="kroq">
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
const showText = ref(false);

const showNextWord = () => {
    if (index < words.length) {
        currentWord.value = words[index];
        index += 1;
    } else {
        clearInterval(intervalId);
        // Use setTimeout to delay showing the next content
        setTimeout(() => {
            showText.value = true; // This will now wait 1.25 second before setting to true
        }, 1250);
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
}
</style>
<style scoped>
.word-revealer {
    position: absolute;
    left: 50%;
    top: 50%;
    font-family: 'Barlow', sans-serif;
    font-family: 400;
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
    font-size: 24px;
    font-family: 'Barlow', sans-serif;
    color: rgb(93, 168, 7);

    font-family: 400;
    text-align: center;
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
