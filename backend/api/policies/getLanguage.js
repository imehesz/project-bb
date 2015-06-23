module.exports = function(req, res, next) {
  var languages = ["asv", "hun"];
  if (req && !req.session.book) {
    req.session.book = {};
  }
  req.session.book.language = languages.indexOf(req.param("lang")) > -1 ? req.param("lang") : "asv";
  next();
}
