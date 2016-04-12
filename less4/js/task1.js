/**
 * removeAllSpans -  функция, которая удаляет все элементы span со страницы
 * (в этом задании пользование querySelectorAll запрещено).
 */

function removeAllSpans () {
    var spans = window.document.body.getElementsByTagName('span');

    var itemsCount = spans.length;

    function remove(elem) {
        if (elem.remove) {
            elem.remove();
        } else {
            elem.parentNode.removeChild(elem);
        }
    }

    for (var i = 0; i < itemsCount; i++) {
        spans[0].remove();
    }
}

removeAllSpans();
