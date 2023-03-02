import { databook, datamovie, datamusic, typebook, typemusic, typemovie} from '/data.js'

var app = new Vue({
  el: '#app',
  data: {
    showbook: databook,
    showmovie: datamovie,
    showmusic: datamusic,

    genrebook: typebook,
    genremusic: typemusic,
    genremovie: typemovie,

    selectbook: databook,
    searchbook: '',
    topicbook: 'All Books',
    listbook: [],

    selectmusic: datamusic,
    searchsong: '',
    topicsong: 'All Of Songs',
    listsongs: [],

    selectmovie: datamovie,
    searchmov: '',
    topicmov: 'All Movies',
    listmov: [],

  },

  methods: {
    selecttypebook(type) {
      this.topicbook = type;
      this.selectbook = this.showbook.filter((val) => {
        if (val.type === type) {
          return val;
        }
      })
    },

    addbooklist(item) {
      //
      var findmore = this.listbook.includes(item)

      if (!findmore) {
        this.listbook.push(item);
        console.log(this.listbook)
      }
    }
  },

  watch: {
    searchbook:function(newValue, oldValue) {
      console.log(newValue)
      this.selectbook = this.showbook.filter((val) => {

        if (val.bookname.toLowerCase().includes(newValue.toLowerCase())) {
          return val
        }


      })
    }
  }
})



