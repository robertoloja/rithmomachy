/**
 * N.B.: This version of Angular does not support arrow functions.
 *       If you wrap everything in a closure, DON'T FORGET the () at the end.
 */
(function main() {
  const app = angular.module('mainScreen', []);
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  app.controller('test', function test() {
    this.test = 'angular is working';
    this.board = board;
  });

  app.directive('board', () => {
    return {
      restrict: 'E',
      templateUrl: '/public/gameBoard.html',
    };
  });


  /**
   * Piece directives.
   */
  app.directive('round', () => {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div ng-transclude></div>',
    };
  });

  app.directive('triangle', () => {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div ng-transclude></div>',
    };
  });

  app.directive('square', () => {
    return {
      restrict: 'E',
      transclude: true,
      template: '<div ng-transclude></div>',
    };
  });
}());
