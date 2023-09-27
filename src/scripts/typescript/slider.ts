function showSlide(index: number, buttons: NodeListOf<Element>) {
    if (index < 0) {
        index = 2;
    }
    else if (index > 2) {
        index = 0;
    };

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

function showFirstSlide() {
    showSlide(0, switches);
}

const switches = document.querySelectorAll(".switch");

let slideNumber:number = 0;

switches.forEach(switche => {
    switche.addEventListener('click', () => {
        showSlide(slideNumber, switches);
    });
    slideNumber++;
});

/* switches[0].addEventListener('click', () => {
    showSlide(0, switches);
});

switches[1].addEventListener('click', () => {
    showSlide(1, switches);
});

switches[2].addEventListener('click', () => {
    showSlide(2, switches);
}); */

showFirstSlide();

let index: number = 0;
setInterval(() => {
    index = index > 2 ? 0 : index
    showSlide(index++, switches)
}, 5000);