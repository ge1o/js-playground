// функция принимает 2 параметра, объект и строку
// в строке содержится "путь" к свойству объекта
// возвращает значения указанного свойства или undefined (если такого нету)
/**
 * @param {object} obj
 * @param {string} props
 */
function getComputed(obj, props) {
    var allProps = props.split('.');

}

function isUndefinedKey(object, key) {
    var keyChain = Array.isArray(key) ? key : key.split('.'),
        objectHasKey = keyChain[0] in object,
        keyHasValue = typeof object[keyChain[0]] !== 'undefined';

    if (objectHasKey && keyHasValue) {
        if (keyChain.length > 1) {
            return isUndefinedKey(object[keyChain[0]], keyChain.slice(1));
        }

        return false;
    }
    else {
        console.log(true);
        return true;
    }
}
var undefined,
    ponies = {
        pretty: false,
        scummy: true,
        favorite: {
            food: 'money'
        },
        goodFor: undefined
    };
isUndefinedKey(ponies, 'pretty'); // false
isUndefinedKey(ponies, 'goodFor'); // true
isUndefinedKey(ponies, 'anyValueWhatsoever'); // true
isUndefinedKey(ponies, 'favorite.food'); // false

//var obj = {
//    test: {
//        someProp: {
//            test: true
//        }
//    }
//};
var obj = {
    test: {
        someProp: {
            innertest: true
        }
    }
};

//getComputed({}, 'test.someProp.test'); // undefined
//getComputed(obj, 'test.someProp.test'); // true
//getComputed(obj, 'test.someProp') === obj.test.someProp; // true

isUndefinedKey(obj, 'test.someProp.innertest'); // true
