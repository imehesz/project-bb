import DbModule from "./modules/DbModule";

var db = DbModule.instance;

db["bb_asv"] = db.taffy();
if(!db["bb_asv"].store("bb_asv") || !db["bb_asv"]().first()) {
  db["bb_asv"].insert({bookId:"1", chapterId:"1", verseId:"1"});
} else {
  console.log("got stuff, not doing anything ,,,");
}

console.log("db", db);

class Test {
  constructor() {
    console.log("TESTING!!");
  }
}
