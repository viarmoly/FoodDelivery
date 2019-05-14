import {displayItems, PRODUCTS, sendAjaxRequest} from "./displayData";
import {CART} from "./store";
import {headerLoad} from "./header";

window.onload = async function () {
    CART.init();
    headerLoad();
    try {
        let data = await sendAjaxRequest('GET', './data/db.json');
        const items = JSON.parse(data);
        PRODUCTS.push(...items);
        const container = document.createElement('div');
        container.classList.add('container-menu-item');
        const productRoot = document.getElementById('single-prod');
        let product = JSON.parse(window.localStorage.getItem('singleItems'));
        if(product.length >= 1){
            product.forEach((item) => {
                const productSection = displayItems(item);
                container.append(productSection);
            })

        } else {
            const errorSection = displayError()
            container.append(errorSection);
        }
        productRoot && productRoot.append(container);

    } catch (reqStatus) {
        console.log(reqStatus);
    }
};

function displayError(){
    return`
    По вашему поиску ничего не найдено!
    `
}