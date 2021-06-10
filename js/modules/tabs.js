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

export default  tabs;