function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()), //Получим разницу между датами 
              days = Math.floor(t / (1000 * 60 * 60 * 24)), // floor округляет до круглого числа.
// а потом мы узнаем сколько миллисекунд в одном дне.
              hours = Math.floor((t / (1000 * 60 * 60) % 24)), // общее количество часов делим с остатком на 24ч (сутки)
// мы делим на 24, чтобы получить не целове количество, а хвостики, и выйдет не больше 24
              minutes = Math.floor((t / 1000 / 60) % 60), // сразу получаем количество секунд, потом минут
              seconds = Math.floor((t / 1000) % 60); // получаем секунды

        return {
            'total': t, 
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`; // если число равно или выше 0 или ниже 10, то добавляем 0
        } else {
            return num; // если нет, то просто выводим число
        }
    }// Функция отвечает за то, что если число '9' или ниже, то добавляем '0' и выйдет '09'

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000); // каждую секунду вызываем функцию
        // получили все элементы со страницы, где 'selector' это '.timer' и он родитель days  и т.д.

        updateClock(); // Вызываем первый раз в ручную, чтобы не ждать первую секунду, ибо получится мигание

        function updateClock() {
            const t = getTimeRemaining(endtime); // вызываем прошлую функция (return передает сюда)

            days.innerHTML = getZero(t.days);// вызываем ту функцию, которая добавляет 0
            hours.innerHTML = getZero(t.hours);// вызываем ту функцию, которая добавляет 0
            minutes.innerHTML = getZero(t.minutes);// вызываем ту функцию, которая добавляет 0
            seconds.innerHTML = getZero(t.seconds);  // вызываем ту функцию, которая добавляет 0
        // когда функция запустится, она расчитает нужно время, и на основе этих расчетов будет записано время на стр

            if (t.total <= 0) {
                clearInterval(timeInterval);
            } // если время вышло, то таймер не обновляем
        }
    }

    setClock(id, deadline);

}

export default  timer;