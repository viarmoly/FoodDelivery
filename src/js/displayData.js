import {CART, singleItem} from './store.js';
import {incrementHeaderData} from './header.js';
import {headerLoad, showHeader} from "./header";
import {pagination} from "./pagination";
import {drawFiltration} from "./filtration";
import {drawSorting} from "./sorting";
import {displayItems, displayLunchItems} from "./displayItems";

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


window.onload = async function () {
    CART.init();
    headerLoad();
    try {
        let data = await sendAjaxRequest('GET', './data/db.json');
        const items = JSON.parse(data);
        PRODUCTS.push(...items);
        const container = document.createElement('div');
        container.classList.add('container-menu-item');
        container.setAttribute('id', 'container');

        const paginationContainer = document.createElement('div');
        paginationContainer.setAttribute('id', 'pagination');

        const saladRoot = document.getElementById('salads');
        const soupRoot = document.getElementById('soups');
        const hotmealsRoot = document.getElementById('hotmeals');
        const drinksRoot = document.getElementById('drinks');
        const ukrFoodRoot = document.getElementById('ukr-food');
        const itaFoodRoot = document.getElementById('ita-food');
        const asiaFoodRoot = document.getElementById('asia-food');
        const businessLunchRoot = document.getElementById('business-lunch');

        const productFilters = document.createElement('div');
        productFilters.setAttribute('id', 'filters');
        productFilters.className = 'products-filters';
        const title = document.createElement('h2');

        items.forEach(item => {
                if (soupRoot && item.type === "soup") {
                    title.innerText = 'Супы';
                    const soupSection = displayItems(item);
                    productFilters.append(title);
                    container.append(soupSection);
                }
                if (saladRoot && item.type === "salad") {
                    title.innerText = 'Салаты';
                    const saladSection = displayItems(item);
                    productFilters.append(title);
                    container.append(saladSection);
                }
                if (hotmealsRoot && item.type === "hotmeals") {
                    title.innerText = 'Горячие блюда';
                    const hotmealsSection = displayItems(item);
                    container.append(hotmealsSection);
                }
                if (drinksRoot && item.cuisine === "drinks") {
                    title.innerText = 'Напитки';
                    const drinksSection = displayItems(item);
                    productFilters.append(title);
                    container.append(drinksSection);
                }
                if (ukrFoodRoot && item.cuisine === "ukrainian") {
                    title.innerText = 'Украинская кухня';
                    const ukrFoodSection = displayItems(item);
                    productFilters.append(title);
                    container.append(ukrFoodSection);
                }
                if (itaFoodRoot && item.cuisine === "italian") {
                    title.innerText = 'Итальянская кухня';
                    const itaFoodSection = displayItems(item);
                    productFilters.append(title);
                    container.append(itaFoodSection);
                }
                if (asiaFoodRoot && item.cuisine === "asian") {
                    title.innerText = 'Азиатская кухня';
                    const asiaFoodSection = displayItems(item);
                    productFilters.append(title);
                    container.append(asiaFoodSection);
                }
                if (businessLunchRoot && item.type === "business-lunch") {
                    const businessLunchSection = displayLunchItems(item);
                    container.append(businessLunchSection);
                }
            }
        );

        saladRoot && saladRoot.append(productFilters);
        saladRoot && saladRoot.append(container);
        saladRoot && saladRoot.append(paginationContainer);

        soupRoot && soupRoot.append(productFilters);
        soupRoot && soupRoot.append(container);
        soupRoot && soupRoot.append(paginationContainer);

        hotmealsRoot && hotmealsRoot.append(productFilters);
        hotmealsRoot && hotmealsRoot.append(container);
        hotmealsRoot && hotmealsRoot.append(paginationContainer);

        drinksRoot && drinksRoot.append(productFilters);
        drinksRoot && drinksRoot.append(container);
        drinksRoot && drinksRoot.append(paginationContainer);

        ukrFoodRoot && ukrFoodRoot.append(productFilters);
        ukrFoodRoot && ukrFoodRoot.append(container);
        ukrFoodRoot && ukrFoodRoot.append(paginationContainer);

        itaFoodRoot && itaFoodRoot.append(productFilters);
        itaFoodRoot && itaFoodRoot.append(container);
        itaFoodRoot && itaFoodRoot.append(paginationContainer);

        asiaFoodRoot && asiaFoodRoot.append(productFilters);
        asiaFoodRoot && asiaFoodRoot.append(container);
        asiaFoodRoot && asiaFoodRoot.append(paginationContainer);

        businessLunchRoot && businessLunchRoot.append(container);
        drawFiltration();
        drawSorting();
        pagination.load();


    } catch (reqStatus) {
        console.log(reqStatus);
    }
};



