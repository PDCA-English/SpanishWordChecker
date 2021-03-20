<template>
  <div id="app" @load="record">
    <div class="quizHeader">
      <router-link :to="{name:'Main'}">
        <button>戻る</button>
      </router-link>
      <div id="timer"></div>
      <div id="counter"></div>
    </div>
    <div class="quizContents">
      <div id="Jsentence"></div>
      <div id="Esentence">
        <textarea class="recorded-text" v-model="recoredText" />
      </div>
    </div>
    <div class="quizHints">
      <button>単語数</button>
      <button>頭文字</button>
      <button>ヒント</button>
    </div>
  </div>
</template>

// <script>
// export default {
//   data() {
//     return {
//       recognizing: boolean = false,
//       recognition: any = null,
//       recoredText: string = "",
//     }
//   },
//   methods: {
//   async created() {
//     const { webkitSpeechRecognition } = window;
//     const recognition = new webkitSpeechRecognition();
//     recognition.lang = "ja-JP";
//     recognition.continuous = true;
//     recognition.onresult = await this.recognize;
//     this.recognition = recognition;
//   },
//   record: function() {
//   if (this.recognizing) {
//     this.recognition.stop();
//   } else {
//     this.recognition.start();
//   }
//   this.recognizing = !this.recognizing;
//   },
//   async recognize(e: SpeechRecognitionEvent) {
//     this.recoredText += `${e.results[e.results.length - 1][0].transcript}\n`;
//   },
//   computed: {
//   }

//   protected record() {
//     if (this.recognizing) {
//       this.recognition.stop();
//     } else {
//       this.recognition.start();
//     }
//     this.recognizing = !this.recognizing;
//   }
// }
// </script>
