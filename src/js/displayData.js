import {CART,singleItem} from './store.js';
import {incrementHeaderData} from './header.js';
import {showHeader} from "./header";
import {pagination} from "./pagination";


require("@babel/polyfill");

export const PRODUCTS = [];

export function sendAjaxRequest(method, url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    });
}

function addItem(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    console.log('add to cart item', id);
    CART.add(id, 1);
    incrementHeaderData();
}

function sendItem(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.parentNode.getAttribute('prod-id'));
    singleItem.add(id);
    window.open("http://localhost:3000/singleProduct.html","_self")
}

function displayItems(item) {
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

    let singleProductLink = document.createElement('a');
    singleProductLink.href = './singleProduct.html';
    singleProductLink.setAttribute('prod-id', item.id);
    singleProductLink.addEventListener('click',sendItem);

    let img = document.createElement('img');
    img.alt = item.name;
    img.src = item.photo;
    img.className = 'menu-item-photo';
    singleProductLink.appendChild(img);

    card.appendChild(singleProductLink);

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

function displayLunchItems(item) {
    let card = document.createElement('div');
    card.className = 'menu-item';

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
    item.items.forEach((el, i)=>{

        let ingredients = document.createElement('p');
        ingredients.className = 'menu-item-lunch';
        ingredients.textContent = `${i+1}. ${el} `;
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

window.onload = async function () {
    CART.init();
    document.getElementById('header').innerHTML = `
${showHeader()}
`;
    try {
        let data = await sendAjaxRequest('GET', './data/db.json');
        const items = JSON.parse(data);
        PRODUCTS.push(...items);
        const container = document.createElement('div');
        container.classList.add('container-menu-item');
        container.setAttribute('id','container');
        const paginationContainer = document.createElement('div');
        paginationContainer.setAttribute('id','pagination');
        const saladRoot = document.getElementById('salads');
        const soupRoot = document.getElementById('soups');
        const hotmealsRoot = document.getElementById('hotmeals');
        const drinksRoot = document.getElementById('drinks');
        const ukrFoodRoot = document.getElementById('ukr-food');
        const itaFoodRoot = document.getElementById('ita-food');
        const asiaFoodRoot = document.getElementById('asia-food');
        const businessLunchRoot = document.getElementById('business-lunch');
        items.forEach(item => {
                if (soupRoot && item.type === "soup") {
                    const soupSection = displayItems(item);
                    container.append(soupSection);
                }
                if (saladRoot && item.type === "salad") {
                    const saladSection = displayItems(item);
                    console.log(container);
                    container.append(saladSection);
                }
                if (hotmealsRoot && item.type === "hotmeals") {
                    const hotmealsSection = displayItems(item);
                    container.append(hotmealsSection);
                }
                if (drinksRoot && item.type === "drinks") {
                    const drinksSection = displayItems(item);
                    container.append(drinksSection);
                }
                if (ukrFoodRoot && item.cuisine === "ukrainian") {
                    const ukrFoodSection = displayItems(item);
                    container.append(ukrFoodSection);
                }
                if (itaFoodRoot && item.cuisine === "italian") {
                    const itaFoodSection = displayItems(item);
                    container.append(itaFoodSection);
                }
                if (asiaFoodRoot && item.cuisine === "asian") {
                    const asiaFoodSection = displayItems(item);
                    container.append(asiaFoodSection);
                }
                if (businessLunchRoot && item.type === "business-lunch") {
                    const businessLunchSection = displayLunchItems(item);
                    container.append(businessLunchSection);
                }
            }
        );


        saladRoot && saladRoot.append(container);
        saladRoot && saladRoot.append(paginationContainer);

        soupRoot && soupRoot.append(container);
        soupRoot && soupRoot.append(paginationContainer);

        hotmealsRoot && hotmealsRoot.append(container);
        hotmealsRoot && hotmealsRoot.append(paginationContainer);

        drinksRoot && drinksRoot.append(container);
        drinksRoot && drinksRoot.append(paginationContainer);

        ukrFoodRoot && ukrFoodRoot.append(container);
        ukrFoodRoot && ukrFoodRoot.append(paginationContainer);

        itaFoodRoot && itaFoodRoot.append(container);
        itaFoodRoot && itaFoodRoot.append(paginationContainer);

        asiaFoodRoot && asiaFoodRoot.append(container);
        asiaFoodRoot && asiaFoodRoot.append(paginationContainer);

        businessLunchRoot && businessLunchRoot.append(container);
        businessLunchRoot && businessLunchRoot.append(paginationContainer);
        pagination.load();
    } catch (reqStatus) {
        console.log(reqStatus);
    }
};


