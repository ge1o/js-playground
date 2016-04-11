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
    var row;
    var cell;

    var form = document.querySelector('.form');
    var table = document.querySelector('.table');
    var rowsInput = document.querySelector('.rows');
    var cellsInput = document.querySelector('.cells');
    var drawButton = document.querySelector('.draw');

    function drawTable(rows, cells) {
        table = document.createElement('table');
        table.className = 'table';
        form.parentNode.insertBefore(table, form.nextSibling); // TODO: check crossbrowser

        for (var i = 0; i < rows; i++) {
            drawTr();
            for (var j = 0; j < cells; j++) {
                //cell = document.createElement('td');
                console.log(i);
                //drawTd(row[i]);
            }
        }
    }

    function drawTr() {
        row = document.createElement('tr');
        table.appendChild(row); // TODO: Add whole collection of tags once
    }

    function drawTd(tr) {
        cell = document.createElement('td');
        tr.appendChild(cell); // TODO: Add whole collection of tags once
    }

    drawTable(rows, cells);

}).call();