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
  // TODO: add the listeners to this to make it move
  app.directive('round', () => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        color: '=color',
      },
      template: '<div ng-transclude></div>',
      link: (scope, element) => {
        element.css({
          position: 'relative',
          display: 'block',
          background: 'darkgrey',
          width: '32px',
          height: '32px',
          borderRadius: '16px',
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        });
      },
    };
  });

  // TODO: solve the drop-shadow and text issue
  app.directive('triangle', () => {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        color: '=color',
      },
      template: '<div ng-transclude></div>',
      link: (scope, element) => {
        element.css({
          position: 'relative',
          display: 'block',
          width: '0',
          height: '0',
          borderStyle: 'solid',
          borderWidth: '0 17px 29.4px 17px',
          borderColor: 'transparent transparent darkgrey transparent',
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.8)',
        });
      },
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
