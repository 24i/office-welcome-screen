(function () {
    'use strict';

    var clock = document.getElementById('clock'),
        clockInterval = null,
        months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        setClock,
        startClock;

    /*
     * Start the clock
     */
    setClock = function () {
        var now = new Date(),
            pad = function (str) {
                if (typeof str !== 'string') {
                    str = '' + str;
                }
                return str.length === 1 ? '0' + str : str;
            }
        clock.innerHTML = ''
            + pad(now.getHours())
            + ':'
            + pad(now.getMinutes())
            + '<br />'
            + months[now.getMonth()]
            + ' '
            + pad(now.getDay());
    }

    startClock = function () {
        setClock();
        if (clockInterval === null) {
            setInterval(setClock, 60 * 1000);
        }
    };

    setClock();
    setTimeout(startClock, (60 - (new Date()).getSeconds()) * 1000);

}());