import book from "./modules/BookModule";

class App {
  constructor(opts) {
    opts = opts || {};
    this.bookOneId = opts.bookOne;
    this.bookTwoId = opts.bookTwo;
  }

  ngController ($scope) {
    $scope.moo = "baa";
    $scope.selectedBookId = 0;
    $scope.selectedChapterId = 0;

    new book({
      language: app.bookOneId || "asv", 
      loadCallback: function() {
        $scope.bookOne = this;
      }
    });

    new book({
      language: app.bookTwoId || "asv", 
      loadCallback: function() {
        $scope.bookTwo = this;
      }
    });

    $scope.setBookId = function(id) {
      $scope.selectedBookId = id || 0;
      if ($scope.selectedBookId) {
        $scope.chapterIds = $scope.bookOne.getChapterIdsInBook(id);
      }
    }

    $scope.setChapterId = function(id) {
      $scope.selectedChapterId = id || 0;
      if ($scope.selectedChapterId) {
        $scope.bookOneVerses = $scope.bookOne.getVersesInChapter($scope.selectedBookId, $scope.selectedChapterId);
        $scope.bookTwoVerses = $scope.bookTwo.getVersesInChapter($scope.selectedBookId, $scope.selectedChapterId);
      }
    }
  }
}

var app = new App({
  bookOne: "asv",
  bookTwo: "hun"
});

var webApp = angular.module("webApp", []);
webApp.controller("AppController", app.ngController);
