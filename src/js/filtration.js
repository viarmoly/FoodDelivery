import {pagination} from "./pagination";

export function drawFiltration() {

    let drinks = document.getElementById('drinks');
    if (drinks) {
        let filtration = document.getElementById('filters');

        let catalogFilters = document.createElement('div');
        catalogFilters.className = 'product-filters';

        let productFilter = document.createElement('div');
        productFilter.className = 'product-filter';

        let filterLabel = document.createElement('label');
        filterLabel.setAttribute('for', 'filter');
        filterLabel.innerText = 'Фильтровать: ';

        let filterSelectBlock = document.createElement('select');
        filterSelectBlock.setAttribute('id', 'filter');
        filterSelectBlock.setAttribute('name', 'filterProducts');
        filterSelectBlock.addEventListener('change', makeFiltration);

        let allFilter = document.createElement('option');
        allFilter.setAttribute('value', 'all');
        allFilter.innerText = 'Все';
        filterSelectBlock.appendChild(allFilter);

        let waterFilter = document.createElement('option');
        waterFilter.setAttribute('value', 'water');
        waterFilter.innerText = 'Минеральная вода';
        filterSelectBlock.appendChild(waterFilter);

        let energyFilter = document.createElement('option');
        energyFilter.setAttribute('value', 'energy');
        energyFilter.innerText = 'Енергетики';
        filterSelectBlock.appendChild(energyFilter);

        let sweetFilter = document.createElement('option');
        sweetFilter.setAttribute('value', 'sweet');
        sweetFilter.innerText = 'Газировка вода';
        filterSelectBlock.appendChild(sweetFilter);

        let alcoholFilter = document.createElement('option');
        alcoholFilter.setAttribute('value', 'alcohol');
        alcoholFilter.innerText = 'Алкогольные напитки';
        filterSelectBlock.appendChild(alcoholFilter);

        productFilter.appendChild(filterLabel);
        productFilter.appendChild(filterSelectBlock);

        catalogFilters.appendChild(productFilter);
        filtration.appendChild(catalogFilters);
    }
}

function makeFiltration() {
    let value = document.getElementById('filter').value;
    let list = pagination.list;

    if (value === 'all') {
        makeFullFiltration(list);
        pagination.load()
    }
    if (value === 'water') {
        makeWaterFiltration(list);
        pagination.remove();
    }
    if (value === 'energy') {
        makeEnergyFiltration(list);
        pagination.remove();
    }
    if (value === 'sweet') {
        makeSweetFiltration(list);
        pagination.remove();
    }
    if (value === 'alcohol') {
        makeAlcoholFiltration(list);
        pagination.remove();
    }
}

function makeWaterFiltration(list) {
    let container = document.getElementById('container');
    list.forEach(item => {
        container.appendChild(item);
        let type = item.getAttribute('prod-type');
        item.style.display = 'block';
        if (type !== 'water') {
            item.style.display = 'none';
        }
    });
}

function makeFullFiltration(list) {
    list.forEach(item => {
        item.style.display = 'block';
    });
}

function makeEnergyFiltration(list) {
    let container = document.getElementById('container');
    list.forEach(item => {
        container.appendChild(item);
        let type = item.getAttribute('prod-type');
        item.style.display = 'block';
        if (type !== 'energy') {
            item.style.display = 'none';
        }
    });
}

function makeSweetFiltration(list) {
    let container = document.getElementById('container');
    list.forEach(item => {
        container.appendChild(item);
        let type = item.getAttribute('prod-type');
        item.style.display = 'block';
        if (type !== 'sweet') {
            item.style.display = 'none';
        }
    });
}

function makeAlcoholFiltration(list) {
    let container = document.getElementById('container');
    list.forEach(item => {
        container.appendChild(item);
        let type = item.getAttribute('prod-type');
        item.style.display = 'block';
        if (type !== 'alcohol') {
            item.style.display = 'none';
        }
    });
}