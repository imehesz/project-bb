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
    var retObj = {
      status: "fail"
    };
    Book.setLanguage(req.session.book.language);
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
    Book.setLanguage(req.session.book.language);
    if (bookId) {
      retObj.chapters = Book.getChaptersByBookId(bookId);
      retObj.status = "success";
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

