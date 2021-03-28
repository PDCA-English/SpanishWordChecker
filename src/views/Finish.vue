<template>
  <div class="home">
    <h1>{{ recoredText }}</h1>
    <h3>{{ timeComment }}</h3>
    <h1>{{ myAnswer }}</h1>
    <h1 v-show="correctness">！正解！</h1>
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
      time: 11,
      timeComment: "",
      /*answer checker*/
      myAnswer: "",
      answerOne: "yo como".split(" "),
      correctness: false,
      waitSec: 3,
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
        if(this.correctness === true){
          this.timeComment = "！正解！";
          this.time = 10;
        } else if(this.time<=0 && this.time>=-this.waitSec){
          this.timeComment = "終了";
        } else if(this.time==-this.waitSec-1){
          this.time = 10;
          this.timeComment = `残り${this.time}秒`;
        }
      },
      answerChecker: function() {
        var recoredTextArray = this.recoredText.split(" ");
        var tempAns = [];
        for (let i = 0, j = 0; i < recoredTextArray.length; ){
          // console.log(recoredTextArray[i]);
          // console.log(this.answerOne[i]);
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
  },
  watch: {
    recoredText: function() {
      console.log("check");
      this.answerChecker();
      if(this.myAnswer === this.answerOne.join(" ")){
        this.correctness = true;
        var self = this;
        setTimeout(function(){
          self.correctness = false;
          },self.waitSec*1000);
        }
    }
  }
}
</script>

