//4) Функция которая во время изменения размера окна браузера будет показывать размер
//окна. Размер экрана выводить только если пользователь не делает изменений размера экрана
//более 2 секунд.

(function() {
    var newSizeWidth;
    var newSizeHeight;
    var delay;
    var sizeContainer = window.document.querySelector('.size');

    var actualSize = {
        width: 0,
        height: 0
    };

    setSize();

    window.onresize = function() {
        if (delay != null) {
            clearTimeout(delay);
        }

        delay = setTimeout(function(){
            newSizeWidth = window.document.body.offsetWidth;
            newSizeHeight = window.document.body.offsetHeight;
            if (actualSize.width != newSizeWidth || actualSize.height != newSizeWidth) {
                setSize();
            }

        }, 2000);
    };

    function setSize() {
        actualSize.width = window.document.body.offsetWidth;
        actualSize.height = window.document.body.offsetHeight;
        sizeContainer.innerText = actualSize.width + ' × ' + actualSize.height;
    }

}).call();