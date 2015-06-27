import book from "./modules/BookModule";
import util from "./modules/UtilModule";

class App {
  constructor(opts) {
    opts = opts || {};
    this.bookOneId = opts.bookOne;
    this.bookTwoId = opts.bookTwo;
  }

  ngController ($scope) {
    $scope.titleOne = "loading ...";
    $scope.selectedBookId = 0;
    $scope.selectedChapterId = 0;

    $scope.bookOne = new book({ 
                          language: app.bookOneId || "asv",
                          ngScope: $scope
                         });

    $scope.bookTwo = new book({ 
                          language: app.bookTwoId || "asv",
                          ngScope: $scope
                         });

    let getBookHeader = function(bookObj, bookId) {
      let results = bookObj.headers.filter((e) => {
        return e.bookId == bookId;
      });
      return results && results.length ? results[0] : null;
    };

    $scope.getBookOneHeader = function(id) {
      return getBookHeader($scope.bookOne, id);
    };

    $scope.getBookTwoHeader = function(id) {
      return getBookHeader($scope.bookTwo, id);
    }

    let resetVerses = function() {
      $scope.bookOne.setVerses([]);
      $scope.bookTwo.setVerses([]);
    }

    let resetChapters = function() {
      $scope.bookOne.setChapters([]);
      $scope.bookTwo.setChapters([]);
    }

    let resetChaptersAndVerses = function() {
      resetVerses();
      resetChapters();
    }

    $scope.setBookId = function(id) {
      $scope.titleOne = "Select ...";
      $scope.titleTwo = "";
      resetChaptersAndVerses();
      $scope.selectedBookId = id || 0;
      $scope.chapterIds = []; // resetting chapterIds
      if ($scope.selectedBookId) {
        $scope.titleOne = $scope.getBookOneHeader(id).headerLong;
        $scope.titleTwo = $scope.getBookTwoHeader(id).headerLong;
        $scope.bookOne.loadChapters(id);
      }
    }

    $scope.setChapterId = function(id) {
      resetVerses();
      $scope.selectedChapterId = id || 0;
      if ($scope.selectedChapterId) {
        // TODO make this better
        $scope.titleOne = $scope.getBookOneHeader($scope.selectedBookId).headerLong + " " + id;
        $scope.bookOneVerses = $scope.bookOne.loadVerses($scope.selectedBookId, id);
        $scope.bookTwoVerses = $scope.bookTwo.loadVerses($scope.selectedBookId, id);
      }
    }
  }
}

var app = new App({
  bookOne: "asv",
  bookTwo: "nhun"
});

var webApp = angular.module("webApp", []);
webApp.controller("AppController", app.ngController);

// jQuery magic
$(() => {
  var resizeVersesContainer = function() {
    if ($(window).width() <= 600) {
      $(".verses-wrapper .col").css({
        height: ($(window).height()/2)-50,
        overflow: "auto"
      });
    } else {
      $(".verses-wrapper .col").css({
        height: "100%",
        overflow: "inherit"
      });
    }
  };
  
  $(window).resize(util.TimeUtil().debouncer(resizeVersesContainer, 1000));
  resizeVersesContainer();
});
