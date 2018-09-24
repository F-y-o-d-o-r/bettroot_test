(function () {
  'use strict';
  // As i understand you want to declare a class, but using its naming "shop" not this it is anti-pattern!
  // also you use 2 type of making class with function and where you return object 
  // better to select one
  // better to do smth like that
  // and here should be only logic
  // all getting values by querySelector shouldn`t be in class
  var shop = {
    //first should be variables after functions
    allItemsFull: [],
    cartNum: 0,
    fullPrice: 0,
    addItemToCart: function (e) {
      let price = parseInt(e.target.closest('.product-box__meta').querySelector('p').textContent);
      shop.fullPrice += price;
      shop.cartNum++;
      // Also you can get quantity of products and multipy it, or show error if it is unvalid
      document.querySelector('#full-price').innerText = shop.fullPrice;
      document.querySelector('#cart-num').innerText = shop.cartNum;
    },
    //use better name here
    chng: function () {
      shop.sortTable(
        // Advise kategory-select not the best name, neme with english not translit
        document.getElementById('kategory-select').selectedIndex,
        document.getElementById('price-select').selectedIndex
      );
    },
    // Advise kategory not the best name, neme with english not translit
    sortTable: function (kategory, price) {
      var arr_sort = [];
      // you can have only 1 addition array
      var arr_sort_result = [];
      var arr_sort_result2 = [];
      // for what you declare a new array with same parameters in allItemsFull
      // if you don`t change it
      for (var i = 0; i < shop.allItemsFull.length; i++) {
        arr_sort[i] = shop.allItemsFull[i];
      }
      /*kategory sort*/
      // may be it is better to do it with Array.prototype.filter() 
      arr_sort.forEach(function (item, i, arr) {
        // it is better to send value of price not the index so you will have the similar logic for all
        // and don`t use switch for it
        switch (price) {
          case 1:
            if (parseInt(item.querySelector('p').textContent) < 30) {
              arr_sort_result.push(item);
            }
            break;
          case 2:
            if (parseInt(item.querySelector('p').textContent) < 50) {
              arr_sort_result.push(item);
            }
            break;
          case 3:
            if (parseInt(item.querySelector('p').textContent) < 100) {
              arr_sort_result.push(item);
            }
            break;
          case 4:
            if (parseInt(item.querySelector('p').textContent) < 150) {
              arr_sort_result.push(item);
            }
            break;
          default:
            arr_sort_result = [...shop.allItemsFull];
            break;
        }
      });
      arr_sort_result.forEach(function (item, i, arr) {
        // it is better to send value of category not the index so you will have the similar logic for all
        // and don`t use switch for it
        switch (kategory) {
          case 0:
            arr_sort_result2 = [...arr_sort_result];
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
    },
    // i think it shoul be another class for modal, it shouldn`t be in shop
    // or another dunction and you shouldn`t contain it in shop
    modal: '',
    modalWindow: function () {
      shop.modal = document.createElement('div');
      shop.modal.className = 'modal';
      //left css in css use js
      shop.modal.style.cssText =
        'z-index:10;background-color:#FF8C00;position: fixed;width: 50%; margin-left:50%;transform:translateX(-50%); margin-top:20%;';
      if (shop.fullPrice > 0) {
        // don`t use innerHTML BAD practice
        shop.modal.innerHTML =
          '<form><p>Введите имя</p><input type="text" name="text"><p>Введите e-mail</p><input type="email" name="email"><button onclick="shop.toSend(event)">Отправить</button></form>';
      } else {
        shop.modal.innerHTML = '<p>Выберите товар</p><button onclick="shop.toClose(event)">Закрыть</button>';
      }
      document.body.insertBefore(shop.modal, document.body.getElementsByClassName('app-container')[0]);
    },
    toClose: function (event) {
      event.stopPropagation();
      shop.modal.remove();
    },
    toSend: function (event) {
      event.preventDefault();
      //better to get forms by clas or closest
      var name = document.forms[0].elements[0].value;
      var value = document.forms[0].elements[1].value;
      var reg = /\S/;
      if (reg.test(name) && reg.test(value)) {
        shop.modal.remove();
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

  // does it work for you ?
  // document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#full-price').innerText = shop.fullPrice;
    document.querySelector('#cart-num').innerText = shop.cartNum;
    let buttons = document.querySelectorAll('.product-box__btn');


    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', shop.addItemToCart, false);
    }
    /*selects*/
    shop.allItemsFull = document.getElementsByClassName('product-box__item');
    shop.allItemsFull = [...shop.allItemsFull];
    document.getElementById('kategory-select').addEventListener('change', shop.chng, false);
    document.getElementById('price-select').addEventListener('change', shop.chng, false);
    /*modal*/
    document.getElementsByClassName('btn-check')[0].addEventListener('click', shop.modalWindow, false);
  // });
})();