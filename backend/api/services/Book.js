var dataPath = "../../data/books/";
module.exports = {
  getLanguage: function() {
    return this.language;
  },
  setLanguage: function(lang) {
    this.language = lang;
  },

  getBooks: function() {
    var chapters = require( dataPath + this.getLanguage() + "-headers.json");
    return chapters;
  },

  getChaptersByBookId: function(bookId) {
    var chapters = [];
    var verses = require(dataPath + this.getLanguage() + ".json");

    if (verses) {
      console.log("got verses", verses[0].bookId == bookId);
      verses.map(function(verse){
        if (verse.bookId == bookId) {
          chapters[verse.chapterId] = verse.chapterId;
        }
      });
    }

    return chapters.filter(function(e) {
      return e;
    });
  }
}
