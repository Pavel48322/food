/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Используем классы для карточек 

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; // мы не знаем сколько будет аргументов в будущем
            this.parent = document.querySelector(parentSelector); //обязательно получаем только 1 элемент
            this.transfer = 27; //трансформируем с гривны в доллары
            this.changeToUAH(); // все идет последовательно, поэтому этот метод вызовется после всего и изменит price
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }// этот метод отвечает на конвертацию валют 

        render() {
            const element = document.createElement('div'); //создаем какой-то блок
            if (this.classes.length === 0) {
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
                //мы перебираем весь массив, и присваем className каждому элементу
            } // если у нас ничего не добавляется, ты мы добавляем сами "menu__item"
            // Если же у нас есть что-то, то мы перебираем через forEach, так как у нас это массив

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element); // добавляем в самый конец своего родителя 
        }
    }

    

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => { // data Это большой массив из db.json
            data.forEach(({img, altimg, title, descr, price}) =>{
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });// Этот конструктор будет создаваться столько раз, сколько объектов внутри массива
            // который мне придет из сервера
        });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg', //Путь к картинке (загрузка)
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }; // Что будет показываться, когда отправим форму

    forms.forEach(item => {
        bindPostData(item);
    });

   
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //Отменяем стандартное поведение

            const statusMessage = document.createElement('img'); //так как у нас картинка, то создаем img вместо div
            statusMessage.src = message.loading; //создали изображения и сразщу же подставили атриббут src
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);// в нашу форму добавляем наш спинер(картинку)
// и добавляем так, чтобы он был снизу, а не сбоку, когда стоят в css display: flex


            const formData = new FormData(form);
            
            // трансформация в JSON формат
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            //entries делает из объекта массив с масивами
            //fromEntries делает из массива объект

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); // Выведем в консоль то что нам вернул сервер
                showThanksModal(message.success); // Ниже мы создали функцию
                statusMessage.remove(); //удаляет блок со страницы
            })
            .catch(() => {
                showThanksModal(message.failure); // Если что-то пойдем не так, то выполнится это
            })
            .finally(() => {
                form.reset();// После отправки форма очищается
            }); 
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); // сразу скрываем блок
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId); // Отвечает за открытие модельного окна

        const thanksModal = document.createElement('div');// Создаем дополнительный блок
        thanksModal.classList.add('modal__dialog'); // Придаем этому блоку класс, который уже есть в HTML
        thanksModal.innerHTML = `
            <div class="modal__content>
                <div class="modal__close" date-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal); // append - вставка элемента в конец
        setTimeout(() => {
            thanksModal.remove();// Удаление блока через 4 секунды 
            prevModalDialog.classList.add("show"); // Добавляем класс 
            prevModalDialog.classList.remove('hide');// Убираем класс
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); //Закрываем модельное окно
        }, 4000); 
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
    function openModal(modalSelector, modalTimerId) {

        const modal = document.querySelector(modalSelector); 
        modal.classList.add('show');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';// чтобы оснoвное окно нельзя было прокрутить

        if (modalTimerId){
            clearInterval(modalTimerId); // Если мы сами откроем, чтобы оно не открывалось еще раз по истечении времени
        }
    }
    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector); 
        modal.classList.add('hidden');
        modal.classList.remove('show');
        document.body.style.overflow = ''; // возвращаем, чтобы можно было скроллить страницу
    }// мы создали эту функцию, так как есть повторения, и если есть как минимум 2 повторения, то нужно выносить в функц


function modal(triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector), //Обращаемся по data атрибуту 
          modal = document.querySelector(modalSelector); 

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));// При клике меняем класс на block
    }); // Делаем через forEach так как из несколько (делаем перебор) 

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    }); // при нажатии не на кнопку закрыть, а на пустое место (вокруг окна) закроется это окно

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    }); // При нажатии на esc будет закрываться модельное окно и так же мы проверяем открыто ли окно
    // Все кнопки можно найти на сайте keycode.info


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //чтобы не появлялось каждый раз, как мы опускаемся
            //вниз, мы его удаляем
        }//Не понял, но суть такая:Если мы долистали до конца, то сработает. Идет какое-то сравнивание которое непонятно
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    //Slider

    let slideIndex = 1; //задаем индекс слайду
    let offset = 0; //расположение текущего слайда


    const slides = document.querySelectorAll(slide), //Весь блок со слайдами
          slider = document.querySelector(container), // отдельные слайды
          prev = document.querySelector(prevArrow), // кнопка влево
          next = document.querySelector(nextArrow), // кнопка вправо
          total = document.querySelector(totalCounter), // сколько всего написанно слайдов
          current = document.querySelector(currentCounter), // какой сейчас написан слайд
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width; // узнаем ширину
    
  
    if (slides.length < 10) { // Это отвечает за то, что если будет общее количество слайдов до 10, то добавляется 0
    // и так же с просто при перемещении слайдов, чтобы 0 был
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = `0${slideIndex}`;

    }

    slidesField.style.width = 100 * slides.length + '%'; // узнаем ширину польностью всех слайдов
    slidesField.style.display = 'flex'; // все в одну строку
    slidesField.style.transition = '0.5s all'; // плавный переход
    
    slidesWrapper.style.overflow = 'hidden'; // ограничиваем, чтобы видно было 100%, а не 400%

    slides.forEach(slide => {
        slide.style.width = width; //теперь мы точно уверенны что все слайды одинаковой ширины
    }); 

    slider.style.position = 'relative'; 

    const indicators = document.createElement('ol'), //Создаем эелемент на страницу
          dots = []; //Создаем массив

    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }
    
    //replace (регулярное выражение), удаляет все НЕ ЧИСЛА  
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }
    
    //Для плавного перехода
    function slidesFieldTransform() {
                slidesField.style.transform = `translateX(-${offset}px)`;
    }

    //Текущий слайд с 0 до 10 и без 0 после 10
    function currentSlide() {
        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    //При пролистывании делает не активные слайды менее прозрачными а активным непрозрачным
    function opacitySlides() {
        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    //кнопка вперед
    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) { 
            offset = 0;////если наш offset будет равен всей ширине наших слайдов, то возвращаемся в начало
        } else {
            offset += deleteNotDigits(width); //добавляем смещение, если не последний слайд
        }

        slidesFieldTransform();

        if (slideIndex == slides.length) {
            slideIndex = 1; // возвращаемся в начало, если дойдет до конца
        } else {
            slideIndex++;
        }

        currentSlide();

        opacitySlides(); 
    });

    //кнопка назад
    // все так же как вперед, только наоборот
    prev.addEventListener('click', () => {
        if (offset == 0) {  
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width); //уменьшаем смещение, если не последний слайд
        }

        slidesFieldTransform();

        if (slideIndex == 1) {
            slideIndex = slides.length; // возвращаемся в конец, если дойдет до начала
        } else {
            slideIndex--;
        }

        currentSlide();

        opacitySlides(); 
    });
     
    //Работа с массивом
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to'); // узнаем порядок слайдов
            slideIndex = slideTo; // заменяем порядок слайдов индексом
            offset = deleteNotDigits(width) * (slideTo -1);

            slidesFieldTransform();

            currentSlide();

            opacitySlides(); 
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
     //Tabs

    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide"); //тут мы добавляем класс hide (display: none)
            item.classList.remove("show", 'fade'); // тут мы удаляем класс show (display: block) и fade (Анимацию)
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass); // Тут мы удаляем активный таб
        });
    } // все табы скрыли

    function showTabContant(i = 0) {
        tabsContent[i].classList.add("show", 'fade');// Добавили анимацию и display: block только на 1 таб
        tabsContent[i].classList.remove("hide"); // удаляем display: none
        tabs[i].classList.add(activeClass); // добавляем активный класс

    }// показали активный класс

    hideTabContent();
    showTabContant();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) { // вешаем одинаковые события на детей
            tabs.forEach((item, i) => { // где i номер кнопки которую мы нажимаем
                if (target == item) {
                    hideTabContent();
                    showTabContant(i);
                }
            });
        }
    }); // сделали переключение между табами, путем удаления и добавления активных табов

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
  // вот так мы отправляем данные
    const postData = async (url, data) => { //В функции будет какойто асинхронный код, поэтому мы написали async
        const res = await fetch(url, { // тут мы пишем куда // использовали его парный оператор await, перед теми
        // операциями, которые нужно дождаться. Эти операторы всегда используются в паре!
            method: "POST", 
            headers: {
                'Content-type': 'application/json' // каким образом
            },
            body: data   // что именно
        });

        return await res.json(); //Дожидается работы этого промиса и только потом его возвращает
    };

    const getResource = async (url) => { //В функции будет какойто асинхронный код, поэтому мы написали async
        const res = await fetch(url); // тут мы пишем куда // использовали его парный оператор await, перед теми
        // операциями, которые нужно дождаться. Эти операторы всегда используются в паре!
        if(!res.ok) {
            throw new Error(`Coul not fetch ${url}, status: ${res.status}`); // Это на слуяай если будет ошибка
        }

        return await res.json(); //Дожидается работы этого промиса и только потом его возвращает
    };

    
    

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000); 
    // Через 50секунд модельное окно само вызовется

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)(".tabheader__item", '.tabcontent', '.tabheader__items', "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', ".modal", modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-06-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_4__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__.default)('form', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__.default)({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field:'.offer__slider-inner',

    });
  
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map