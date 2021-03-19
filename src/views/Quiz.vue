<template>
  <div id="app">
    <div class="quizHeader">
      <router-link :to="{name:'Main'}">
        <button>戻る</button>
      </router-link>
      <div id="timer"></div>
      <div id="counter"></div>
    </div>
    <div class="quizContents">
      <div id="Jsentence"></div>
      <div id="Esentence"></div>
    </div>
    <div class="quizHints">
      <button>単語数</button>
      <button>頭文字</button>
      <button>ヒント</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>
