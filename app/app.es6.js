import book from "./modules/BookModule";

var asvBook = new book({language:"asv"});
var hunBook = new book({
  language:"hun",
  loadCallback: function() {
    console.log("mooo");
    console.log(this.getVersesInChapter(1,1));
  }
});

class Test {
  constructor() {
    console.log("TESTING!!");
  }
}
