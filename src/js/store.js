require("@babel/polyfill");
import {PRODUCTS} from "./displayData";

const CART = {
    KEY: 'cartItems',
    contents: [],
    init() {
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id) {
        let match = CART.contents.filter(item => {
            if (item.id === id)
                return true;
        });
        if (match && match[0])
            return match[0];
    },
    add(id) {
        if (CART.find(id)) {
            CART.increase(id, 1);
        } else {
            let arr = PRODUCTS.filter(product => {
                if (product.id === id) {
                    return true;
                }
            });
            console.log(arr);
            console.log(arr[0]);
            if (arr && arr[0]) {

                let obj = {
                    id: arr[0].id,
                    title: arr[0].name,
                    qty: 1,
                    itemPrice: arr[0].price,
                    itemImg: arr[0].photo
                };
                CART.contents.push(obj);
                CART.sync();
            } else {
                console.error('Invalid Product');
            }
        }
    },
    increase(id, qty = 1) {
        CART.contents = CART.contents.map(item => {
            if (item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        CART.sync()
    },
    reduce(id, qty = 1) {
        CART.contents = CART.contents.map(item => {
            if (item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        CART.contents.forEach(async item => {
            if (item.id === id && item.qty === 0)
                await CART.remove(id);
        });
        CART.sync()
    },
    remove(id) {
        CART.contents = CART.contents.filter(item => {
            if (item.id !== id) {
                return true;
            }
        });
        CART.sync()
    },
    empty() {
        CART.contents = [];
        CART.sync()
    },
    sort(field = 'title') {
        let sorted = CART.contents.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < a[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return sorted;
    },
    logContents(prefix) {
        console.log(prefix, CART.contents)
    }
};

const singleItem = {
    key: 'singleItems',
    content: [],
    init() {
        let _contents = localStorage.getItem(singleItem.key);
        if (_contents) {
            CART.content = JSON.parse(_contents);
        }
    },
    async sync() {
        let _cart = JSON.stringify(singleItem.content);
        await localStorage.setItem(singleItem.key, _cart);
    },
    add(arr) {
        singleItem.content =[];
        singleItem.content = arr;
        singleItem.sync();
    },
};

export {CART, singleItem}