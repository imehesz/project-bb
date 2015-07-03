import book from "./modules/BookModule";
import util from "./modules/UtilModule";

class App {
  constructor(opts) {
    opts = opts || {};
    this.bookOneId = opts.bookOne;
    this.bookTwoId = opts.bookTwo;
  }

  ngController ($scope, $route, $routeParams, $location) {
    let MSG_LOADING = "Loading ...";
    let MSG_SELECT = "Read ...";

    let init = function() {
      $scope.changeBookOne();
      $scope.changeBookTwo();
      $scope.updateTitles();
    }

    $scope.config = {};

    $scope.languageOptions = typeof BOOKS != "undefined" ? BOOKS : [
      {
        lang: "asv",
        desc: "American Standard Version (ASV)",
      },
      {
        lang: "nhun",
        desc: "Hungarian (new)"
      },
    ];

    $scope.themeOptions = typeof THEMES != "undefined" ? THEMES : [
      {
        id: "light",
        label: "Light"
      },
      {
        id: "dark",
        label: "Dark"
      }
    ];

    $scope.config.theme = $scope.themeOptions[0];

    $scope.updateTitles = function() {
      $scope.titleOne = MSG_LOADING;
      $scope.titleTwo = "";

      if ($scope.bookOne) {
        $scope.titleOne = MSG_SELECT;

        if ($scope.selectedBookId) {
          let headerOne = $scope.getBookOneHeader($scope.selectedBookId);
          let headerTwo = $scope.getBookTwoHeader($scope.selectedBookId);
          $scope.titleOne = headerOne ? headerOne.headerLong : $scope.titleOne;
          $scope.titleTwo = headerTwo ? headerTwo.headerLong : $scope.titleTwo;
        }
      };

      if ($scope.selectedChapterId) {
        $scope.titleOne += " " + $scope.selectedBookId;
      }
    };

    $scope.showSecondBook = true;

    $scope.selectedBookId = 0;
    $scope.selectedChapterId = 0;

    let masterCallback = function(data) {
      $scope.updateTitles();
      $scope.$apply();
    }

    $scope.changeBookOne = function() {
      $scope.bookOne = new book({ 
                            language: $scope.selectedBookOne.lang || app.bookOneId || "asv",
                            headersCallback: masterCallback,
                            chaptersCallback: masterCallback,
                            versesCallback: masterCallback
                           });
      if ($scope.selectedBookId) $scope.setBookId($scope.selectedBookId, true);
      if ($scope.selectedChapterId) $scope.setChapterId($scope.selectedChapterId);
    }

    $scope.changeBookTwo = function() {
      $scope.bookTwo = new book({ 
                            language: $scope.selectedBookTwo.lang || app.bookTwoId || "asv",
                            headersCallback: masterCallback,
                            chaptersCallback: masterCallback,
                            versesCallback: masterCallback
                           });
      if ($scope.selectedBookId) $scope.setBookId($scope.selectedBookId, true);
      if ($scope.selectedChapterId) $scope.setChapterId($scope.selectedChapterId);
    }

    $scope.selectedBookOne = $scope.languageOptions[0];
    $scope.selectedBookTwo = $scope.languageOptions[1];

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

    $scope.setBookId = function(id, keepTitles) {
      resetChaptersAndVerses();
      $scope.selectedBookId = id || 0;
      $scope.chapterIds = []; // resetting chapterIds
      if ($scope.selectedBookId) {
        $scope.bookOne.loadChapters(id);
      }
      $scope.updateTitles();
    }

    $scope.setChapterId = function(id) {
      resetVerses();
      $scope.selectedChapterId = id || 0;
      if ($scope.selectedChapterId) {
        $scope.bookOneVerses = $scope.bookOne.loadVerses($scope.selectedBookId, id);
        $scope.bookTwoVerses = $scope.bookTwo.loadVerses($scope.selectedBookId, id);
      }
    }

    init();
  }
}

var app = new App({
  bookOne: "asv",
  bookTwo: "nhun"
});

var webApp = angular.module("webApp", ["ngRoute"]);
webApp.controller("AppController", app.ngController);

// jQuery magic
$(() => {
  let resizeVersesContainer = function() {
    let isSecondBookVisible = $(".second-book").is(":visible");

    if ($(window).width() <= 600 && isSecondBookVisible) {
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
