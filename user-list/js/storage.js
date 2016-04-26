app.Storage = (function (window, _) {

    function toSTR(data) {
        return JSON.stringify(data);
    }

    function toJSON(data) {
        return JSON.parse(data);
    }

    function Storage(type) {
        this.storage = window.localStorage;
        this.tempStorage = [];
        return this;
    }

    Storage.prototype = {

        set: function (value) {
            this.tempStorage.push(value);
        },

        getData: function () {
            return this.tempStorage;
        },

        getById: function (id) {
            var result;

            this.tempStorage.some(function (el) {
                var isValidId = el.id === id;
                if (isValidId) {
                    result = el;
                }

                return isValidId;
            });

            return result;
        },

        remove: function (key) {},

        save: function () {
            localStorage.setItem('persons', toSTR(this.tempStorage));
        },

        load: function () {
            var data = localStorage.getItem('persons');

            if (data) {
                this.tempStorage = toJSON(data);
            } else {
                this.tempStorage = {};
            }
        },

        clear: function (elems) {
            //console.log(this.tempStorage);
            ////console.log(elems);
            //elems.forEach(function(item, index) {
            //    console.log(this.getById(item.id));
            //}.bind(this));

            this.tempStorage = [];

            //elems.forEach(function(item, index) {
            //    if(JSON.stringify(this.tempStorage[index]) === JSON.stringify(item)) {
            //        console.log('==');
            //        this.tempStorage[index] = {};
            //    }
            //    console.log(this.tempStorage);
            //    //console.log(item);
            //}.bind(this));

        }

    };

    return Storage;

} (window, _));