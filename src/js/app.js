(function () {
    'use strict';

    var clock = document.getElementById('clock'),
        clockInterval = null,
        monthMap = {1:'Januari',2:'Februari',3:'March',4:'April',5:'May',6:'June',7:'July',8:'August',9:'September',10:'October',11:'November',12:'December'},
        setClock,
        startClock;

    /*
     * Start the clock
     */
    setClock = function () {
        var now = new Date();
        clock.innerHTML =
            now.getHours()
            + ':'
            + now.getMinutes()
            + '<br />'
            + monthMap[now.getMonth()]
            + ' '
            + now.getDay();
    }

    startClock = function () {
        if (clockInterval === null) {
            setInterval(setClock, 60 * 1000);
        }
    };
    setClock();
    setTimeout(startClock, (60 - (new Date()).getSeconds()) * 1000);

}());