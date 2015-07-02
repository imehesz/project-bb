class BookModule {
  constructor (options) {
     this.headers = [];
     this.books = [];
     this.chapters = [];
     this.verses = [];

     this.language = options.language || "asv";
     // TODO not sure about this one
     this.ngScope = options.ngScope || null;
     this.headersCallback = options.headersCallback || null;
     this.chaptersCallback = options.chaptersCallback || null;
     this.versesCallback = options.versesCallback || null;
     
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
          if (this.headersCallback) this.headersCallback(data.books);
        }
      },
      error: (e) => {
        console.log("MEEEEEEEEEK", e);
      }
    });
  }

  loadChapters (bookId) {
    let t = this;
    $.ajax({
      type: "get",
      datatype: "json",
      //url: "/data/books/" + this.language + ".json",
      url: "http://198.50.140.69:1337/book/" + bookId + "/?lang=" + this.language,
      success: function(data) {
        if (data && data.chapters && data.chapters.length) {
          t.setChapters(data.chapters);
          if (t.chaptersCallback) t.chaptersCallback(data.chapters);
        }
      },
      error: (e) => {
        console.log("meeeeeeeeek", e);
      }
    });
  }

  loadVerses (bookId, chapterId) {
    let t = this;
    $.ajax({
      type: "get",
      datatype: "json",
      //url: "/data/books/" + this.language + ".json",
      url: "http://198.50.140.69:1337/book/" + bookId + "/" + chapterId + "?lang=" + this.language,
      success: function(data) {
        if (data && data.verses && data.verses.length) {
          t.setVerses(data.verses);
          if (t.versesCallback) t.versesCallback();
        }
      },
      error: (e) => {
        console.log("meeeeeeeeek", e);
      }
    });
  }
}

module.exports = BookModule;
