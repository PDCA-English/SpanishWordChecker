<template>
  <div class="home">
    <h1>{{ recoredText }}</h1>
    <h3>{{ timeComment }}</h3>
    <h1>{{ answerChecker }}</h1>
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
      answerOne: "yo como un bocadillo".split(' '),
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
        //音声認識で取得したrecoredTextを配列にする
        var recoredTextArray = this.recoredText.split(' ');
        //答え（answerOne）に一致する単語をrecoredTextArrayから入れるための箱を作る
        var tempAns = [];
        //音声認識で取得したrecoredTextArrayの単語の分だけ同じ処理を繰り返す
        for (let i = 0, j = 0; i < recoredTextArray.length; ){
          //音声認識で取得したrecoredTextArrayと答えが一致するか確認
          if (recoredTextArray[i] === this.answerOne[j]){
            //一致すれば答えと一致したrecoredTextArrayの単語をtempAnsへ格納する
            tempAns.push(recoredTextArray[i]);
            //チェックし終えたものはもういいので、次へ
            i += 1;
            //答えも次の単語とrecoredTextArrayを比べるため次へ
            j += 1;
          } else {
            //一致しない場合は
            i += 1;
          }
          //正解と一致した回答（myAnswer）を定義
          var myAnswer = this.myAnswer
          //myAnswerは一致した答えを格納した配列をjoin(' ')でつなげることで文になる
          myAnswer = tempAns.join(' ');
        }
        return(myAnswer);
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
  }
}
</script>

