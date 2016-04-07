/*
 Make two-dimensional array from one-dimensional array.
 Function takes two arguments: array and number. Number is count of elements in resulting subsets
 */
/**
 * Made two-dimensional array
 * @param array Array
 * @param size Number
 * @return Array
 */

function toMatrix(array, size) {
    var newArray = [];
    
    while (array.length) {
        newArray.push(array.splice(0, size));
    }
    
    console.log(newArray);
    return newArray;
}
//Examples:
toMatrix([1,2,3,4,5,6,7,8,9], 3); // [[1,2,3], [4,5,6], [7,8,9]]
toMatrix([1,2,3,4,5,6,7], 3); // [[1,2,3], [4,5,6], [7]]
toMatrix([1,2,3], 5); // [[1,2,3]]
toMatrix([], 3); // []