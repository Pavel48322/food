import {getResource} from '../services/services';

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

    

    getResource('http://localhost:3000/menu')
        .then(data => { // data Это большой массив из db.json
            data.forEach(({img, altimg, title, descr, price}) =>{
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });// Этот конструктор будет создаваться столько раз, сколько объектов внутри массива
            // который мне придет из сервера
        });

}

export default  cards;