/**
 * BookController
 *
 * @description :: Server-side logic for managing books
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  readAll: function(req, res) {
    var retObj = {
      status: "fail"
    };
    var books = Book.getBooks();

    if (books) {
      retObj.books = books;
      retObj.status = "success";
    }
    return res.json(retObj);
  },

  readBook: function(req, res) {
    var bookId = req.param("bookId");
    var retObj = {
      status: "fail"
    };
    if (bookId) {
      retObj.chapters = Book.getChapters(bookId);
      retObj.status = "success";
    }

    return res.json(retObj);
  },

  readChapter: function(req, res) {
    var bookId = req.param("bookId");
    var chapterId = req.param("chapterId");
    var retObj = {
      status: "fail"
    };

    if (bookId && chapterId) {
      retObj.verses = Book.getVerses(bookId, chapterId);
      retObj.status = "success";
    }

    return res.json(retObj);
  }
};

