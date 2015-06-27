import DbModule from "./DbModule";

let BOOKS = ["asv", "hun", "esp"];

class BookModule {
  constructor (options) {
     this.headers = [];
     this.books = [];
     this.chapters = [];
     this.verses = [];

     this.dbPrefix = options.dbPrefix || "bb_";
     this.language = options.language || "asv";
     // TODO not sure about this one
     this.ngScope = options.ngScope || null;
     
     this.loadHeaders();
  }

  getHeaders () {
    return this.headers;
  }

  getChapters () {
    return this.chapters;
  }

  setChapters (chapters) {
    this.chapters = chapters;
  }

  getVerses () {
    return this.verses;
  }

  setVerses (verses) {
    this.verses = verses;
  }

  loadHeaders () {
    $.ajax({
      type: "GET",
      dataType: "json",
      //url: "/data/books/" + this.language + ".json",
      url: "http://198.50.140.69:1337/book/?lang=" + this.language,
      success: (data) => {
        if (data && data.books && data.books.length) {
          this.headers = data.books;
          if (this.ngScope) {
            this.ngScope.titleOne = "Select ...";
            this.ngScope.$apply();
          }
        }
      },
      error: (e) => {
        console.log("MEEEEEEEEEK", e);
      }
    });
  }

  loadChapters (bookId) {
    $.ajax({
      type: "get",
      datatype: "json",
      //url: "/data/books/" + this.language + ".json",
      url: "http://198.50.140.69:1337/book/" + bookId + "/?lang=" + this.language,
      success: (data) => {
        if (data && data.chapters && data.chapters.length) {
          this.setChapters(data.chapters);
          if (this.ngScope) this.ngScope.$apply();
        }
      },
      error: (e) => {
        console.log("meeeeeeeeek", e);
      }
    });
  }

  loadVerses (bookId, chapterId) {
    $.ajax({
      type: "get",
      datatype: "json",
      //url: "/data/books/" + this.language + ".json",
      url: "http://198.50.140.69:1337/book/" + bookId + "/" + chapterId + "?lang=" + this.language,
      success: (data) => {
        if (data && data.verses && data.verses.length) {
          this.setVerses(data.verses);
          if (this.ngScope) this.ngScope.$apply();
        }
      },
      error: (e) => {
        console.log("meeeeeeeeek", e);
      }
    });
  }
}

module.exports = BookModule;
