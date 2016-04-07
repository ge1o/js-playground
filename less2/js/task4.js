// написать функцию filter
function filter(arr, callback) {
    var filtered = [];

    arr.forEach(function (element) {
            if (callback(element)) {
                filtered.push(element);
            }
    });

    console.log(filtered);
    return filtered;

}

var arr = [
    { num: 1 },
    { num: 2 },
    { num: 3 }
];

filter([1, 2, 3], function (el, i, arr) {
    return el > 1;

}); // [2, 3]

filter(arr, function (el, i, arr) {
    return el.num > 2;
}); // [ { num: 3 } ]
