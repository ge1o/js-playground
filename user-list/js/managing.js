app.Manager = (function (_, document, app) {

    function Manager(el, options) {
        options = options || {};

        this.storage = new app.Storage(options.type);
        this.storage.load();
        this.el = el;
        return this;
    }

    Manager.prototype = {

        initialize: function () {
            this.initTemplate();
            this.findNodes();
            this.render();
            this.addHandlers();
        },

        findNodes: function () {
            this.nodes = {
                table: document.querySelector('.list'),
                lastName: document.getElementById('last-name'),
                firstName: document.getElementById('first-name'),
                age: document.getElementById('age'),
                addButton: document.getElementById('add-button'),
                saveButton: document.getElementById('save-button'),
                clearButton: document.getElementById('clear-button'),
                removeUserButtons: document.getElementsByClassName('remove-user-button'),
                removeUserButtonModal: document.getElementById('remove-user-button-modal'),
                cancelButton: document.getElementById('cancel-button')
                //removeUserModal: document.getElementById('delete-user')
            };
        },

        addHandlers: function () {
            this.nodes.addButton.addEventListener('click', function (e) {
                e.preventDefault();
                this.addPerson();
            }.bind(this));


            this.nodes.table.onclick = function(event) {
                var target = event.target;

                var buttonId = target.dataset.id || target.parentNode.dataset.id;

                if (target.classList.contains('remove-user-button') || target.parentNode.classList.contains('remove-user-button')) {
                    console.log(buttonId);
                    this.passDataToModal(buttonId);
                } else {
                    return;
                }
            }.bind(this);

            this.nodes.saveButton.addEventListener('click', this.saveItems.bind(this));
            this.nodes.clearButton.addEventListener('click', this.clearItems.bind(this));
            this.nodes.removeUserButtonModal.addEventListener('click', this.removeItem.bind(this));
            this.nodes.cancelButton.addEventListener('click', this.cancel.bind(this));
        },

        initTemplate: function () {
            var templateContent = document.getElementById('item');

            this.template = _.template(templateContent.innerHTML);
        },

        render: function (data) {
            var data = data || this.storage.getData();
            var result = data.reduce(function (sum, el) {
                return sum + this.renderItem(el);
            }.bind(this), '');

            this.el.innerHTML = result;
        },

        renderItem: function (data) {
            return this.template(data);
        },

        removeItem: function (e) { // TODO: Combine with removeItems();
            //console.log(this.storage.tempStorage);
            elemId = e.currentTarget.dataset.id;
            //elem = this.storage.getById(parseInt(elemId));
            elems = this.storage.tempStorage;
            console.log(elemId);
            var result = _.reject(elems, function(item) {
                //console.log(elemId);
                //console.log(item.id == elemId);
                //console.log(item.id);
                if (item.id == elemId) {
                    console.log(item, 'this to be removed');
                    this.storage.remove(item);
                    return this.renderItem(item);
                    //return this.renderItem(item);
                }
            }.bind(this), '');
            //console.log(result);
            this.render(result);
        },

        removeItems: function (elems) {
            var result = _.reject(elems, function(item) {
                return elems + this.renderItem(item);
            }.bind(this), '');

            this.el.innerHTML = result;
        },

        getUniqueId: function () {
            return Math.round(+new Date()/1000);
        },

        passDataToModal: function (buttonId) {
            this.nodes.removeUserButtonModal.dataset.id = buttonId;
        },

        dataIsValid: function (data) {
            var msg = [];

            for (var key in data) {
                if(data[key].length === 0) {
                    msg.push(key);
                }
            }

            if (msg.length > 0) {
                this.userException(msg);
                return false;
            }

            return true;
        },

        userException: function (message) {
            this.message = message;
            alert(this.message + ' this field(s) should be not empty'); // TODO: Show message
        },

        addPerson: function() {
            var person = {
                lastName: this.nodes.lastName.value,
                firstName: this.nodes.firstName.value,
                age: this.nodes.age.value,
                id: this.getUniqueId()
            };
            //console.log(this.dataIsValid(person));
            if (this.dataIsValid(person)) {
                this.setItems(person);
                this.resetPersonData();
                this.render();
            } else {
                //alert('error');
            }
        },

        resetPersonData: function () {
            this.nodes.lastName.value = '';
            this.nodes.firstName.value = '';
            this.nodes.age.value = '';
        },

        saveItems: function () {
            this.storage.save();
        },

        clearItems: function () {
            var elems = this.storage.getData();
            this.removeItems(elems);
            this.storage.clear();
        },

        setItems: function (data) {
            this.storage.set(data);
        },

        cancel: function () {
            console.log(this.storage.cancelled, 'cancelled');
            if (this.storage.cancelled.length > 0) {
                this.render(this.storage.cancelled);
                this.storage.cancelled = this.storage.tempStorage;
            }
        }

    };

    return Manager;

} (_, document, app));
