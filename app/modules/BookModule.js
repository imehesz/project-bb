import DbModule from "./DbModule";

let MOCK = {
  "asv": [
    {bookId:1, chapterId: 1, verseId: 1, text: "this is asv 111"},
    {bookId:1, chapterId: 1, verseId: 2, text: "this is asv 112"}
  ],

  "hun": [
    {bookId:1, chapterId: 1, verseId: 1, text: "ez magyar 111"},
    {bookId:1, chapterId: 1, verseId: 2, text: "ez magyar 112"}
  ],

  "esp": [
    {bookId:1, chapterId: 1, verseId: 1, text: "le espanol 111"},
    {bookId:1, chapterId: 1, verseId: 2, text: "le espanol 112"}
  ]
};

class BookModule {
  constructor (options) {
     this.dbPrefix = options.dbPrefix || "bb_";
     this.language = options.language || "asv";
     this.loadCallback = options.loadCallback;

     this.dbi = DbModule.instance;
     this.loadBook();
  }

  loadBook() {
    let dbStr = this.dbPrefix + this.language;
    let cbHandler = () => {
      if (this.loadCallback && typeof this.loadCallback == "function") {
        this.loadCallback();
      }
    }
    this.dbi[dbStr] = this.dbi.taffy();

    if(!this.dbi[dbStr].store(dbStr) || !this.dbi[dbStr]().first()) {
      //this.dbi[dbStr].insert({language: this.language, bookId:"1", chapterId:"1", verseId:"1"});
      if (MOCK[this.language] && MOCK[this.language].length) {
        MOCK[this.language].forEach((row) => {
          this.dbi[dbStr].insert(row);
        });
      }
      cbHandler();
    } else {
      // we should have everything, let's just call the callback
      cbHandler();
    }
  }

  db(opts) {
    return this.dbi[this.dbPrefix+this.language](opts);
  }
}

module.exports = BookModule;
