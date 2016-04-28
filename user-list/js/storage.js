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

        filter: function () {
            console.log('set to tempStorage');
        }


    };

    return Storage;

} (window, _));
