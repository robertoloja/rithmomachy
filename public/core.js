/**
 * N.B.: This version of Angular does not support arrow functions.
 *       If you wrap everything in a closure, DON'T FORGET the () at the end.
 */
(function main() {
  const app = angular.module('mainScreen', []);

  app.controller('GameBoard', function gameBoard() {
    this.test = 'working';
  });
}());
