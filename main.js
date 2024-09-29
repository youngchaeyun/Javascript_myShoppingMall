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
    paymentWindow.document.write(

    )
}
