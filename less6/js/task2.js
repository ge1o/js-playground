
/* - - - StringTemplate - - - */

/**
 * Делает из строки шаблон, который может вытащить из подходящего текста под этот шаблон данные, которые были объявлены в шаблоне как переменные.
 * Переменные указываются внутри фигурных скобок "Some text and {variable} variable".
 * Переменная состоит только из ее имени.
 * @this {StringTemplate}
 * @param {string} string Строка, которая еще не является шаблоном, но имеет в себе указания переменных.
 * @param {object} [variables] используется только в сервисных случаях, когда дополнительно надо преобразовать весь шаблон.
 * @constructor
 */
function StringTemplate(string) {
    this._isTemplate    = false;
    this._source        = string;
    this._variables     = [];



    if (string && string.search(StringTemplate._pattern) >= 0) {
        var offset = 0;

        this._isTemplate = true;

        this._pattern = string.replace(StringTemplate._pattern, function(full, varName, index) {
            this._variables.push({
                name    : varName,
                index   : index - offset
            });
            offset += full.length;

            return '(.*?)';
        }.bind(this));
        this._pattern = new RegExp('^' + this._pattern + '$');

        this._builder = string.replace(StringTemplate._pattern, '');
    }
}

StringTemplate._pattern         = /{(\w+)}/g;// тут должно быть ваше регулярное выражение которое будет искать все переменные в строке. Пример переменной "Text and {variableName}"

/**
 * Проверяет совпадает ли строка с данным шаблоном
 * @this {StringTemplate}
 * @param {string} string строка для сравнения
 * @return {boolean}
 */
StringTemplate.prototype.match      = function(string) {
    if (this._isTemplate) {
        return this._pattern.test(string);
    } else {
        return this._source === string;
    }
};

/**
 * Получает из строки все переменные, основываясь на шаблоне
 * @this {StringTemplate}
 * @param {string} string строка из которой будут получаться значения для переменных
 * @param {object} [params] объект в который необходимо добавлять переменные из шаблона
 * @return {object}
 */
StringTemplate.prototype.getParams  = function(string, params) {
    if (!params) {
        params = {};
    }

    if (this._isTemplate) {
        var result = string.match(this._pattern);

        if (!result) {
            return params;
        }

        this._variables.forEach(function(variable, index) {
            //params[variable.name] = StringTemplate.decodeType(result[index + 1], variable.type);
            params[variable.name] = result[index + 1];
        }, this);
    }

    return params;
};

/**
 * Заполнение переменных конкретными значениями из переданного объекта
 * @this {StringTemplate}
 * @param {object} params
 * @return {string}
 */
StringTemplate.prototype.fill       = function(params) {
    if (this._isTemplate) {
        var string  = this._builder,
            offset  = 0;

        this._variables.forEach(function(variable) {
            var value = '' + params[variable.name];

            string = string.splice(variable.index + offset, value);

            offset += value.length;
        });

        return string;
    } else {
        return this._source;
    }
};

var stringTmp = 'Text and {variableName} and {variableName2}';

var testMe = new StringTemplate(stringTmp);

console.log(testMe);

