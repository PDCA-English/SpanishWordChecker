<template>
  <div class="home">
    <h1>{{ recoredText }}</h1>
    <h3>{{ timeComment }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recognition: null,
      recoredText: "",
      myAnswer: "",
      timer: null,
      time: 10,
      timeComment: "",
    }
  },
  mounted() {
    this.timer=setInterval(this.countdown, 1000);
  },
  methods: {
    async recognize(e) {
      for(var i = e.resultIndex; i< e.results.length; i++) {
        var transcript = e.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        this.recoredText += transcript;
        }
      },
      countdown() {
        this.time --;
        this.timeComment = `残り${this.time}秒`;
        if(this.time==0){
          clearInterval(this.timer)
          this.timeComment = "終了";
        }
      }
  },
  async created() {
    const { webkitSpeechRecognition } = window;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.onresult = await this.recognize;
    this.recognition = recognition;
    this.recognition.start();
  },
  computed: {}
}
</script>
