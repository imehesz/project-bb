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

  getChapters: function(bookId) {
    var chapters = [];
    var verses = require(dataPath + this.getLanguage() + ".json");

    if (verses) {
      // TODO maybe eventually include OT NT etc
      verses.map(function(verse){
        if (verse.bookId == bookId && !chapters[verse.chapterId]) {
          chapters[verse.chapterId] = verse.chapterId;
        }
      });
    }

    // cleanup
    return chapters.filter(function(e) {
      return e;
    });
  },

  getVerses: function(bookId, chapterId) {
    var verses = [];
    var tmpVerses = require(dataPath + this.getLanguage() + ".json");
    if (tmpVerses) {
      tmpVerses.map(function(verse){
        if (verse.bookId == bookId && verse.chapterId == chapterId) {
          verses.push(verse);
        }
      });
    }

    return verses;
  }
}
