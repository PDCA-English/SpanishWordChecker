<template>
  <div id="app">
    <div class="mainHeader">
      <button @click="selectedPhrasesObjectGetter()">Start</button>
      <ul>
        <li>チャプター数：{{checkedChapterNum}}</li>
        <li>セクション数：{{checkedSectionNum}}</li>
        <li>フレーズ数：{{checkedSectionContentsNum}}</li>
      </ul>
      <ul>
        <li>制限時間：<input type="checkbox"></li>
        <li>ヒント：<input type="checkbox"></li>
       </ul>
    </div>
    <div v-for="(chapter,index) in chapters" :key="index">
      <h1>
        <input type="checkbox" id="" value="" @change="changeChildStatus()" v-model="chapter.isSelected">
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
import axios from "axios";
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
              sectionContents: [
                {
                  id: 1,
                  jsentence: "金曜日に大学の友達と話した。",
                  esentence: "El viernes hablé con un amigo de la universidad.",
                  sectionNum: "102過去形"
                },
                {
                  id: 2,
                  jsentence: "年初めてスペイン料理を食べた。",
                  esentence: "El año pasado comí por primera vez comida española.",
                  sectionNum: "02過去形"
                },
                {
                  id: 3,
                  jsentence: "メキシコ料理店でタコスを頼んだ。",
                  esentence: "En el restaurante mexicano pedí tacos.",
                  sectionNum: "102過去形"
                },
                {
                  id: 4,
                  jsentence: "ストランで働いていたころ、お客さんとたくさんしゃべっていた。",
                  esentence: "ando trabajaba en el restaurante, hablaba mucho con los clientes.",
                  sectionNum: "102過去形"
                },
                {
                  id: 5,
                  jsentence: "アルゼンチンに住んでいたころは、魚をまったく食べていなかった。",
                  esentence: "Cuando vivía en Argentina, yo nunca comía pescado.",
                  sectionNum: "102過去形"
                },
                {
                  id: 6,
                  jsentence: "息子が小さかったころ、いつも私にカレーライスを出すようせがんでいた。",
                  esentence: "uando mi hijo era pequeño, siempre me pedía arroz con curry.",
                  sectionNum: "102過去形"
                },
                {
                  id: 7,
                  jsentence: "彼氏と今夜のパーティーについて話したところよ。",
                  esentence: "He hablado con mi novio sobre la fiesta de esta noche.",
                  sectionNum: "102過去形"
                },
                {
                  id: 8,
                  jsentence: "今日友達とピザを食べてきた。",
                  esentence: "Hoy he comido pizza con mis amigos.",
                  sectionNum: "102過去形"
                },
                {
                  id: 9,
                  jsentence: "今日のお昼はパエリヤを頼んだ。",
                  esentence: "Hoy he pedido paella para comer.",
                  sectionNum: "102過去形"
                },
                {
                  id: 10,
                  jsentence: "父は車の工場で働いたことがある。",
                  esentence: "Mi padre ha trabajado en una fábrica de coches.",
                  sectionNum: "102過去形"
                },
                {
                  id: 11,
                  jsentence: "私はベネズエラに旅行したことがあって、好きになった。",
                  esentence: "Yo he viajado a Venezuela, y me gustó.",
                  sectionNum: "102過去形"
                }
              ]
            },
            {
              id: 3,
              sectionName: "未来形",
              isSelected: false,
              sectionContents: [
                {
                  id: 1,
                  jsentence: "私は明日北海道に旅行に行きます。",
                  esentence: "Yo viajo a Hokkaido mañana.",
                  sectionNum: "103未来形"
                },
                {
                  id: 2,
                  jsentence: "私は北海道に旅行に行く予定です。",
                  esentence: "Yo viajaré a Hokkaido.",
                  sectionNum: "103未来形"
                },
                {
                  id: 3,
                  jsentence: "私は彼女とご飯を食べます。",
                  esentence: "Yo voy a comer con mi novia.",
                  sectionNum: "103未来形"
                },
                {
                  id: 4,
                  jsentence: "私は仕事を頑張ります！",
                  esentence: "¡Voy a esforzarme en mi trabajo!",
                  sectionNum: "103未来形"
                }
              ]
            },
            {
              id: 4,
              sectionName: "進行形",
              isSelected: false,
              sectionContents: [
                {
                  id: 1,
                  jsentence: "駅に向かっているところです。",
                  esentence: "Estoy yendo a la estación.",
                  sectionNum: "104進行形"
                },
                {
                  id: 2,
                  jsentence: "最近、彼氏がジムに通っている。",
                  esentence: "Últimamente mi novio está yendo al gimnasio.",
                  sectionNum: "104進行形"
                },
                {
                  id: 3,
                  jsentence: "今日は市役所で働いている。",
                  esentence: "Hoy estoy trabajando en el ayuntamiento.",
                  sectionNum: "104進行形"
                },
                {
                  id: 4,
                  jsentence: "1時間前は運転していた。（まさに運転中だった＝過去進行形）",
                  esentence: "Hace una hora estaba conduciendo.",
                  sectionNum: "104進行形"
                },
                {
                  id: 5,
                  jsentence: "1年前、父はまだ運転していた。（いつも運転する習慣があった＝線過去）",
                  esentence: "Hace un año, mi padre aún conducía.",
                  sectionNum: "104進行形"
                }
              ]
            },
            {
              id: 5,
              sectionName: "再帰動詞",
              isSelected: false,
              sectionContents: [
                {
                  id: 1,
                  jsentence: "私は平日は６時に目が覚める。",
                  esentence: "Me despierto a las seis entre semana.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 2,
                  jsentence: "扉が開く。",
                  esentence: "La puerta se abre.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 3,
                  jsentence: "私は家に帰ったら手を洗う。（meは再帰代名詞、las manosは目的語）",
                  esentence: "Me lavo las manos al regresar a casa.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 4,
                  jsentence: "まだシャツを着ていません。（meは再帰代名詞、la camisaは目的語）",
                  esentence: "Aún no me he puesto la camisa.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 5,
                  jsentence: "私たちはウェルカムパーティーで知り合った。",
                  esentence: "Nos conocimos en la fiesta de bienvenida.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 6,
                  jsentence: "彼らは愛し合っていて、結婚する予定だ。",
                  esentence: "Ellos se aman y van a casarse.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 7,
                  jsentence: "去年、実家を出ました。",
                  esentence: "El año pasado me fui de casa de mis padres.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 8,
                  jsentence: "妻は僕の母と仲が悪い。",
                  esentence: "Mi esposa no se lleva bien con mi madre.",
                  sectionNum: "105再帰動詞"
                },
                {
                  id: 9,
                  jsentence: "私の子どもはみんな父に似ている。",
                  esentence: "Todos mis hijos se parecen a mi padre.",
                  sectionNum: "105再帰動詞"
                }
              ]
            },
            {
              id: 6,
              sectionName: "接続法",
              isSelected: false,
              sectionContents: [
                {
                  id: 1,
                  jsentence: "早く返事をくれるといいなぁ！（願望）",
                  esentence: "¡Ojalá me responda pronto!",
                  sectionNum: "106接続法"
                },
                {
                  id: 2,
                  jsentence: "明日雪が降るかもしれない。（疑惑）",
                  esentence: "Tal vez nieve mañana.",
                  sectionNum: "106接続法"
                },
                {
                  id: 3,
                  jsentence: "そのレストランにある料理を何でも食べる。",
                  esentence: "Me comeré toda la comida que hay en ese restaurante.",
                  sectionNum: "106接続法"
                },
                {
                  id: 4,
                  jsentence: "そのレストランにあった料理は何でも食べる。",
                  esentence: "Me comeré toda la comida que haya en ese restaurante.",
                  sectionNum: "106接続法"
                },
                {
                  id: 5,
                  jsentence: "兄が結婚したらいいなぁ。",
                  esentence: "Me gustaría que mi hermano se casara.",
                  sectionNum: "106接続法"
                },
                {
                  id: 6,
                  jsentence: "欲しい人にクッキーを１枚用意しています。",
                  esentence: "Tengo una galleta para quien la quiera.",
                  sectionNum: "106接続法"
                },
                {
                  id: 7,
                  jsentence: "晴れたら洗濯をするつもりだ。",
                  esentence: "Cuando haga sol, lavaré la ropa.",
                  sectionNum: "106接続法"
                },
                {
                  id: 8,
                  jsentence: "晴れているときは洗濯をする。",
                  esentence: "Cuando hace sol, lavo la ropa.",
                  sectionNum: "106接続法"
                },
                {
                  id: 9,
                  jsentence: "絵画が気に入ったら、迷わず買うでしょう。",
                  esentence: "Si me gustara un cuadro, lo compraría sin pensarlo.",
                  sectionNum: "106接続法"
                },
                {
                  id: 10,
                  jsentence: "もっとお金があれば、世界旅行に行っていたんだけどなあ。",
                  esentence: "Si tuviera más dinero, habría viajado por el mundo.",
                  sectionNum: "106接続法"
                },
                {
                  id: 11,
                  jsentence: "呼んでくれれば、車で迎えに行ったのに！",
                  esentence: "¡Si me hubieras llamado, te habría recogido en coche!",
                  sectionNum: "106接続法"
                }
              ]
            },
            {
              id: 7,
              sectionName: "目的語の代名詞",
              isSelected: false,
              sectionContents: [
                {
                  id: 1,
                  jsentence: "息子は私のことを30分待った。",
                  esentence: "Mi hijo me esperó media hora.（meは直接目的語）",
                  sectionNum: "107目的語の代名詞"
                },
                {
                  id: 2,
                  jsentence: "父が私にプレゼントをくれました。",
                  esentence: "Mi padre me dio un regalo.（meは間接目的語）",
                  sectionNum: "107目的語の代名詞"
                },
                {
                  id: 3,
                  jsentence: "息子が私のことを待っていた。",
                  esentence: "Mi hijo estaba esperándome.",
                  sectionNum: "107目的語の代名詞"
                },
                {
                  id: 4,
                  jsentence: "父は（私に）（それを）くれました。",
                  esentence: "Mi padre me lo dio.",
                  sectionNum: "107目的語の代名詞"
                },
                {
                  id: 5,
                  jsentence: "父は（それを）（私に）渡したいと思っている。",
                  esentence: "Mi padre quiere dármelo.",
                  sectionNum: "107目的語の代名詞"
                }
              ]
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
              sectionContents: [
                {
                  id: 1,
                  jsentence: "公園に見慣れない子どもが２人いた。",
                  esentence: "En el parque había dos niños nuevos.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 2,
                  jsentence: "昨日、私の住む地区でお祭りがあった。",
                  esentence: "Ayer hubo una verbena en mi barrio.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 3,
                  jsentence: "私の大学の学園祭は来週行われる。",
                  esentence: "El festival de mi universidad se celebra la semana que viene.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 4,
                  jsentence: "会社のクリスマス会がここで開催された。",
                  esentence: "La cena de Navidad de mi empresa se celebró aquí.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 5,
                  jsentence: "明後日の夜、私の誕生日会を開きます！",
                  esentence: "¡Pasado mañana por la noche celebraré mi fiesta de cumpleaños!",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 6,
                  jsentence: "冷蔵庫には飲むものが何もなかった。",
                  esentence: "En la nevera no había nada para beber.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 7,
                  jsentence: "明日、このバーでワインの試飲会が開かれます。",
                  esentence: "Mañana se celebra una cata de vinos en este bar.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 8,
                  jsentence: "昨日パーティーがあって、今日はゴミが山ほどある。",
                  esentence: "Ayer hubo una fiesta, y hoy hay un montón de basura.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 9,
                  jsentence: "去年は絵画教室の作品展が冬に行われた。",
                  esentence: "El año pasado, la exposición de la academia de pintura se celebró en invierno.",
                  sectionNum: "201〜がいた、あった（行われた）"
                },
                {
                  id: 10,
                  jsentence: "このレストランでスペイン料理ウイークが開催されます。",
                  esentence: "Este restaurante celebra una semana de comida española.",
                  sectionNum: "201〜がいた、あった（行われた）"
                }
              ]
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
  methods: {
    selectedPhrasesObjectGetter: function() {
      const lengthOfChapters = this.chapters.length;
      let returnData = [];

      for (let h = 0; h < lengthOfChapters; h++) {
        const chapter = this.chapters[h];
        const chapterId = chapter.id;
        let ids = [];
        // チャプター自体選択されていたら
        if (chapter.isSelected) {
          ids = chapter.chapterContents.map(c => c.id);
        } else {
          // 選択されているセクションを取り出し「ids」に代入
          // ids =
        }

        // チャプターの番号と選択されているセクションのidを持たせたデータ
        const data = {
          chapterId: chapterId,
          contentsIds: ids
        };
        returnData.push(data);
      }

      // 例外処理：選択されていなかったらページ遷移を行わない

      this.$router.push({ name: "Quiz", query: { data: returnData } });
      // 遷移先のページで「this.$route.query.data」このように記述するとqueryのデータを受け取ることができます
      // 遷移先のページでqueryに渡したデータを用いてフレーズのデータ取得
    },
    async mounted() {
      const resChapters = await axios.get("chapter.json");
      this.chapters = resChapters.data.chapter;
    },
    changeChildStatus: function() {
      var chapters = this.chapters;
      var lengthOfChapters = chapters.length;
      for (var h = 0; h < lengthOfChapters; h++) {
        var eachChapter = chapters[h].chapterContents;
        var eachChapterLength = eachChapter.length;
        var ifChaptersSelected = chapters[h].isSelected;
        if(ifChaptersSelected === true) {
          for(var i = 0; i < eachChapterLength; i++) {
            eachChapter[i].isSelected = true;
          }
        } else {
          for(var j = 0; j < eachChapterLength; j++) {
            eachChapter[j].isSelected = false;
          }
        }
      }
    }
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
      var chapters = this.chapters;
      var lengthOfChapters = chapters.length;
      for (var h = 0; h < lengthOfChapters; h++) {
        var eachChapter = chapters[h].chapterContents;
        var eachChapterLength = eachChapter.length;
        for(var i = 0; i < eachChapterLength; i++) {
          if(eachChapter[i].isSelected) {
            count++;
          }
        }
      }
      return count;
    },
    checkedSectionContentsNum: function() {
      var count = 0;
      var chapters = this.chapters;
      var lengthOfChapters = chapters.length;
      for (var h = 0; h < lengthOfChapters; h++) {
        var eachChapterContent = chapters[h].chapterContents;
        var eachChapterContentLength = eachChapterContent.length;
        for (var i = 0; i < eachChapterContentLength; i++) {
          var eachSectionContent = eachChapterContent[i].sectionContents;
          var ifEachSectionContentSelected = eachChapterContent[i].isSelected;
          var eachSectionContentLength = eachSectionContent.length;
          if (ifEachSectionContentSelected === true) {
            count += eachSectionContentLength;
          }
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