import {PRODUCTS, sendAjaxRequest} from "./displayData";
import {CART} from "./store";
import {headerLoad} from "./header";
import {pagination} from "./pagination";
import {displayItems} from "./displayItems";

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

        const productRoot = document.getElementById('single-prod');
        let product = JSON.parse(window.localStorage.getItem('singleItems'));
        if(product.length >= 1){
            product.forEach((item) => {
                if(item.type !== "business-lunch"){
                const productSection = displayItems(item);
                container.append(productSection);
                }
            });
            productRoot && productRoot.append(container);
            productRoot && productRoot.append(paginationContainer);
            pagination.load();

        } else {
            const errorSection = displayError();
            container.append(errorSection);
            productRoot && productRoot.append(container);
        }


    } catch (reqStatus) {
        console.log(reqStatus);
    }
};

function displayError(){
    return`
    
    По вашему поиску ничего не найдено!
    `
}