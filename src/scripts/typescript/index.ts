import showCategory from "./chengedCatigories.js"
import showSlide from "./slider.js"
import loadBooks from "./booksByCategory.js";
import buyBook from "./buyBook.js";

// Список категорий для упрощения
const categories = {
    0: "Architecture",
    1: "Art",
    2: "Biography & Autobiography",
    3: "Business",
    4: "Crafts & Hobbies",
    5: "Drama",
    6: "Fiction",
    7: "Cooking",
    8: "Health & Fitness",
    9: "History",
    10: "Humor",
    11: "Poetry",
    12: "Psychology",
    13: "Science",
    14: "Technology",
    15: "Travel"
}
const apiKey: string = 'AIzaSyC8YBwRI2UO8lk5k4S31Z77MyGZr_Lu_bI';


function showFirstCategory():void {
    showCategory(0, links);
    loadBooks(apiKey, categories[0], '.category-books');
}

function showFirstSlide():void {
    showSlide(0, switches);
}

/* Начало */

const links = document.querySelectorAll(".categories-links__link") as NodeListOf<HTMLUListElement>;
const switches = document.querySelectorAll(".switch") as NodeListOf<HTMLSpanElement>;
const buttonMoreBooks = document.querySelector('.main__more-books--button') as HTMLButtonElement;

// счётчик книг для подгрузки новых
let startIndex: number = 7;

showFirstCategory();
showFirstSlide();

// Смена категорий и книг
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', () => {
        showCategory(i, links);
        loadBooks(apiKey, categories[i], '.category-books')
    });
}

// Смена слайдера
for (let i = 0; i < switches.length; i++) {
    switches[i].addEventListener('click', () => {
        showSlide(i, switches);
    });

}

// Запрос на новые книжки
buttonMoreBooks.addEventListener('click', () => {
    const category = document.querySelector('.categories-links__link--active') as HTMLUListElement;
    const categoryNumber: number = Number(category.getAttribute('data-category')) - 1;
    loadBooks(apiKey, categories[categoryNumber], '.category-books',  startIndex, false);
    startIndex += 6;
});

/* Запуск таймера для слайдера */
let index: number = 0;
setInterval(() => {
    index = index > 2 ? 0 : index
    showSlide(index++, switches)
}, 5000);