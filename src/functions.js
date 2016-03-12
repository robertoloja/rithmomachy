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

module.exports.setFilter = setFilter;
