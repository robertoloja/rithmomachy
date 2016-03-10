/**
 * Implements filter for sets. That is, this loops over every element in a set,
 * applies the callback function to each, and removes from the set all elements
 * that return false.
 * @param {Set} set A Set object.
 * @param {function} callback When this function returns false for a member of 
 * 'set', that member is removed from 'set'.
 */
function setFilter(set, callback) {
	set.forEach(function (x, y, set) {
		if (!callback(x)){
			set.delete(x);
		}
	});
}

module.exports.setFilter = setFilter; 
