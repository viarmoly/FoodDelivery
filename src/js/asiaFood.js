let request = new XMLHttpRequest();

request.open('GET', './data/db.json', true);

request.onload = function () {
    let food = JSON.parse(this.response);
    displayItems(food);
};

request.send();


function itemTemplate(item) {
    let itemName = item.name;
    let ingredients = item.ingredients.join(", ");

    if (item.name.length > 24) {
        itemName = itemName.substring(0, 24).concat('...');
    }
    if (ingredients.length > 70) {
        ingredients = ingredients.substring(0, 70).concat('...');
    }
    if (item.cuisine === "asian") {
        return `
        <div class="menu-item">
        <a class="link-menu-item" href="">
            <img class="menu-item-photo" src="${item.photo}" alt="">
            <h2 class="menu-title">${itemName}</h2>
            <p class="menu-item-weight">${item.weight}</p>
            <p class="menu-item-ingredients">${ingredients}</p>
            <p class="menu-item-price">${item.price}</p>
        </a>
            
        </div>

    
    `
    }
}

function displayItems(food) {
    return document.getElementById("asia-food").innerHTML = `
    ${food.map(itemTemplate).join('')}
`;
}






