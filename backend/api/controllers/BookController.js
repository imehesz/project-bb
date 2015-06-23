/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  read: function(req, res) {
    return res.json({
      todo: "n/a"
    });
  },

  readAll: function(req, res) {
    return res.json({
      todo: "return all books"
    });
  },

  readBook: function(req, res) {
    var bookId = req.param("bookId");
    var retObj = {};
    if (bookId) {
      retObj.todo = "return all chapters for book: " + bookId;
    }

    return res.json(retObj);
  },

  readChapter: function(req, res) {
    var bookId = req.param("bookId");
    var chapterId = req.param("chapterId");
    var verseId = req.param("verseId");
    var retObj = {};

    if (bookId && chapterId && verseId) {
      retObj.todo = "return all chapters in book: " + bookId + " chapter " + chapterId + " and jump to verse " + verseId;
    } else if (bookId && chapterId) {
      retObj.todo = "return all chapters in book: " + bookId + " chapter " + chapterId;
    }

    return res.json(retObj);
  }
};

