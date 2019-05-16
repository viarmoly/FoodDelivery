import {CART} from "./store";
import {incrementHeaderData} from "./header";

export function addItem(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    console.log('add to cart item', id);
    CART.add(id, 1);
    incrementHeaderData();
}

export function displayItems(item) {
    let itemName = item.name;

    let ingredientsCut = item.ingredients.join(", ");

    if (itemName.length > 24) {
        itemName = itemName.substring(0, 24).concat('...');
    }

    if (ingredientsCut.length > 70) {
        ingredientsCut = ingredientsCut.substring(0, 70).concat('...');
    }
    let card = document.createElement('div');
    card.className = 'menu-item';
    card.setAttribute('prod-type', `${item.type}`);

    let img = document.createElement('img');
    img.alt = item.name;
    img.src = item.photo;
    img.className = 'menu-item-photo';

    card.appendChild(img);

    let content = document.createElement('div');
    content.className = 'sm-div';

    let title = document.createElement('h2');
    title.className = 'menu-title';
    title.textContent = itemName;
    content.appendChild(title);

    let weight = document.createElement('p');
    weight.className = 'menu-item-weight';
    weight.textContent = item.weight;
    content.appendChild(weight);

    let ingredients = document.createElement('p');
    ingredients.className = 'menu-item-ingredients';
    ingredients.textContent = ingredientsCut;
    content.appendChild(ingredients);

    let price = document.createElement('p');
    price.className = 'menu-item-price';
    price.textContent = `${item.price} грн`;
    content.appendChild(price);


    let btn = document.createElement('button');
    btn.className = 'menu-item-btn';
    btn.textContent = 'Заказать';
    btn.setAttribute('data-id', item.id);
    btn.addEventListener('click', addItem);
    content.appendChild(btn);
    card.appendChild(content);
    return card;
}

export function displayLunchItems(item) {
    let card = document.createElement('div');
    card.className = 'menu-item-bs-lunch';

    let img = document.createElement('img');
    img.alt = item.name;
    img.src = item.photo;
    img.className = 'menu-item-lunch-photo';
    card.appendChild(img);

    let content = document.createElement('div');
    content.className = 'sm-div';

    let title = document.createElement('h2');
    title.className = 'menu-title';
    title.textContent = item.name;
    content.appendChild(title);
    let ingridientsCont = document.createElement('div');
    ingridientsCont.className = 'title-menu';
    item.items.forEach((el, i) => {
        let ingredients = document.createElement('p');
        ingredients.className = 'menu-item-lunch';
        ingredients.textContent = `${i + 1}. ${el} `;
        ingridientsCont.appendChild(ingredients);
        content.appendChild(ingridientsCont);
    });

    let btn = document.createElement('button');
    btn.className = 'menu-item-btn';
    btn.textContent = 'Заказать';
    btn.setAttribute('data-id', item.id);
    btn.addEventListener('click', addItem);
    content.appendChild(btn);
    card.appendChild(content);
    return card;
}