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

const productListEl = document.getElementById('product-list');
const selectedProductsEl = document.getElementById('selected-products');
const totalPriceEl = document.getElementById('total-price');
const payButton = document.getElementById('pay-button');

// 상품 목록을 화면에 출력
products.forEach((product, index) => {
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `product-${index}`;
    checkbox.value = product.name;
    checkbox.addEventListener('change', function() {
        toggleProductSelection(product, this.checked);
    });

    let label = document.createElement('label');
    label.htmlFor = `product-${index}`;
    label.textContent = `${product.name} - ${product.price} 원`;

    li.appendChild(checkbox);
    li.appendChild(label);
    productListEl.appendChild(li);
});

// 상품 선택/해제 시 동작
function toggleProductSelection(product, isChecked) {
    if (isChecked) {
        selectedProducts.push(product);
    } else {
        selectedProducts = selectedProducts.filter(p => p.name !== product.name);
    }
    updateSelectedProducts();
}

// 선택한 상품 목록 및 총액 업데이트
function updateSelectedProducts() {
    selectedProductsEl.innerHTML = '';
    totalPrice = selectedProducts.reduce((sum, product) => sum + product.price, 0);

    selectedProducts.forEach(product => {
        let li = document.createElement('li');
        li.textContent = product.name;
        selectedProductsEl.appendChild(li);
    });

    totalPriceEl.textContent = `총액: ${totalPrice} 원`;
}

// 결제하기 버튼 클릭 시 동작
payButton.addEventListener('click', function() {
    if (selectedProducts.length === 0) {
        alert('결제할 상품을 선택해야 합니다.');
    } else {
        openPaymentWindow();
    }
});

// 결제창을 새 창으로 열기
function openPaymentWindow() {
    let paymentWindow = window.open('', '결제창', 'width=400,height=300');
    paymentWindow.document.write(`
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
                    window.opener.alert(cardNumber + ' 로 ${totalPrice} 원이 결제 완료 되었습니다.');
                    window.opener.resetSelection();
                    window.close();
                }
            });
        </script>
    `);
}

// 결제 후 화면 초기화
function resetSelection() {
    selectedProducts = [];
    totalPrice = 0;
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    updateSelectedProducts();
}