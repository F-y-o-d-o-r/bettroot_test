var shop = (function() {
  document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('#full-price').innerText = shop.fullPrice;
    document.querySelector('#cart-num').innerText = shop.cartNum;
    let buttons = document.querySelectorAll('.product-box__btn');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', shop.addItemToCart, false);
    }
    /*selects*/
    shop.allItemsFull = document.getElementsByClassName('product-box__item');
    shop.allItemsFull = [ ...shop.allItemsFull ];
    document.getElementById('kategory-select').addEventListener('change', shop.chng, false);
    document.getElementById('price-select').addEventListener('change', shop.chng, false);
    /*modal*/
    document.getElementsByClassName('btn-check')[0].addEventListener('click', shop.modalWindow, false);
  });

  return {
    addItemToCart: function(e) {
      let price = parseInt(e.target.closest('.product-box__meta').querySelector('p').textContent);
      shop.fullPrice += price;
      shop.cartNum++;
      document.querySelector('#full-price').innerText = shop.fullPrice;
      document.querySelector('#cart-num').innerText = shop.cartNum;
    },
    fullPrice: 0,
    cartNum: 0,
    chng: function() {
      shop.sortTable(
        document.getElementById('kategory-select').selectedIndex,
        document.getElementById('price-select').selectedIndex
      );
    },
    allItemsFull: [],
    sortTable: function(kategory, price) {
      var arr_sort = [];
      var arr_sort_result = [];
      for (var i = 0; i < shop.allItemsFull.length; i++) {
        arr_sort[i] = shop.allItemsFull[i];
      }
      /*kategory sort*/
      arr_sort.forEach(function(item, i, arr) {
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
            arr_sort_result = [ ...shop.allItemsFull ];
            break;
        }
      });
      arr_sort_result2 = [];
      arr_sort_result.forEach(function(item, i, arr) {
        switch (kategory) {
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
    },
    modal: '',
    modalWindow: function() {
      shop.modal = document.createElement('div');
      shop.modal.className = 'modal';
      shop.modal.style.cssText =
        'z-index:10;background-color:#FF8C00;position: fixed;width: 50%; margin-left:50%;transform:translateX(-50%); margin-top:20%;';
      if (shop.fullPrice > 0) {
        shop.modal.innerHTML =
          '<form><p>Введите имя</p><input type="text" name="text"><p>Введите e-mail</p><input type="email" name="email"><button onclick="shop.toSend(event)">Отправить</button></form>';
      } else {
        shop.modal.innerHTML = '<p>Выберите товар</p><button onclick="shop.toClose(event)">Закрыть</button>';
      }
      document.body.insertBefore(shop.modal, document.body.getElementsByClassName('app-container')[0]);
    },
    toClose: function(event) {
      event.stopPropagation();
      shop.modal.remove();
    },
    toSend: function(event) {
      event.preventDefault();
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
})();
