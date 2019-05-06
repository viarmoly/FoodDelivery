import {} from "./displayData";
import {sendAjaxRequest} from "./displayData";

window.onload = async function () {
    try {
        let data = await sendAjaxRequest('GET', './data/db.json');
        const items = JSON.parse(data);
        const container = document.createElement('div');
        container.classList.add('container-menu-item');
        const productRoot = document.getElementById('single-prod');
        let product = JSON.parse(window.localStorage.getItem('singleItems'));
        console.log(product[0].id);
        items.forEach(item => {
                if (item.id === product[0].id) {
                    console.log(item);
                    const productSection = showSingleProduct(item);
                    container.append(productSection);
                }
            }
        );
        productRoot && productRoot.append(container);
    } catch (reqStatus) {
        console.log(reqStatus);
    }

};

function showSingleProduct(item) {

}