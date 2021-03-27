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
      <div id="Esentence">{{ answerInfo }}</div>
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
      answerInfo: [],
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
      answerMaker: function() {

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

    const resChapters = await axios.get("chapter.json");
    const chapters = resChapters.data.chapter;
    const selectData = this.$route.query.data;
    // 選択したチャプターの情報をループさせる
    selectData.forEach((s) => {
      console.log(s);
      console.log(selectData);
      // chaptersの中から取り出す選択したチャプターとマッチするものを取り出す
      const chapter = chapters.find((c) => c.id === selectData.chapterId);
      // チャプターが存在していたら
      if (chapter) {
        const filterdChapter = chapter.chapterContents.filter((content) => content.id === selectData.contentsIds
          // セクションidが含まれているか確認
        );
        // 選択したチャプターのフレーズのみ取得
        var answerInfo = this.answerInfo;
        answerInfo = filterdChapter;
        console.log(answerInfo);
      }
    });
  }
}
</script>