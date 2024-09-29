"use strict";

function Product(name, price) {
    this.name = name;
    this.price = price;
}

let products = [
    new Product('대뱃살', 3000),
    new Product('목살', 5000),
    new Product('배꼽살', 4000),
    new Product('중뱃살', 1000)
];

let selectedProducts = [];
let totalPrice = 0;

let productSelect = document.getElementById('product-select');
let selectedProducts1 = document.getElementById('selected-products');
let totalPrice1 = document.getElementById('total-price');
let payButton = document.getElementById('button');

products.forEach((product) => {
    let option = document.createElement('option');
    option.value = product.name;
    option.textContent = `${product.name} - ${product.price} 원`;
    option.dataset.price = product.price;
    productSelect.appendChild(option);
});

productSelect.addEventListener('change', function () {
    let selectedOptions = [...this.selectedOptions];
    selectedProducts = selectedOptions.map(option => {
        return new Product(option.value, parseInt(option.dataset.price));
    });
    updateSelectedProducts();
});

function updateSelectedProducts() {
    selectedProducts1.innerHTML = '';
    totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

    selectedProducts.forEach(product => {
        let li = document.createElement('li');
        li.textContent = product.name;
        selectedProducts1.appendChild(li);
    });

    totalPrice1.textContent = `총액: ${totalPrice} 원`;
}

payButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (selectedProducts.length === 0) {
        alert('결제할 상품을 선택해야 합니다.');
    } else {
        openPaymentWindow();
    }
});

function openPaymentWindow() {
    let paymentWindow = window.open('', '결제창', 'width=400,height=300');
    paymentWindow.document.write(`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <title>결제창</title>
        </head>
        <body>
            <h1>결제창</h1>
            <p>${totalPrice} 원을 결제하겠습니다.</p>
            <p>신용카드 번호를 입력하고 결제 버튼을 눌러주세요.</p>
            <input type="text" id="card-number" placeholder="신용카드 번호">
            <button id="confirm-payment">결제</button>
            <script>
                document.getElementById('confirm-payment').addEventListener('click', function() {
                    let cardNumber = document.getElementById('card-number').value;
                    if (cardNumber === '') {
                        alert('신용카드 번호를 입력해야 합니다.');
                    } else {
                        window.opener.alert(cardNumber + '로 ' + ${totalPrice} + ' 원이 결제 완료 되었습니다.');
                        window.opener.resetSelection();
                        window.close();
                    }
                });
            <\/script>
        </body>
        </html>
    `)
}
