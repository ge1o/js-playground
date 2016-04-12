/**
 * lastChild -  функция, будет кроссбраузерно возвращать lastChild (не текстовую ноду).
 *
 * @param {Node} parent node
 * @return {Node}
 */

function lastChild (parent) {
    var nodes = parent.childNodes;

    for (var i = nodes.length - 1; i > 0; i--) {
        if (nodes[i].nodeType !== 8 && nodes[i].nodeType !== 3) {
            console.log(nodes[i]);
            break;
            return nodes[i];
        }
    }
}

var parent = window.document.getElementById('parent');

lastChild(parent);