/**
 * Just a quick parser for the books
 * Produces a JSON file and expecting a CSV file for input in the following format:
 * bookId, chapterId, verseID, "text"
 * 1,1,1,"some text"
 * 
 * REQS:
 * fast-csv node module see https://www.npmjs.com/package/fast-csv
 *
 * USAGE:
 * node parser.js file.csv > file.json
 */
var fs = require("fs");
var stream = fs.createReadStream(process.argv[2] || "my.csv");
var csv = require("fast-csv");

console.log("[");
var csvStream = csv()
  .on("data", function(data){
    var bookId = parseInt(data[0], 10);
    var chapterId = parseInt(data[1],10);
    var verseId = parseInt(data[2], 10);

    var retObj = {
      bookId: bookId,
      chapterId: chapterId,
      verseId: verseId,
      text: data[3],
      type: bookId < 40 ? "OT" : "NT"
    };
    console.log(JSON.stringify(retObj), ",");
  })
  .on("end", function(){
    console.log("]");
  });

stream.pipe(csvStream);
