'use strict';
var shop = {
  allItemsFull: [],
  cartNum: 0,
  fullPrice: 0,
  addItemToCart: function(e) {
    let price = parseInt(e.target.closest('.product-box__meta').querySelector('p').textContent);
    shop.fullPrice += price;
    shop.cartNum++;
    document.querySelector('#full-price').innerText = shop.fullPrice;
    document.querySelector('#cart-num').innerText = shop.cartNum;
  },
  chngQuantity: function() {
    shop.sortTable(
      document.getElementById('category-select').selectedIndex,
      document.getElementById('price-select').selectedIndex
    );
  },
  sortTable: function(category, price) {
    var arr_sort_result = [];
    var arr_sort_result2 = [];
    for (var i = 0; i < shop.allItemsFull.length; i++) {
      switch (price) {
        case 1:
          if (parseInt(shop.allItemsFull[i].querySelector('p').textContent) < 30) {
            arr_sort_result.push(shop.allItemsFull[i]);
          }
          break;
        case 2:
          if (parseInt(shop.allItemsFull[i].querySelector('p').textContent) < 50) {
            arr_sort_result.push(shop.allItemsFull[i]);
          }
          break;
        case 3:
          if (parseInt(shop.allItemsFull[i].querySelector('p').textContent) < 100) {
            arr_sort_result.push(shop.allItemsFull[i]);
          }
          break;
        case 4:
          if (parseInt(shop.allItemsFull[i].querySelector('p').textContent) < 150) {
            arr_sort_result.push(shop.allItemsFull[i]);
          }
          break;
        default:
          arr_sort_result = [ ...shop.allItemsFull ];
          break;
      }
    }
    arr_sort_result.forEach(function(item, i, arr) {
      switch (category) {
        case 0:
          arr_sort_result2 = [ ...arr_sort_result ];
          break;
        case 1:
          if (arr_sort_result[i].dataset.time === 'morning') {
            arr_sort_result2.push(arr_sort_result[i]);
          }
          break;
        case 2:
          if (arr_sort_result[i].dataset.time === 'first') {
            arr_sort_result2.push(arr_sort_result[i]);
          }
          break;
        case 3:
          if (arr_sort_result[i].dataset.time === 'garnir') {
            arr_sort_result2.push(arr_sort_result[i]);
          }
          break;
      }
    });
    document.getElementsByClassName('grid-box')[0].innerHTML = '';
    for (var i = 0; i < arr_sort_result2.length; i++) {
      document.getElementsByClassName('grid-box')[0].appendChild(arr_sort_result2[i]);
    }
  }
};

var modals = {
  modal: '',
  modalWindow: function() {
    modals.modal = document.createElement('div');
    modals.modal.className = 'modal';
    if (shop.fullPrice > 0) {
      modals.modal.insertAdjacentHTML(
        'afterBegin',
        '<form class="form"><p>Введите имя</p><input type="text" name="text"><p>Введите e-mail</p><input type="email" name="email"><button onclick="modals.toSend(event)">Отправить</button></form>'
      );
    } else {
      modals.modal.insertAdjacentHTML(
        'afterBegin',
        '<p>Выберите товар</p><button onclick="modals.toClose(event)">Закрыть</button>'
      );
    }
    document.body.insertBefore(modals.modal, document.body.getElementsByClassName('app-container')[0]);
  },
  toClose: function(event) {
    event.stopPropagation();
    modals.modal.remove();
  },
  toSend: function(event) {
    event.preventDefault();
    var name = document.getElementsByClassName('form')[0].elements[0].value;
    var value = document.getElementsByClassName('form')[0].elements[1].value;
    var reg = /\S/;
    if (reg.test(name) && reg.test(value)) {
      modals.modal.remove();
      shop.fullPrice = 0;
      shop.cartNum = 0;
      document.querySelector('#full-price').innerText = shop.fullPrice;
      document.querySelector('#cart-num').innerText = shop.cartNum;
      alert('Спасибо за покупку');
    } else {
      alert('Заполните все поля!');
    }
  }
};

document.querySelector('#full-price').innerText = shop.fullPrice;
document.querySelector('#cart-num').innerText = shop.cartNum;
let buttons = document.querySelectorAll('.product-box__btn');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', shop.addItemToCart, false);
}
/*selects*/
shop.allItemsFull = document.getElementsByClassName('product-box__item');
shop.allItemsFull = [ ...shop.allItemsFull ];
document.getElementById('category-select').addEventListener('change', shop.chngQuantity, false);
document.getElementById('price-select').addEventListener('change', shop.chngQuantity, false);
/*modal*/
document.getElementsByClassName('btn-check')[0].addEventListener('click', modals.modalWindow, false);
