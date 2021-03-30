<template>
  <div id="app">
    <div class="quizHeader">
      <router-link :to="{name:'Main'}">
        <button>戻る</button>
      </router-link>
      <div id="timer">{{ timeComment }}</div>
      <div id="counter">{{ correctOnes.length }}/{{ this.$route.query.num }}</div>
    </div>
    <div class="quizContents">
      <div id="Jsentence">{{ jsentence }}</div>
      <div id="Esentence" v-show="correctness">{{ esentence }}</div>
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
      time: 21,
      interval: 20,
      timeComment: "",
      /*answer checker*/
      myAnswer: "",
      correctness: false,
      waitSec: 3,
      questions: [],
      correctOnes: [],
      questionCounter: 0,
      currentQuestion: [],
      currentQuestionEs: [],
      esentence: "",
      jsentence: "",
      repCounter: 0,
    }
  },
  mounted() {
    this.timer=setInterval(this.countdown, 1000);
  },
  methods: {
    /* 音声認識 */
    async recognize(e) {
      for(var i = e.resultIndex; i< e.results.length; i++) {
        var transcript = e.results[i][0].transcript;
        transcript.replace("\n", "<br>");
        this.recoredText += transcript;
        }
      },
      /* 制限時間を表示するタイマー */
      countdown: function() {
        this.time --;
        this.timeComment = `残り${this.time}秒`;
        // 正解した場合は
        if(this.correctness === true){
          // 「！正解！」と表示し
          this.timeComment = "！正解！";
          // タイマーを元の秒数へ戻し
          this.time = this.interval;
        // タイマーが０になってしまった場合はwaitSecの間だけ「終了」を表示させ
        } else if(this.time<=0 && this.time>=-this.waitSec){
          this.timeComment = "終了";
        // waitSecを過ぎたらタイマーを元の秒数へ戻し、残りの秒数表示へ変更した後、次の質問へ
        } else if(this.time==-this.waitSec-1){
          this.time = this.interval;
          this.timeComment = `残り${this.time}秒`;
          this.nextQuestion();
        }
      },
      /* 回答と正解を比較 */
      answerChecker: function() {
        // 音声認識で取得したrecoredTextをtoLowerCaseをした上で配列recoredTextArrayとして定義
        var recoredTextArray = this.recoredText
                                   .toLowerCase()
                                   .split(" ");
        // 暫定的な答えを入れるための配列tempAnsを定義
        var tempAns = [];
        // 回答と比べるのはスペイン語の文だけなので現在出題中のcurrentQuestion内のesentenceのみを取得
        // 配列内では大文字や記号が存在し、比較の妨げになるので、replaceで削除、splitで配列へ変換
        this.currentQuestionEs = this.currentQuestion
                                .esentence
                                .toLowerCase()
                                .replace(/!/g, '')
                                .replace(/¡/g, '')
                                .replace(/\?/g, '')
                                .replace(/¿/g, '')
                                .replace(/\./, '')
                                .split(" ");
        // 音声認識の回答と正解を比較していく
        for (let i = 0, j = 0; i < recoredTextArray.length; ){
          // 音声認識の回答と正解が一致した場合は暫定的な答えを入れるための配列tempAnsに答えを格納し
          // recoredTextArrayとcurrentQuestionEsどちらも次の要素へ移動し比較
          if (recoredTextArray[i] === this.currentQuestionEs[j]){
            tempAns.push(recoredTextArray[i]);
            i += 1;
            j += 1;
          // 異なる場合はrecoredTextArrayのみ先へ進め比較を繰り返す
          } else {
            i += 1;
          }
        }
        // 最語に暫定的な答えだったtempAnsをjoinで１つの文にし、myAnswerとする
        this.myAnswer = tempAns.join(" ");
      },
      /* 次の問題への移行 */
      nextQuestion: function () {
        console.log("nextQuestion start");
        // まず「正解」と表示されている場合があるので、それを消すためにcorrectnessをfalseへ
        this.correctness = false;
        // recoredTextとmyAnswerは初期化
        this.recoredText = "";
        this.myAnswer = "";
        // 次の問題へ移行するためにquestionCounterに１を足す
        this.questionCounter += 1;
        // 一周出題が終わったらquestionCounterを０に戻す
        if (this.questionCounter > this.questions.length-1) {
          this.questionCounter = 0;
          this.repCounter += 1;
        }
        // 次の問題を定義
        console.log("this.questionCounter",this.questionCounter);
        console.log("this.questions",this.questions);
        this.currentQuestion = this.questions[this.questionCounter];
        console.log("this.currentQuestion",this.currentQuestion);
        // 次の問題のスペイン語・日本語部分を定義
        this.esentence = this.currentQuestion.esentence;
        this.jsentence = this.currentQuestion.jsentence;
        console.log("nextQuestion end");
      }
  },
  async created() {
    // 音声認識の部分
    const { webkitSpeechRecognition } = window;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "es-ES";
    recognition.continuous = true;
    recognition.onresult = await this.recognize;
    this.recognition = recognition;
    this.recognition.start();

    // Main.vueからの情報を受け取る
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

      // 問題にする際、１つの配列にまとまっているべきなのでまとめる
      phraseList = phraseList.concat(sectionPhrase).flat();
    });
    // ランダムに出題したいのでphraseListをシャッフルしquestionsへ格納
    const shuffle = ([...array]) => {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };
    this.questions = shuffle(phraseList);
    console.log("*after shuffle(phraseList)",this.questions)
    // 最初の問題を作成
    this.currentQuestion = this.questions[this.questionCounter];
    this.currentQuestionEs = this.currentQuestion.esentence;
    this.esentence = this.currentQuestion.esentence;
    this.jsentence = this.currentQuestion.jsentence;
  },
  // recoredTextが変わったときにanswerCheckerが発火
  watch: {
    recoredText: function() {
      this.answerChecker();
      // 回答myAnswerと正解currentQuestionEsが一致した場合
      if(this.myAnswer === this.currentQuestionEs.join(" ")){
        // 「正解」を表示するためcorrectnessをtrueに
        this.correctness = true;
        // 正解を言えた問題はcorrectOnesへ格納
        this.correctOnes.push(this.questions[this.questionCounter]);
        // すでに正解を言えた問題は２回以上出題できないようquestionsから削除
        var index = this.questions.indexOf(this.questions[this.questionCounter]);
        this.questions.splice(index, 1);
        console.log("*after splice",this.questions);
        // 正解と比較していた回答は全て小文字で記号も削除しているので、
        // 元の文であるcurrentQuestion.esentenceをmyAnswerへ代入し、最初が大文字で記号付きの正しい文をページに表示
        this.myAnswer = this.currentQuestion.esentence;
        // 正解した次の瞬間に次の問題へ移行してしまうと答えをちゃんと確認できないので、waitSec分待ってから処理を行う
        var self = this;
        setTimeout(function(){
          self.correctness = false;
          self.nextQuestion();
          },self.waitSec*1000);
        }
    }
  }
}
</script>