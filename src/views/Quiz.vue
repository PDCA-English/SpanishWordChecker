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
      <div id="Esentence"></div>
      <div id="myAnswer">{{ myAnswer }}</div>
      <div id="recoredText">{{ recoredText }}</div>
      <h1 v-show="correctness">！正解！</h1>
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
      time: 11,
      timeComment: "",
      /*answer checker*/
      myAnswer: "",
      answerOne: "yo como".split(" "),
      correctness: false,
      waitSec: 3,
      questions: [],
      correctOnes: [],
      questionCounter: 0,
      currentQuestion: [],
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
          this.nextQuestion();
        } else if(this.time===0){
          this.nextQuestion();
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
        var currentQuestionEs = [];
        currentQuestionEs = this.currentQuestion.esentence.toLowerCase().split(" ").replace(/!/g, '').replace(/¡/g, '').replace(/\?/g, '').replace(/¿/g, '').replace(/./g, '');
        console.log("currentQuestionEs",currentQuestionEs);
        for (let i = 0, j = 0; i < recoredTextArray.length; ){
          if (recoredTextArray[i] === currentQuestionEs[j]){
              console.log("recoredTextArray[i]",recoredTextArray[i]);
              console.log("this.currentQuestionEs[i]",currentQuestionEs[i]);
            tempAns.push(recoredTextArray[i]);
            i += 1;
            j += 1;
          } else {
            i += 1;
          }
        }
        this.myAnswer = tempAns.join(" ");
      },
      nextQuestion: function() {
        this.myAnswer = "";
        this.questionCounter += 1;
        this.currentQuestion = this.questions[this.questionCounter];
        console.log("is this next one??",this.currentQuestion);
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
    let phraseList = [];
    selectData.forEach((s) => {
      // チャプターの情報を取得
      // chapterからchapterContents（セクション）の情報を取得する
      // 理由：（前のページで選択されたセクションのidが含まれているか判定するため）
      const chapter = chapters.find((c) => c.id === s.chapterId);

      // 前のページで選択されたセクション情報を取得後セクションの情報取得
      // フレーズの取得
      const sectionPhrase = chapter.chapterContents
        .filter((content) => s.contentsIds.includes(content.id))
        .map((c) => c.sectionContents);
      console.log("sectionPhrase",sectionPhrase);
      phraseList = phraseList.concat(sectionPhrase).flat();
      console.log("phraseList",phraseList);
    });
    // phraseListをシャッフルしquestionsへ格納
    const shuffle = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    this.questions = shuffle(phraseList);
    console.log("this.questions shuffled one",this.questions);
    this.currentQuestion = this.questions[this.questionCounter];
    console.log("this.currentQuestion",this.currentQuestion)
    console.log("this.currentQuestion.esentence",this.currentQuestion.esentence)
  },
  watch: {
    recoredText: function() {
      // console.log("check");
      this.answerChecker();
      if(this.myAnswer === this.answerOne.join(" ")){
        this.correctness = true;
        this.myAnswer = this.currentQuestion.esentence;
        var self = this;
        setTimeout(function(){
          self.correctness = false;
          this.nextQuestion();
          },self.waitSec*1000);
        }
    }
  }
}
</script>