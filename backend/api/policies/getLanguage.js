module.exports = function(req, res, next) {
  var languages = ["asv", "hun", "nhun", "greek", "kjv"];
  if (req && !req.session.book) {
    req.session.book = {};
  }
  req.session.book.language = languages.indexOf(req.param("lang")) > -1 ? req.param("lang") : "asv";
  Book.setLanguage(req.session.book.language);
  next();
}
