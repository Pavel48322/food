import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId); // Отвечает за открытие модельного окна

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
            closeModal('.modal'); //Закрываем модельное окно
        }, 4000); 
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

export default  forms;
