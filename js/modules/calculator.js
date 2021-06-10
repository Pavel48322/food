function calculator() {
    // Calculator

    const result = document.querySelector('.calculating__result span'); //Это результат 

    let sex, height, weight, age, ratio = 1.375; // Пол, рост, вес, возраст, активность

    if (localStorage.getItem('sex')) { // если уже есть в хранилище, то оставляем такое
        sex = localStorage.getItem('sex');
    } else { // если нет в хранилище, то ставим female и записываем в хранилище
        sex = "female";
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) { // если уже есть в хранилище, то оставляем такое
        let ratio = localStorage.getItem('ratio');
    } else { // если нет в хранилище, то ставим 1.375 и записываем в хранилище
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }


    //Для локального хранилища, чтобы запоминало при обновлении
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); //убираем активный класс 
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass); // добавляем активный класс (для пола)
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass); // добавляем активный класс (активности)
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = "____";
            return;
        } // Если мы что-то не ввели, то ничего не покажет

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } // Если женщина, то одна формула, если мужчина, то другая. Так же округляем!
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // буду получать все дивы

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) { // Если такой аттрибут присуствует, то
                    ratio = +e.target.getAttribute('data-ratio'); //вытаскиваем то значение (1.2 и т.д)
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // при обновлении страницы
                    //все останется, именно ratio;
                } else { // если нет, то вытаскиваем что написано (женщина или мужчина)
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));// при обновлении страницы все останется, 
                    // именно пол
                }

                elements.forEach(elem => {
                    elem.classList.remove(activeClass);// убираем класс активности у всех элементов
                });

                e.target.classList.add(activeClass);//назначаем класс активности тому объекту которому кликнули

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active'); // для пола (мужской женский)
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');//для пола (мужской женский)

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        //Делаем перебор по инпутам
        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)){//Если мы нашли не число, то:
                input.style.border = '1px solid red'; // красим в белый цвет
            } else { // если нет то:
                input.style.border = 'none'; // обводки не будет
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;                    
                    break;
                case 'weight':
                    weight = +input.value;                    
                    break;
                case 'age':
                    age = +input.value;                    
                    break;
            } // когда мы будем что-то вводить она будет орентироваться на уникальный индефикатор и записывать данные
            // в эту переменную
            calcTotal();
        });
    }
    
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

export default calculator;