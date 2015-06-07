import book from "./modules/BookModule";

var asvBook = new book({language:"asv"});
var hunBook = new book({
  language:"hun",
  loadCallback: function() {
    console.log("mooo");
    console.log(this.db().first());
  }
});

class Test {
  constructor() {
    console.log("TESTING!!");
  }
}
