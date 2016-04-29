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
        this.cancelled = [];
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
                var isValidId = el.id === parseInt(id);
                if (isValidId) {
                    result = el;
                }

                return isValidId;
            });

            return result;
        },

        getByKey: function(data) {
            var key = Object.keys(data)[0];
            var result = [];

            this.tempStorage.forEach(function (el) {
                var isValidId = el[key] === data[key];

                if (isValidId) {
                    result.push(el);
                }
            });

            return result;
        },

        remove: function (key) {
            if (this.cancelled.length == 0) {
                this.cancelled = this.tempStorage;
            }

            this.tempStorage = _.without(this.tempStorage, _.findWhere(this.tempStorage, {id: key.id}));
        },

        save: function () {
            localStorage.setItem('persons', toSTR(this.tempStorage));
        },

        load: function () {
            var data = localStorage.getItem('persons');

            if (data) {
                this.tempStorage = toJSON(data);
            } else {
                this.tempStorage = [];
            }
        },

        clear: function () {
            this.tempStorage = [];
        },

        cancel: function() {
            this.tempStorage = this.cancelled;
            this.cancelled = [];
        },

        filter: function (data) {
            console.log('set to tempStorage');
            this.tempStorage = [];

            for (var i = 0; i < data.length; i++) {
                this.set(data[i]);
            }
        }
    };

    return Storage;

} (window, _));
