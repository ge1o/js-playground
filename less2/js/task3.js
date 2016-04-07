// написать функцию reduce

/**
 * @callback reduceCallback
 * @param {*} accumulator
 * @param {*} arrayElement
 * @param {number} index
 * @param {Array} array
 * @returns {*} accumulator
 */
/**
 * @param {Array} arr
 * @param {reduceCallback} callback
 * @param {*} initialValue
 * @returns {*} accumulator
 */

function reduce(arr, callback, initialValue) {
    var accum = initialValue;

    arr.forEach(function (element) {
        accum = callback(accum, element);
    });

    console.log(accum);
    return accum;
}

reduce([1, 2, 3], function (accum, el, i, arr) {
    return accum += el;
}, 0); // 6

var arr = [
    { num: 1 },
    { num: 2 },
    { num: 3 }
];

var initialObject = { sum: 0 };

reduce(arr, function (accum, el, i, arr) {
    accum.sum += el.num;
    return accum;
}, initialObject); // { sum: 6 }