//3) Часики, точные, чтобы и дату и время показывали.
//    Перерисовка не реже чем раз в секунду.
//    Не перерисовывать данные, если они не поменялись.
//    Не использовать информацию из HTML разметки.
//    Не хранить никакую информацию в глобальных переменных.
//

"use strict";
(function () {
    var time = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        date: 0,
        month: 0
    };

    var realTime = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        date: 0,
        month: 0
    };

    getRealTime();
    whatChanged(time, realTime);

    setInterval(function() {
        getRealTime();
        whatChanged(time, realTime);
    }, 1000);

    function getRealTime () {
        var date = new Date();
        realTime.hours = date.getHours();
        realTime.minutes = date.getMinutes();
        realTime.seconds = date.getSeconds();
        realTime.date = date.getDate();
        realTime.month = date.getMonth();
    }

    function updateTime(time, name) {
        time[name] = realTime[name];
    }

    function whatChanged(time, realTime) {
        Object.keys(time).forEach(function(name) {
            if(time[name] !== realTime[name]) {
                updateTime(time, name);
                elemRedraw(name);
            }
        });
    }

    function elemRedraw(name) {
        document.querySelector('.' + name).innerText = time[name]; // TODO: Ссылки на элемент, не искать каждый раз при перерисовке.
    }
}).call();