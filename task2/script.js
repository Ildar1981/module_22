const btn = document.querySelector(".btn");
const iconFirst = document.querySelector(".btn__icon-first");
const iconSecond = document.querySelector(".btn__icon-second");
const text = document.querySelector(".btn__text")

btn.addEventListener('click', () => {
    if (getComputedStyle(iconFirst).display != 'none'){
        iconFirst.className = "btn__icon-first btn__icon--hide";
        iconSecond.className = "btn__icon-second";
        text.innerHTML = 'Изменилась теперь новоя кнопка'
    }else {
        iconFirst.className = "btn__icon-first";
        iconSecond.className = "btn__icon-second btn__icon--hide";
         text.innerHTML = 'Вернулась прежняя конпка'
        
    }
})