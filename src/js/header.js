import {CART} from './store.js'
import {carouselOnload} from "./carousel";
import {searching, showInputField} from "./search";

window.onload = function () {
    headerLoad();
    carouselOnload();
};

export function showHeader(){
    let products = CART.sort('qty');
    let money = 0;
    let itemQty = 0;
    if(products.length>=1){
        products.map(item => money += item.itemPrice * item.qty);
        products.map(item => itemQty += item.qty);
    }
    return `
    <nav class="container">
        <div id="logo"><a class="logo" href="./index.html">FoodHub</a></div>
        <div class="header-links">
            <div id="search">
                <form class="search-form" id="search-form">
                    <a href="#" id="show-input" class="show-btn"><i class="fa fa-search"></i></a>
                    <a href="#" id="submit-link" class="search-btn"><i class="fa fa-search"></i></a>
                    <input type="text" name="search-form-field" id="search-form-field" placeholder="Поиск">
                    <span class="close-field">&times;</span>
                </form>
            </div>
            <label for="drop" class="toggle top-menu"><i class="fas fa-2x fa-bars"></i></label>
            <input type="checkbox" id="drop"/>
            <ul class="menu">
                <li>
                    <label for="drop-1" class="toggle triangle">Меню
                        <i class="fas fa-1x fa-sort-down"></i>
                    </label>
                    <a class="triangle" href="#">Меню
                        <i class="fas fa-1x fa-sort-down"></i>
                    </a>
                    <input type="checkbox" id="drop-1"/>
                    <ul>
                        <li><a href="./salads.html">Салаты</a></li>
                        <li><a href="./soups.html">Супы</a></li>
                        <li><a href="./hotmeals.html">Горячие блюда</a></li>
                        <li><a href="./drinks.html">Напитки</a></li>
                    </ul>
                </li>
                <li>
                    <label for="drop-2" class="toggle triangle">Кухня
                        <i class="fas fa-1x fa-sort-down"></i>
                    </label>
                    <a class="triangle" href="#">Кухня
                        <i class="fas fa-1x fa-sort-down"></i>
                    </a>
                    <input type="checkbox" id="drop-2"/>
                    <ul>
                        <li><a href="./asian_food.html">Азиатская кухня</a></li>
                        <li><a href="./italian_food.html">Итальянская кухня</a></li>
                        <li><a href="./ukrainian_food.html">Украинская кухня</a></li>
                    </ul>
                </li>
                <li><a href="./business_lunch.html">Бизнес ланч</a></li>
                <li><a href="./contacts.html">Контакты</a></li>
            </ul>
            
            <div id="header-cart" class="header-cart">
                <a href="./cart.html">
                    <i class="fas fa-1x fa-shopping-basket"></i>
                    <span class="header-cart-items">${itemQty}</span>
                    <span class="header-cart-price">${money} грн</span>
                </a>
            </div>
        </div>
    </nav>
    `
}

export function incrementHeaderData() {
    let products = CART.sort('qty');
    let money = 0;
    let itemQty = 0;
    products.map(item => money += item.itemPrice * item.qty);
    products.map(item => itemQty += item.qty);
    let controls = document.getElementById('header-cart');
    let price = controls.querySelector('a span.header-cart-price');
    let item = controls.querySelector('a span.header-cart-items');
    price.textContent = `${money} грн`;
    item.textContent = `${itemQty}`;
}

export function headerLoad() {
    CART.init();
    document.getElementById('header').innerHTML = `${showHeader()}`;
    document.getElementById('show-input').addEventListener('click', showInputField);
    document.getElementById('search-form-field').addEventListener('keyup', searching);
}