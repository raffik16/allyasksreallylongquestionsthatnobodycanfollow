<template>
  <div>
    <Title>Ally asks really long questions that nobody can follow.com</Title>
    <!-- <word-revealer :texts="questions" /> -->
    <animated-questions :questions="questions" />

    <div class="meta">
      <!-- <p>
        Tap for audio
      </p> -->
      <img class="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Seal_of_the_President_of_the_United_States.svg/1920px-Seal_of_the_President_of_the_United_States.svg.png" />
    </div>
  </div>
</template>

<script setup>
const questions = ["It was kind of expensive right. Is it still. So I mean is it still I mean you've blown up so quickly. Is it still really nerve wracking even in front of audiences. And I know for comedians now, too, the social media is becoming such a bigger part of that whole routine as well. Like so many comedians now putting up clips and little things like snippets or crowd work or something like that, just to kind of blow up on TikTok, and then also that your show is selling out when it wasn't before because of the the stuff you're putting out on social media. Like, are people writing material specifically for social media now, or is it just, I'm gonna take these bits and pieces that are like, good enough to get people into the room, and that's what I'm gonna give them my gold?", "Fluffy. I'm noticing that even in this torrential downpour, this atmospheric river, this Pineapple Express, whatever it's been called, you're still wearing shorts. Will any whether you wear pants ever?"]

// const questions = ["It was kind of expensive right?", "Fluffy you wear pants ever?"]
</script>
<style scoped>
.meta {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #91989e;
}

.img {
  width: 70px;
}
</style>