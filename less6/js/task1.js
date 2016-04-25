
/**
 * Имплементация для удобной работы с URI елементами, каждым по отдельности
 * @this {Url}
 * @param {string} [urlString] Исходная строка, которая будет разбираться на элементы
 * @constructor
 */
function Url(urlString) {
    this._source    = undefined;
    this._protocol  = undefined;
    this._domain    = undefined;
    this._path      = undefined;
    this._search    = undefined;
    this._hash      = undefined;

    this.source(urlString);
}

Url._pattern        = /(?:(\w+):)?(?:\/\/)?(\w+\.\w+)?(?:(\/(?:\w+\/)+\w+\.\w+)?(?:\w+\.\w+)?)?(?:\?)?(\w+(?:=)?(?:\w+)?)?((?:#)(?:\w+))?/;//TODO тут необходимо вам реализовать само регулярное выражение, которое будет разбирать урл

// (?:(\w+):)?(?:\/\/)?([\w-]+\.\w+)?(?:(\/(?:\w+\/)+\w+\.\w+)?(?:\w+\.\w+)?)?(?:\?([^#]+))?(?:#(.*))? //TODO: wout domain, wout extension

// /^(http|https)?\:?(?:\/\/([a-zA-Z0-9]{1,}[a-zA-Z0-9]\.[a-zA-Z]{2,}))?([^?#]*)?(?:\?([^#]*))?(?:#(.*))?/ => TODO: test me

/*
 "http://domain.com/path/index.html?key=value#hash".match(Url._pattern);
 [
 "http://domain.com/path/index.html?key=value#hash",
 "http",
 "domain.com",
 "/path/index.html",
 "key=value",
 "hash"
 ]

 "//domain.com/path/index.html".match(Url._pattern);
 [
 "//domain.com/path/index.html",
 undefined,
 "domain.com",
 "/path/index.html",
 undefined,
 undefined
 ]

 "?key=value#hash".match(Url._pattern);
 [
 "?key=value#hash",
 undefined,
 undefined,
 undefined,
 "key=value",
 "hash"
 ]
 */

Url._elementOrder   = ['_source', '_protocol', '_domain', '_path', '_search', '_hash'];

/**
 * Собирает search (query) строку из пары ключ = значение в единое целое.
 * Например:
 * Url.encodeSearch({
 *     key1     : 'value1',
 *     key2     : 'value2'
 * }); // "key1=value1&key2=value2"
 *
 * @this {Url}
 * @param {object} searchParams
 * @return {string}
 */
Url.encodeSearch    = function(searchParams) {
    var outSearch   = [];

    for (var key in searchParams) {
        if (searchParams.hasOwnProperty(key)) {
            outSearch.push(key + '=' + searchParams[key]);
        }
    }

    return outSearch.join('&');
};

/**
 * Разбирае search (query) строку на пары ключ = значение.
 * Например:
 * Url.decodeSearch("key1=value1&key2=value2"); // {
 *     key1     : 'value1',
 *     key2     : 'value2'
 * }
 *
 * @this {Url}
 * @param {string} searchString
 * @return {object}
 */
Url.decodeSearch    = function(searchString) {
    var result      = {},
        elements    = searchString.split('&');

    if (elements.length) {
        elements.forEach(function(element) {
            var keyValue = element.split('=');

            result[keyValue[0]] = keyValue[1];
        })
    }

    return result;
};

/**
 * Устанавливает или возвращает базовый URI адрес, разбирая его на составляющие. Но не собирает его из последних.
 * Для этого есть метод Url#toString.
 * @this {Url}
 * @param {string} source
 * @return {string}
 */
Url.prototype.source    = function(source) {
    if (typeof source === 'string') {
        var result = source.match(Url._pattern);

        if (!result) {
            return this._source;
        }

        Url._elementOrder.forEach(function(element, index) {
            this[element] = result[index] ? result[index] : undefined;
        }, this);

        if (typeof this._search === 'string') {
            this._search = Url.decodeSearch(this._search);
        } else {
            this._search = {};
        }
    }

    return this._source;
};

/**
 * Устанавливает или возвращает текущий протокол.
 * @this {Url}
 * @param {string} [protocol] если не указывать, то вернется текущее значение
 * @return {Url|string} если не указан аргумент protocol то вернется текущее, если указать, то вернется ссылка на this.
 */
Url.prototype.protocol  = function(protocol) {
    if (!protocol) {
        return this._protocol;
    } else {
        this._protocol = protocol;
    }

    return this;
};

/**
 * Устанавливает или возвращает текущий домен адреса.
 * @this {Url}
 * @param {string} [domain] если не указывать, то вернется текущее значение
 * @returns {Url|string} если не указан аргумент domain то вернется текущее, если указать, то вернется ссылка на this.
 */
Url.prototype.domain    = function(domain) {
    if (!domain) {
        return this._domain;
    } else {
        this._domain = domain;
    }

    return this;
};

/**
 * Устанавливает или возвращает текущий путь к файлу
 * @this {Url}
 * @param {string} [path] если не указывать, то вернется текущее значение
 * @returns {Url|string} если не указан аргумент path то вернется текущее, если указать, то вернется ссылка на this.
 */
Url.prototype.path      = function(path) {
    if (!path) {
        return this._path;
    } else {
        this._path = path;
    }

    return this;
};

/**
 * Устанавливает или возвращает текущие элементы из строки search (query). Если отсутствуют оба аргурмента, то вернется весь объект search (query)
 * @this {Url}
 * @param {string|object} [key] если указать только этот аргумент и это будет строка, то вернется соответствующее значение этому ключу, в противном случае вернется undefined.
 * Если этот аргумент объект и второй не указан, то этот объект заменит текущий search (query) параметр, если вторым указать true, то он не заменит, а дополнит текущий параметр.
 * @param {string|boolean} [value] если первый параметр строка, то этот аргумент установится значением соотвестсвующим ключу которым является первый аргрумент.
 * @returns {Url|string}
 */
Url.prototype.search    = function(key, value) {
    if (key && typeof key === 'string' && value) {
        this._search[key] = value;

        return this;
    } else if (key && typeof key === 'string' && !value) {
        return this._search[key];
    } else if (key && typeof key === 'object') {
        this._search = key;

        return this;
    } else {
        return this._search;
    }
};

/**
 * Устанавливает или возвращает текущий хэш.
 * @this {Url}
 * @param {string} [hash] если не указывать, то вернется текущее значение
 * @returns {Url|string} если не указан аргумент hash то вернется текущее, если указать, то вернется ссылка на this.
 */
Url.prototype.hash      = function(hash) {
    if (!hash) {
        return this._hash;
    } else {
        this._hash = hash;
    }

    return this;
};

/**
 * Собирает все параметры в единое целое
 * @return {string} готовая URI строка, которую можно использовать по необходимости
 */
Url.prototype.toString  = function() {
    var outUrl = [];

    if (this._domain) {
        if (this._protocol) {
            outUrl.push(this._protocol);
            outUrl.push('://');
        }

        outUrl.push(this._domain);
    }

    if (this._path) {
        outUrl.push(this._path);
    }

    if (this._search) {
        var search = Url.encodeSearch(this._search);

        if (search) {
            outUrl.push('?');
            outUrl.push(search);
        }
    }

    if (this._hash) {
        outUrl.push('#');
        outUrl.push(this._hash);
    }

    return outUrl.join('');
};

var res1 = "http://domain.com/path/index.html?key=value#hash".match(Url._pattern);
var res2 = "//domain.com/path/index.html".match(Url._pattern);
var res3 = "?key=value#hash".match(Url._pattern);
var res4 = "//domain.com/path/?key=value#hash".match(Url._pattern);
var res5 = "http://domain.com/path/path2/index.html?key=value#hash".match(Url._pattern);
console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);
console.log(res5);