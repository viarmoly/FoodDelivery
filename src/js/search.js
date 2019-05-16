import {PRODUCTS} from "./displayData";
import {singleItem} from "./store";

export function showInputField(ev){
    ev.preventDefault();
    let field = document.getElementById('search-form-field');
    let span = document.getElementById('search-form-field').nextElementSibling;
    let subBtn = document.getElementById('submit-link');
    let showBtn = document.getElementById('show-input');
    field.style.display = 'block';
    span.style.display = 'block';
    subBtn.style.display = 'block';
    showBtn.style.display = 'none';

    span.addEventListener('click',function(){
        field.style.display = 'none';
        span.style.display = 'none';
        subBtn.style.display = 'none';
        showBtn.style.display = 'block';
    })
}


export function searching(ev){
    let searchResult = [];
    searchResult =[];
    let value = ev.target.value.toLowerCase();
    PRODUCTS.forEach( item =>{
        let title = item.name;
        if(title.toLowerCase().indexOf(value) !== -1 && value.length >= 1){
            searchResult.push(item);
        }
    });
    document.getElementById('submit-link').addEventListener('click',function(){
        singleItem.add(searchResult);
        window.open("http://localhost:3000/singleProduct.html","_self")
    });

    document.getElementById('search-form-field').addEventListener('keypress',function(ev){
        if(ev.key === 'Enter'){
            singleItem.add(searchResult);
            window.open("http://localhost:3000/singleProduct.html","_self")
        }
    });
}