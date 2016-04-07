/*
 Create object from arrays of keys and values
 Function takes two arguments of array type.
 First argument - array of keys.
 Second argument - array of values.
 If number of values more than number of keys that reduce number of values to the number of keys
 If keys more then values, set undefined value for this key
 */
/**
 * Created object from arrays of keys and values
 * @param keys Array
 * @param values Array
 * @return Object
 */
function createObject  (keys, values) {
    var resultObject = {};
    for (var i = 0; i < keys.length; i++) {
        resultObject[keys[i]] = values[i];
    }
    console.log(resultObject);
    return resultObject;
}
//Examples:
createObject(['name', 'age'], ['Vasiliy', 45]); // {name: 'Vasiliy', age: '45'}
createObject(['name', 'age'], ['Vasiliy']); // {name: 'Vasiliy', age: undefined}
createObject(['name'], ['Vasiliy', 45]); // {name: 'Vasiliy'}
createObject([], []); // {}
createObject([], ['Vasiliy']); // {}
