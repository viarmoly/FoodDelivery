
window.onload = function () {
    document.getElementById('phone').addEventListener('input',phoneMask);
};

export function showForm() {
    return `
    <div class="form-container">
    <form method="post" action="action.php" class="form">
            <label for="name" class="form-label">Имя</label>
            <input type="text" id="name" name="name" required class="cart-form-input">
            <label for="phone" class="form-label">Телефон</label>
            <input type="text" id="phone" name="phone" required class="cart-form-input">
            <label for="street" class="form-label">Улица</label>
            <input type="text" id="street" name="street" required class="cart-form-input">
            <div class="cart-adr-container">
                <div class="cart-adr-container__house">
                    <label for="house" class="form-label ">Дом</label>
                    <input type="text" id="house" name="house" required class="cart-form-input">
                </div>
                <div class="cart-adr-container__house">
                    <label for="flat" class="form-label ">Квартира</label>
                    <input type="text" id="flat" name="flat" required class="cart-form-input">
                </div>
            </div>
            <div class="form-payment-type">
                <label class="form-label">Способ оплаты</label>
                <ul class="form-payment-aplly">
                    <li>
                        <label for="cah-pay" class="pos">Наличными курьеру
                            <input type="radio" id="cah-pay" checked="checked" name="radio" value="1">
                            <span class="radio-btn"></span>
                        </label>
                    </li>
                    <li>
                        <label for="card-pay" class="pos">Картой курьеру
                            <input type="radio" id="card-pay" name="radio" value="2">
                            <span class="radio-btn"></span>
                        </label>
                    </li>
                </ul>
            </div>

            <label for="message" class="form-label">Коментарий</label>
            <textarea id="message" name="message" class="form__textarea"></textarea>
            <input id="submit-btn" type="submit" value="Send Message" class="form-sub-btn"/>
    </form>
    </div>
`
}

function phoneMask(ev) {
    let x = ev.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    ev.target.value = x[0].length === 0 ? '' : !x[2] ? '(' + x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
}


