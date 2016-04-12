/**
 * firstChild -  функция, которая будет кроссбразурено возвращать firstChild (не текстовую ноду).
 *
 * @param {Node} parent node
 * @return {Node}
 */

function firstChild (parent) {
    var nodes = parent.childNodes; // TODO: crossbrowser?

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType !== 8 && nodes[i].nodeType !== 3) {
            console.log(nodes[i]);
            break;
            return nodes[i];
        }
    }
}

var parent = window.document.getElementById('parent');

firstChild(parent);