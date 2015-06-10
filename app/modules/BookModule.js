import DbModule from "./DbModule";

let BOOKS = ["asv", "hun", "esp"];

class BookModule {
  constructor (options) {
     this.dbPrefix = options.dbPrefix || "bb_";
     this.language = options.language || "asv";
     this.loadCallback = options.loadCallback;

     this.dbi = DbModule.instance;
     this.loadBooks();
  }

  loadBooks() {
    let t = this;
    let dbStr = this.dbPrefix + this.language;
    let cbHandler = function() {
      if (t.loadCallback && typeof t.loadCallback == "function") {
        // we're calling the callback with the BookModule JS scope
        t.loadCallback.apply(t);
      }
    }
    this.dbi[dbStr] = this.dbi.taffy();

    if(!this.dbi[dbStr].store(dbStr) || !this.dbi[dbStr]().first()) {
      // we only fire the ajax call if it's a possibility
      if (BOOKS.indexOf(this.language) > -1) {
        $.ajax({
          type: "GET",
          dataType: "json",
          url: "/data/books/" + this.language + ".json",
          success: (data) => {
            if (data && data.length) {
              data.forEach((row) => {
                this.dbi[dbStr].insert(row);
              });
            }
            cbHandler();
          },
          error: (e) => {
            console.log("MEEEEEEEEEK", e);
          }
        });
      }
    } else {
      // we should have everything, let's just call the callback
      cbHandler();
    }
  }

  db(opts) {
    return this.dbi[this.dbPrefix+this.language](opts);
  }

  getBookIds() {
    return this.db().order("bookId").distinct("bookId");
  }

  getChapterIdsInBook(bookId) {
    return this.db({bookId:bookId}).order("chapterId").distinct("chapterId");
  }

  getVerseIdsInChapter(bookId, chapterId) {
    return this.db({bookId:bookId, chapterId: chapterId}).order("verseId").distinct("verseId");
  }

  getVersesInChapter(bookId, chapterId) {
    return this.db({bookId:bookId, chapterId: chapterId}).order("verseId").get();
  }
}

module.exports = BookModule;
