/*
 Make two-dimensional array from one-dimensional array.
 The first dimension of array can contain either array or object or primitive
 */
/**
 * Flattens array a single level deep and
 * returns the new flattened array.
 * @param array
 * @return Array
 */
function flatten (array) {
    var newArray = [].concat.apply([], array);

    console.log(newArray);
    return newArray;
}
//Examples:
flatten([[1], 1, 1]); // [1, 1, 1]
flatten([[[1]], 1]); // [[1], 1]
flatten([]); // []
flatten([{}]); // [{}] - ?
flatten([[{}], []]); // [{}, []]

flatten([[1, 2], 3, 4]); // [1, 2, 3, 4]
flatten([[1], 2, 3]); // [1, 2, 3]
flatten([1, [2], 3]); // [1, 2, 3]