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

let productSelect = document.getElementById('product-select')
let selectedProducts1 = document.getElementById('selected-products')
let totalPrice1 = document.getElementById('total-price')
let payButton = document.getElementById('button')

