// Можно использовать рекурсию
// Решения вида JSON.parse(JSON.Stringify(data).replace(/dynamic/g, "static")) будут считаться неправильными
/**
 * @param {object|Array} obj
 * @param {string} valueForReplacing - value which will be replaced by newVal
 * @param {string} newVal
 * @returns {object|Array} obj
 */

var data = {
    foo: 'dynamic',
    bar: {
        baz: ['dynamic']
    },
    dynamic: true
};

function replacer(obj, propForReplacing, newVal) {
    // your code here
}

var result = replacer(data, 'dynamic', 'static');
// result
// {
//     foo: 'static',
//     bar: {
//         baz: ['static']
//     },
//     dynamic: true
// };

//Expect the values to have been changed
result.foo === 'static';
result.bar.baz[0] === 'static';
result === data; // true