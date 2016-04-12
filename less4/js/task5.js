/**
 * prev -  функция, которая будет кроссбраузерно возвращать предыдущий элемент
 * (не текстовую ноду, работа наподобие prev() в jQuery).
 *
 * @param {Node} node
 * @return {Node}
 */

function next (node) {
    while (node && (node = node.previousSibling)) {
        if (node.nodeType !== 8 && node.nodeType !== 3) {
            console.log(node);
            return node;
        }
    }
}

var node = window.document.getElementById('parent');

next(node);