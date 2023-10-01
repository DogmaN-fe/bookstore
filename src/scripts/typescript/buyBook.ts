export default function buyBook(button: HTMLButtonElement){
    button.innerText = 'in the cart';
    button.classList.remove('book-card--description--buy');
    button.classList.add('book-card--description--buy-not-active');
}