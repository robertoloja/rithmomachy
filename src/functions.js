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
 * increasing/decreasing by 'interval'.
 * @param {Number} start The first element of the returned array.
 * @param {Number} end The non-inclusive last element of the returned array.
 * @return {Array} An Array from 'start' to 'end'.
 */
function range(start, end, interval) {
  'use strict';
  const result = [];
  let diff = interval;

  if ((start > end && diff > 0) || (start < end && diff < 0)) {
    diff = 0;
  } else if (diff === undefined) {
    diff = (start > end) ? -1 : 1;
  }

  for (let i = start; i !== end && diff !== 0; i += diff) {
    result.push(i);
  }
  return result;
}

module.exports.setFilter = setFilter;
module.exports.range = range;
