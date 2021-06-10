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

export default  slider;