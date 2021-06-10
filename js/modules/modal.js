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

export default  modal;
export {closeModal};
export {openModal};