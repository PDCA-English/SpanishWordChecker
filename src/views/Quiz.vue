<template>
  <div id="app">
    <div class="quizHeader">
      <router-link :to="{name:'Main'}">
        <button>戻る</button>
      </router-link>
      <div id="timer">{{ timeComment }}</div>
      <div id="counter"></div>
    </div>
    <div class="quizContents">
      <div id="Jsentence"></div>
      <div id="Esentence">{{ selectedPhrases }}</div>
      <div id="recoredText">{{ recoredText }}</div>
    </div>
    <div class="quizHints">
      <button>単語数</button>
      <button>頭文字</button>
      <button>ヒント</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
      selectedPhrases: {},
      chapter: {},
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
      async mounted() {
        const resChapters = await axios.get("chapter.json");
        this.chapters = resChapters.data.chapter;
      },
      selectedPhrasesGetter() {
        var queryData = this.$route.query.data;
        var queryDataLength = queryData.length;
        for (let i = 0; i < queryDataLength; i++) {
          var contentsIdsData = queryData[i].contentsIds;
          var contentsIdsDataLength = contentsIdsData.length;
          for (let j = 0; j < contentsIdsDataLength; j++) {
            this.selectedPhrases.push(contentsIdsData[j]);
          }
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