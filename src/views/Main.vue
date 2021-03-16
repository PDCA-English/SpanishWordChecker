<template>
  <div id="app">
    <div class="mainHeader">
      <button>Start</button>
      <ul>
        <li>チャプター数：{{checkedChapterNum}}</li>
        <li>セクション数：{{checkedSectionNum}}</li>
        <li>フレーズ数：--</li>
      </ul>
      <ul>
        <li>制限時間：<input type="checkbox"></li>
        <li>ヒント：<input type="checkbox"></li>
       </ul>
    </div>
    <div v-for="(chapter,index) in chapters" :key="index">
      <h1>
        <input type="checkbox" id="" value="" v-model="chapter.isSelected">
        Chapter{{index+1}}：{{chapter.name}}
      </h1>
      <ul v-for="(chapterContent,index) in chapter.chapterContents" :key="index">
        <li>
          <input type="checkbox" id="" value="" v-model="chapterContent.isSelected">
          {{index+1}}. {{chapterContent.sectionName}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chapters: [
        {
          id: 1,
          name: "ミニ文法",
          numOfSections: 7,
          isSelected: false,
          chapterContents: [
            {
              id: 1,
              sectionName: "現在形",
              isSelected: false,
              sectionContents: [
                {
                  id: 1,
                  jsentence: "私は（今）サンドイッチを食べています。",
                  esentence: "Yo como un bocadillo ahora.",
                  sectionNum: "101現在形"
                },
                {
                  id: 2,
                  jsentence: "私は（今）サンドイッチを食べています。（現在進行形）",
                  esentence: "Yo estoy comiendo un bocadillo ahora.",
                  sectionNum: "101現在形"
                },
                {
                  id: 3,
                  jsentence: "父はタバコを吸います。",
                  esentence: "Mi padre fuma.",
                  sectionNum: "101現在形"
                },
                {
                  id: 4,
                  jsentence: "アナは美しい。（アナは常に美しい）",
                  esentence: "Ana es guapa.",
                  sectionNum: "101現在形"
                },
                {
                  id: 5,
                  jsentence: "アナは今日きれいだ。（化粧や洋服などがいつもと違い、今日のアナはきれいだ）",
                  esentence: "Ana está guapa hoy.",
                  sectionNum: "101現在形"
                },
                {
                  id: 6,
                  jsentence: "私の家は福岡にある。",
                  esentence: "Mi casa está en Fukuoka.",
                  sectionNum: "101現在形"
                },
                {
                  id: 7,
                  jsentence: "パーティーは私の家で行われる。",
                  esentence: "La fiesta es en mi casa.",
                  sectionNum: "101現在形"
                },
                {
                  id: 8,
                  jsentence: "私は１時間以内に空港に着きます。",
                  esentence: "Llego al aeropuerto en una hora.",
                  sectionNum: "101現在形"
                },
                {
                  id: 9,
                  jsentence: "もうちょっとでつまずいて転ぶところだった。",
                  esentence: "Casi tropiezo y me caigo.",
                  sectionNum: "101現在形"
                }
              ]
            },
            {
              id: 2,
              sectionName: "過去形",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 3,
              sectionName: "未来形",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 4,
              sectionName: "進行形",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 5,
              sectionName: "再帰動詞",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 6,
              sectionName: "接続法",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 7,
              sectionName: "目的語の代名詞",
              isSelected: false,
              sectionContents: []
            }
          ]
        },
        {
          id: 2,
          name: "文を作るための道具箱（構文編）",
          numOfSections: 40,
          isSelected: false,
          chapterContents: [
            {
              id: 1,
              sectionName: "〜がいた、あった（行われた）",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 2,
              sectionName: "～な日だった、今日は～だった",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 3,
              sectionName: "〜した、〜したことがある",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 4,
              sectionName: "〜を始める、〜し始める",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 5,
              sectionName: "〜を終える、〜し終える",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 6,
              sectionName: "〜へ行く、〜しに行く",
              isSelected: false,
              sectionContents: []
            },
            {
              id: 7,
              sectionName: "〜が来る",
              isSelected: false,
              sectionContents: []
            }
          ]
        }
      ]
    };
  },
  computed: {
    checkedChapterNum: function() {
      var count = 0;
      var chapters = this.chapters;
      var length = chapters.length;
      for(var i = 0; i < length; i++) {
        if(chapters[i].isSelected) {
          count++;
        }
      }
      return count;
    },
    checkedSectionNum: function() {
      var count = 0;
      var chapterContents = this.chapters[0].chapterContents;
      var length = chapterContents.length;
      for(var i = 0; i < length; i++) {
        if(chapterContents[i].isSelected) {
          count++;
        }
      }
      return count;
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}

/* mainHeader */
.mainHeader {
  display: flex;
}

.mainHeader ul {
  text-align: right;
}
</style>