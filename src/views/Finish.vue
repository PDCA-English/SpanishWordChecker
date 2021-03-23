<template>
  <div class="home">
    <h1>{{ recoredText }}</h1>
    <h3>{{ timeComment }}</h3>
    <h1>{{ myAnswer }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      /*voice recognition*/
      recognition: null,
      recoredText: "",
      /*timer*/
      timer: null,
      time: 10,
      timeComment: "",
      /*answer checker*/
      myAnswer: "",
      answerOne: "yo como un bocadillo".split(" "),
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
      countdown: function() {
        this.time --;
        this.timeComment = `残り${this.time}秒`;
        if(this.time==0){
          clearInterval(this.timer)
          this.timeComment = "終了";
        }
      },
      answerChecker: function() {
        var recoredTextArray = this.recoredText.split(" ");
        var tempAns = [];
        for (let i = 0, j = 0; i < recoredTextArray.length; ){
          console.log(recoredTextArray[i]);
          console.log(this.answerOne[i]);
          if (recoredTextArray[i] === this.answerOne[j]){
            tempAns.push(recoredTextArray[i]);
            i += 1;
            j += 1;
          } else {
            i += 1;
          }
        }
        this.myAnswer = tempAns.join(" ");
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
    this.answerChecker();
    // this.voiceRecogChecker();
  // },
  //   computed: {
  //   voiceRecogChecker: function() {
  //     if(this.recoredText !== "") {
  //       this.answerChecker();
  //     }
  //     return this.answerChecker();
  //   }
  }
}
</script>

