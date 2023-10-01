/**
 * Загрузка книг активной категории
 * @param apiKey API-ключ от Google Books Api
 * @param q Категория книг
 * @param selector Секция куда добовляется книги
 * @param startIndex Позиция в списке, с которой будет начинаться загрузка
 * @param clear Очистка секции
 */
export default function loadBooks(apiKey: string, q: string, selector: string, startIndex: number = 0, clear: boolean = true): void {
    fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${q}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
        .then(response => response.json())
        .then(data => {
            const categoryBooks = document.querySelector(`${selector}`) as HTMLDivElement;
            clear ? categoryBooks.innerHTML = '' : '';
            data.items.forEach(book => {
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
              ${book.volumeInfo.averageRating ? book.volumeInfo.averageRating + " stars" : ''} ${book.volumeInfo?.ratingsCount ? book.volumeInfo?.ratingsCount + ' review' : ''}
           </p>
           <p class="book-card--description--description">
               ${book.volumeInfo.description ? book.volumeInfo.description : '-'}
           </p>
           <p class="book-card--description--price">
               ${book.saleInfo?.retailPrice?.amount ? book.saleInfo?.retailPrice?.amount + '$' : "Not for sale"}
           </p>
           <button class="${book.saleInfo?.retailPrice?.amount ? 'book-card--description--buy' : 'book-card--description--buy-not-active'} ">
               buy now
           </button>
        </span>
   `;
                categoryBooks.appendChild(bookDiv);
            });
        })
        .catch(error => console.error(error));
}