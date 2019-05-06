import {CART} from './store.js'

window.onload = function () {
    CART.init();
    showCart();
};

function showCart() {
    let cartSection = document.getElementById('cart');
    let section = CART.sort('qty');
    section.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        let img = document.createElement('img');
        img.alt = item.name;
        img.src = item.itemImg;
        img.className = 'cart-item-img';
        cartItem.appendChild(img);

        let title = document.createElement('div');
        title.textContent = item.title;
        title.className = 'cart-item-title';
        cartItem.appendChild(title);

        let price = document.createElement('div');
        price.className = 'cart-item-price';
        price.textContent = `${item.itemPrice} грн`;
        cartItem.appendChild(price);

        let controls = document.createElement('div');
        controls.className = 'card-item-control';
        cartItem.appendChild(controls);

        let plus = document.createElement('i');
        plus.className = 'fas fa-1x fa-plus';
        plus.textContent = '';
        plus.setAttribute('data-id', item.id);
        controls.appendChild(plus);
        plus.addEventListener('click', incrementCart);

        let qty = document.createElement('span');
        qty.textContent = item.qty;
        controls.appendChild(qty);

        let minus = document.createElement('i');
        minus.className = 'fas fa-1x fa-minus';
        minus.textContent = '';
        minus.setAttribute('data-id', item.id);
        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart);

        let sumPrice = document.createElement('div');
        sumPrice.className = 'cart-item-sum';
        sumPrice.textContent = `${item.qty * item.itemPrice} грн`;
        cartItem.appendChild(sumPrice);

        let remove = document.createElement("a");
        remove.className = 'cart-item-remove';
        remove.textContent = '';
        remove.setAttribute('data-id', item.id);
        remove.addEventListener('click', removeCart);
        cartItem.appendChild(remove);

        let removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-1x fa-times-circle';
        remove.appendChild(removeIcon);

        cartSection.append(cartItem);
    });

    let moneyQty = 0;
    section.map(item => moneyQty += item.itemPrice * item.qty);

    let itemQty = 0;
    section.map(item => itemQty += item.qty);

    let cartFooter = document.createElement('div');
    cartFooter.className = 'card-footer-container';

    let finalQty = document.createElement('span');
    finalQty.textContent = `В корзине ${itemQty} товаров`;
    cartFooter.appendChild(finalQty);

    let finalSum = document.createElement('div');
    finalSum.className = 'cart-final-sum';
    cartFooter.appendChild(finalSum);
    finalSum.textContent = 'Сума за все товары';

    let fullSum = document.createElement('span');
    fullSum.textContent = `${moneyQty} грн`;
    finalSum.appendChild(fullSum);
    cartSection.appendChild(cartFooter);

    let divBtn = document.createElement('div');
    divBtn.className = 'cart-sub-btn';
    let orderButton = document.createElement('a');
    orderButton.className = 'cart-sub-btn';
    orderButton.textContent = 'Оформить заказ';
orderButton.addEventListener('click', disableCartBtn);
    orderButton.href = './form.html';
    divBtn.appendChild(orderButton);

    cartSection.appendChild(divBtn);
}

function incrementCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.increase(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    let price = ev.target.parentElement.nextSibling;
    if (item) {
        let cost = `${item.qty * item.itemPrice} грн`;
        qty.textContent = item.qty;
        price.textContent = cost;
        showItems(ev);
        fullPriceIncrement(ev);
    } else {
        document.getElementById('cart').removeChild(controls.parentElement);
    }
}

function decrementCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.reduce(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    let price = ev.target.parentElement.nextSibling;
    if (item) {
        let cost = `${item.qty * item.itemPrice} грн`;
        qty.textContent = item.qty;
        price.textContent = cost;
        showItems(ev);
        fullPriceIncrement(ev);
    } else {
        showItems(ev);
        fullPriceIncrement(ev);
        document.getElementById('cart').removeChild(controls.parentElement);
    }
}

function removeCart(ev) {
    ev.preventDefault();
    let id = parseInt(ev.currentTarget.getAttribute('data-id'));
    CART.remove(id);
    let controls = ev.target.parentElement.parentElement;
    showItems(ev);
    fullPriceIncrement(ev);
    document.getElementById('cart').removeChild(controls);
}

function fullPriceIncrement(ev) {
    let products = CART.sort('qty');
    let money = 0;
    products.map(item => money += item.itemPrice * item.qty);
    let controls = ev.target.parentElement.parentElement.parentElement;
    let price = controls.querySelector('div.card-footer-container div.cart-final-sum span');
    price.textContent = `${money} грн`;
}

function showItems(ev) {
    let products = CART.sort('qty');
    let itemQty = 0;
    products.map(item => itemQty += item.qty);
    let controls = ev.target.parentElement.parentElement.parentElement;
    let item = controls.querySelector('div.card-footer-container span');
    item.textContent = `В корзине ${itemQty} товаров`;
}

//
function disableCartBtn(ev){
    let products = CART.sort('qty');
    if (products.length === 0){
        ev.preventDefault();
    }
}
export {showCart}



