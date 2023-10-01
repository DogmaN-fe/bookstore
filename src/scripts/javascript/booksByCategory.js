/**
 * Загрузка книг активной категории
 * @param apiKey API-ключ от Google Books Api
 * @param q Категория книг
 * @param selector Секция куда добовляется книги
 * @param startIndex Позиция в списке, с которой будет начинаться загрузка
 * @param clear Очистка секции
 */
export default function loadBooks(apiKey, q, selector, startIndex = 0, clear = true) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${q}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
        .then(response => response.json())
        .then(data => {
        const categoryBooks = document.querySelector(`${selector}`);
        clear ? categoryBooks.innerHTML = '' : '';
        data.items.forEach(book => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('category-books__book-card', 'flex');
            bookDiv.innerHTML = `
        <span class="book-card--img-settings">
           <img src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : './src/images/test/1544111101-41AWqUSdKTL 2.svg'}" alt="${book.volumeInfo.title}" class="book-card--book-cover">
        </span>
        <span class="book-card--description flex">
           <p class="book-card--description--author">
              ${book.volumeInfo.authors ? book.volumeInfo.authors : "N/D"}
           </p>
           <h2 class="book-card--description--book-name">
              ${book.volumeInfo.title}
           </h2>
           <p class="book-card--description--view">
              ${book.volumeInfo.averageRating ? book.volumeInfo.averageRating + " stars" : ''} ${((_a = book.volumeInfo) === null || _a === void 0 ? void 0 : _a.ratingsCount) ? ((_b = book.volumeInfo) === null || _b === void 0 ? void 0 : _b.ratingsCount) + ' review' : ''}
           </p>
           <p class="book-card--description--description">
               ${book.volumeInfo.description ? book.volumeInfo.description : '-'}
           </p>
           <p class="book-card--description--price">
               ${((_d = (_c = book.saleInfo) === null || _c === void 0 ? void 0 : _c.retailPrice) === null || _d === void 0 ? void 0 : _d.amount) ? ((_f = (_e = book.saleInfo) === null || _e === void 0 ? void 0 : _e.retailPrice) === null || _f === void 0 ? void 0 : _f.amount) + '$' : "Not for sale"}
           </p>
           <button class="${((_h = (_g = book.saleInfo) === null || _g === void 0 ? void 0 : _g.retailPrice) === null || _h === void 0 ? void 0 : _h.amount) ? 'book-card--description--buy' : 'book-card--description--buy-not-active'} ">
               buy now
           </button>
        </span>
   `;
            categoryBooks.appendChild(bookDiv);
        });
    })
        .catch(error => console.error(error));
}
