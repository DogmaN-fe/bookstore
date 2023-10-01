const apiKey = 'AIzaSyBaF9sqro_BK7MZeUn5IinKoLcEa-mTRWI';

/**
 * Отрисовка активной категоии
 * @param index Номер категории
 * @param links Категории
 */
export default function showCategory(index: number, links: NodeListOf<Element>): void {
    if (index < 0) {
        index = links.length - 1;
    }
    else if (index > links.length) {
        index = 0;
    };

    links.forEach((link, i) => {
        if (i !== index) {
            links[i].classList.remove("categories-links__link--active");
        }
    });

    links[index].classList.add("categories-links__link--active");

}

