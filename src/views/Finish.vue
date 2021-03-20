<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="recognition">
      <button class="record-btn" @click="record">{{ recordBtnValue }}</button>
      <div>
        <textarea class="recorded-text" v-model="recoredText" />
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       msg: "こんちは！！",
//       recognizing: false,
//       recognition: null,
//       recordBtnValue: "録音",
//       recoredText: "",
//     }
//   },
//   methods: {
//     record: function() {
//       if (this.recognizing) {
//         this.recognition.stop();
//         this.recordBtnValue = "録音";
//       } else {
//         this.recognition.start();
//         this.recordBtnValue = "停止";
//       }
//       this.recognizing = !this.recognizing;
//     },
//     async recognize(e: SpeechRecognitionEvent) {
//       this.recoredText += `${e.results[e.results.length - 1][0].transcript}\n`;
//       }
//   },
//   async created() {
//     const { webkitSpeechRecognition } = window;
//     const recognition = new webkitSpeechRecognition();
//     recognition.lang = "ja-JP";
//     recognition.continuous = true;
//     recognition.onresult = await this.recognize;
//     this.recognition = recognition;
//   },
//   computed: {
    
//   }
// }
</script>
