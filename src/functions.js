/**
 * Implements filter for sets. That is, this loops over every element in a set,
 * applies the callback function to each, and removes from the set all elements
 * that return false.
 * @param {Set} set A Set object.
 * @param {function} callback When this function returns false for a member of
 * 'set', that member is removed from 'set'.
 */
function setFilter(set, callback) {
  set.forEach((val1, val2, collection) => {
    if (!callback(val1)) {
      collection.delete(val1);
    }
  });
}

/**
 * Creates an array, ranging from 'start' to one 'interval' before 'end', and
 * increasing/decreasing by 'interval'. If only one argument is provided, the
 * returned array starts from 0 and ends at the given argument.
 * @param {Number} start The first element of the returned array.
 * @param {Number} end The non-inclusive last element of the returned array.
 * @param {Number} interval Defaults to 1, or -1 if 'start' > 'end'.
 * @return {Array} An Array from 'start' to 'end'.
 */
function range(start, end, interval) {
  'use strict';
  const result = [];
  let diff = interval;
  let first = start;
  let last = end;

  if (end === undefined) {
    last = start;
    first = 0;
  }

  if ((first > last && diff > 0) || (first < last && diff < 0)) {
    diff = 0;
  } else if (diff === undefined) {
    diff = (first > last) ? -1 : 1;
  }

  for (let i = first; diff !== 0 && (first > last ? i > last : i < last);
        i += diff) {
    result.push(i);
  }
  return result;
}

module.exports.setFilter = setFilter;
module.exports.range = range;
