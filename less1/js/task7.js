/*
 Check whether the array is a subset of another array.
 Function takes two arguments of array type. This function returns true if all elements of second array are
 subset of another array. Array can contain any values.
 */
/**
 * Check whether the array is a subset of another array
 * @param first Array
 * @param second Array
 * @return Boolean
 */
function contains (first, second) {
    var check;

    if(second.length === 0){
        check = true;
    }
    for (var i = 0; i < second.length; i++) {
        if (first.indexOf(second[i]) == -1) {
            check = false;
            break;
            return false;
        } else {
            check = true;
        }
    }
    console.log(check);
}
//Examples:
contains([1,2,3,4,5,6,7,8,9], [1,2]); // true
contains([1,2,3,4,5,6,7,8,9], [1,88]); // false
contains([1,2,3,4,5,6,7,8,9], []); // true
contains([1,2,3,4,5,6,7,8,9], [0]); // false
contains([], [0]); // false
contains([], []); // true
contains([1], [1]); // true

contains([1], [1,2]); // false
contains([1,2], [1]); // true