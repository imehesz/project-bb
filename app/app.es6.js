import book from "./modules/BookModule";

class App {
  constructor(opts) {
    opts = opts || {};
    this.bookOneId = opts.bookOne;
    this.bookTwoId = opts.bookTwo;
  }

  ngController ($scope) {
    $scope.moo = "loading ...";
    $scope.selectedBookId = 0;
    $scope.selectedChapterId = 0;

    new book({
      language: app.bookOneId || "asv", 
      loadCallback: function() {
        $scope.bookOne = this;
        if ($scope.bookOne && $scope.bookTwo) $scope.moo = "baa";
        if (!$scope.$$phase) $scope.$apply();
      }
    });

    new book({
      language: app.bookTwoId || "asv", 
      loadCallback: function() {
        $scope.bookTwo = this;
        if ($scope.bookOne && $scope.bookTwo) $scope.moo = "baa";
        if (!$scope.$$phase) $scope.$apply();
      }
    });

    $scope.getBookHeader = function(bookObj, bookId) {
      let results = bookObj.getHeaderById(bookId);
      return results && results.length ? results[0] : null;
    };

    $scope.getBookOneHeader = function(id) {
      return $scope.getBookHeader($scope.bookOne, id);
    };

    $scope.getBookTwoHeader = function(id) {
      return $scope.getBookHeader($scope.bookTwo, id);
    }

    $scope.resetVerses = function() {
      $scope.bookOneVerses = [];
      $scope.bookTwoVerses = [];
    }

    $scope.setBookId = function(id) {
      $scope.resetVerses();
      $scope.selectedBookId = id || 0;
      $scope.chapterIds = []; // resetting chapterIds
      if ($scope.selectedBookId) {
        $scope.moo = $scope.getBookOneHeader(id).headerLong;
        $scope.chapterIds = $scope.bookOne.getChapterIdsInBook(id);
      }
    }

    $scope.setChapterId = function(id) {
      $scope.selectedChapterId = id || 0;
      if ($scope.selectedChapterId) {
        // TODO make this better
        $scope.moo = $scope.getBookOneHeader($scope.selectedBookId).headerLong + " " + id;
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
