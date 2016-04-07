// функция принимает 3 параметра, объект, строку (путь к свойству) и значение
// в строке содержится "путь" к свойству объекта
// функция устанавливает переданное значение в указанное свойство у переданного в нее объекта
/**
 * @param {object} obj
 * @param {string} props
 * @param {*} value
 */

var setComputed = function(obj, props, value) {
    props = props.split('.');

    var lastProp = props.pop();

    for(var i = 0; i < props.length; i++) {
        obj = obj[props[i]] = obj[props[i]] || {};
    }

    if(lastProp) {
        obj[lastProp] = value;
    }

    return obj;
};

var obj1 = {};
var someObj = {};

//setComputed(obj1, 'test.test2.test3.test4.test5', 4); // { test: 4 }
//console.log(obj1);

setComputed(someObj, 'test.hello.world', 4);
console.log(someObj); // 4

//console.log(someObj.test.hello.world); // 4

//result
//{
//    test: {
//        hello: {
//            world: 4
//        }
//    }
//}