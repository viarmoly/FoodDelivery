import {pagination} from "./pagination";

export function drawSorting() {
    let sorting = document.getElementById('filters');

    let catalogFilters = document.createElement('div');
    catalogFilters.className = 'catalog-filters';

    let sortFilters = document.createElement('div');
    sortFilters.className = 'sort-filter';

    let sortLabel = document.createElement('label');
    sortLabel.setAttribute('for', 'sort');
    sortLabel.innerText = 'Сортировать по :';

    let sortSelectBlock = document.createElement('select');
    sortSelectBlock.setAttribute('id', 'sort');
    sortSelectBlock.setAttribute('name', 'sortProducts');
    sortSelectBlock.addEventListener('change', makeSorting);

    let sortByDescendingPrice = document.createElement('option');
    sortByDescendingPrice.setAttribute('value', 'descending');
    sortByDescendingPrice.innerText = 'по убыванию цены';
    sortSelectBlock.appendChild(sortByDescendingPrice);

    let sortByAscendingPrice = document.createElement('option');
    sortByAscendingPrice.setAttribute('value', 'ascending');
    sortByAscendingPrice.innerText = 'по возростанию цены';
    sortSelectBlock.appendChild(sortByAscendingPrice);

    let sortAlphabet = document.createElement('option');
    sortAlphabet.setAttribute('value', 'alphabet');
    sortAlphabet.innerText = 'по алфавиту';
    sortSelectBlock.appendChild(sortAlphabet);

    sortFilters.appendChild(sortLabel);
    sortFilters.appendChild(sortSelectBlock);

    catalogFilters.appendChild(sortFilters);
    sorting.appendChild(catalogFilters);
}

function makeSorting(){
    let value = document.getElementById('sort').value;
    console.log(value);
    if(value === 'ascending' ){
        makeAscendingSorting();
    }
    if(value === 'descending'){
        makeDescendingSorting();
    }
    if(value === 'alphabet'){
        makeAlphabetSorting();
    }
}

function makeAscendingSorting() {
    let container = document.getElementById('container');
    let list = pagination.list;

    for (let i = 0; i < list.length - 1; i++) {
        let change = false;
        for (let j = 0; j < list.length - (i + 1); j++) {
            let a = parseFloat(list[j].querySelector('div.sm-div p.menu-item-price').textContent);
            let b = parseFloat(list[j + 1].querySelector('div.sm-div p.menu-item-price').textContent);
            if (a > b) {
                change = true;
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
            }
        }
        if(!change) break;
    }

    container.innerHTML = '';
    list.forEach(item => {
        container.appendChild(item);
    });
    pagination.load();
}

function makeDescendingSorting() {
    let container = document.getElementById('container');
    let list = pagination.list;

    for (let i = 0; i < list.length - 1; i++) {
        let change = false;

        for (let j = 0; j < list.length - (i + 1); j++) {
            let a = parseFloat(list[j].querySelector('div.sm-div p.menu-item-price').textContent);
            let b = parseFloat(list[j + 1].querySelector('div.sm-div p.menu-item-price').textContent);
            if (a < b) {
                change = true;
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
            }
        }
        if(!change) break;
    }
    container.innerHTML = '';
    list.forEach(item => {
        container.appendChild(item);
    });
    pagination.load();
}

function makeAlphabetSorting() {
    let container = document.getElementById('container');
    let list = pagination.list;

    for (let i = 0; i < list.length - 1; i++) {
        let change = false;


        for (let j = 0; j < list.length - (i + 1); j++) {
            let a = list[j].querySelector('div.sm-div h2.menu-title').textContent.toLowerCase();
            let b = list[j + 1].querySelector('div.sm-div h2.menu-title').textContent.toLowerCase();
            if (a > b) {
                change = true;
                [list[j], list[j + 1]] = [list[j + 1], list[j]];
            }
        }
        if(!change) break;
    }
    container.innerHTML = '';
    list.forEach(item => {
        container.appendChild(item);
    });
    pagination.load();
}