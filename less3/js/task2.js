"use strict";
//2) Сделать формочку
//
//два инпута и кнопка
//в инпуты вводиться количество строк и количество столбцов.
//
//    По кнопочке генерируется табличка заданной размерности (например 10 на 10)
//По нажатии на каждую ячейку ячейка говорит о своём индексе алертом при нажатии.
//    Не хранить индекс ячейки в разметке

(function (){
    var rows = 10;
    var cells = 10;
    var table;
    var tr;
    var td;

    var form = document.querySelector('.form');
    var table = document.querySelector('.table');
    var rowsInput = document.querySelector('.rows');
    var cellsInput = document.querySelector('.cells');
    var drawButton = document.querySelector('.draw');
    var tableContent = document.createDocumentFragment();

    function drawTable(rows, cells) {
        table = document.createElement('table');
        table.className = 'table';
        form.parentNode.insertBefore(table, form.nextSibling); // TODO: check crossbrowser

        for (var i = 0; i < rows; i++) {
            drawTr();
            for (var j = 0; j < cells; j++) {
                drawTd();
            }
        }
        table.appendChild(tableContent);
        console.log(table);
        getIndex(table);
    }

    function drawTr() {
        tr = document.createElement('tr');
        tableContent.appendChild(tr);
        return tableContent;
    }

    function drawTd() {
        td = document.createElement('td');
        tr.appendChild(td);
        return tableContent;
    }

    drawButton.onclick = function(e) {
        e.preventDefault();
        rows = rowsInput.value;
        cells = cellsInput.value;
        drawTable(rows, cells);
    };

    function clearCell(cell) {
        setTimeout(function() {
            cell.innerText = '';
        }, 2000);
    }

    function getIndex(table) {
        var tds = table.getElementsByTagName('td');

        for(var i = 0; i < tds.length; i++) {

            tds[i].onclick = function(){
                var cellIndex  = this.cellIndex + 1;
                var rowIndex = this.parentNode.rowIndex + 1;

                this.innerText = "cell: " + cellIndex + "\n row: " + rowIndex;
                clearCell(this);
            }
        }
    }

}).call();