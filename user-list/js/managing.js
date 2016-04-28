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
                editUserButtons: document.getElementsByClassName('edit-user-button'),
                removeUserButtonModal: document.getElementById('remove-user-button-modal'),
                editUserButtonModal: document.getElementById('edit-user-button-modal'),
                cancelButton: document.getElementById('cancel-button'),
                editForm: document.querySelector('.edit-form'),
                editModal: document.getElementById('edit-user'),
                filterInput: document.querySelector('.filter-input'),
                filterButton: document.querySelector('.filter-button')
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
                    this.passDataToModal(buttonId);
                } else if (target.classList.contains('edit-user-button') || target.parentNode.classList.contains('edit-user-button')) {
                    this.initEditForm(buttonId);
                    this.passDataToModal(buttonId);
                } else {
                    return;
                }

            }.bind(this);

            this.nodes.saveButton.addEventListener('click', this.saveItems.bind(this));
            this.nodes.clearButton.addEventListener('click', this.clearItems.bind(this));
            this.nodes.removeUserButtonModal.addEventListener('click', this.removeItem.bind(this));
            this.nodes.editUserButtonModal.addEventListener('click', this.editItem.bind(this));
            this.nodes.cancelButton.addEventListener('click', this.cancel.bind(this));
            this.nodes.filterButton.addEventListener('click', this.filter.bind(this));
        },

        initTemplate: function () {
            var templateContent = document.getElementById('item');

            this.template = _.template(templateContent.innerHTML);
        },

        render: function (data) {

            var data = data || this.storage.getData();
            console.log(data, ' incoming');
            var result = data.reduce(function (sum, el) {
                return sum + this.renderItem(el);
            }.bind(this), '');

            this.el.innerHTML = result;
        },

        initEditForm: function (id) {
            var formTemplateContent = document.getElementById('edit-form');
            this.formTemplate = _.template(formTemplateContent.innerHTML);
            var item = this.storage.getById(id);
            this.renderForm(item);
        },

        setCancelled: function() {
            if (this.storage.cancelled.length == 0) {
                this.storage.tempStorage.map(function (item) {
                    this.storage.cancelled.push(_.extend({}, item));
                }.bind(this));
            }
        },

        renderForm: function (data) {
            var result = this.formTemplate(data);
            this.nodes.editForm.innerHTML = result;
        },

        renderItem: function (data) {
            this.setCancelled();

            return this.template(data);
        },

        editItem: function () {
            this.setCancelled();

            var id = this.nodes.removeUserButtonModal.dataset.id;
            var elem = this.storage.getById(id);

            elem.firstName = this.nodes.editForm.querySelector('#first-name-modal').value;
            elem.lastName = this.nodes.editForm.querySelector('#last-name-modal').value;
            elem.age = this.nodes.editForm.querySelector('#age-modal').value;

            this.render();
        },

        removeItem: function (e) { // TODO: Combine with removeItems();
            var elemId = e.currentTarget.dataset.id;
            var elems = this.storage.tempStorage;

            var result = _.reject(elems, function(item) {
                if (item.id == elemId) {
                    this.storage.remove(item);
                    return this.renderItem(item);
                }
            }.bind(this), '');

            this.render(result);
        },

        removeItems: function (elems) {
            var result = _.reject(elems, function(item) {
                return elems + this.renderItem(item);
            }.bind(this), '');

            this.storage.cancelled = this.storage.tempStorage;

            this.el.innerHTML = result;
        },

        getUniqueId: function () {
            return Math.round(+new Date()/1000);
        },

        passDataToModal: function (buttonId) {
            this.nodes.removeUserButtonModal.dataset.id = buttonId;
            this.nodes.editUserButtonModal.dataset.id = buttonId;
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
            this.storage.cancelled = [];
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
            if (this.storage.cancelled.length > 0) {
                this.render(this.storage.cancelled);
                this.storage.cancel();
            }
        },

        filter: function () {
            this.setCancelled();
            console.log(this.storage, ' here');
            var string = this.nodes.filterInput.value;
            //console.log(this.storage.getById(string));
            var filtered = [];
            if (string == '') {
                console.log('empty query'); // TODO: show all
            } else {
                filtered.push(this.storage.getById(string));
            }

            //console.log(filtered);
            this.render(filtered);
            this.storage.filter(filtered);
            //console.log(this.storage.tempStorage);
        }

    };

    return Manager;

} (_, document, app));
