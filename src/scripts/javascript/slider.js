/**
 * Отрисовка слайда
 * @param index Номер слайда
 * @param buttons Переключатели слайдов
 */
export default function showSlide(index, buttons) {
    if (index < 0) {
        index = 2;
    }
    else if (index > 2) {
        index = 0;
    }
    ;
    let slides = document.querySelectorAll(".section__banner");
    slides.forEach((slide, i) => {
        if (i !== index) {
            slide.classList.add("section__banner--hide");
            buttons[i].classList.remove("switch--active");
        }
    });
    slides[index].classList.remove("section__banner--hide");
    buttons[index].classList.add("switch--active");
}
