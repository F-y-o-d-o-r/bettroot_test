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
      if (document.getElementById('kategory-select').selectedIndex !== 0) {
        shop.sortTable1(document.getElementById('kategory-select').selectedIndex);
      }
      if (document.getElementById('price-select').selectedIndex !== 0) {
        shop.sortTable2(document.getElementById('price-select').selectedIndex);
      }
    },
    allItemsFull: [],
    sortTable1: function() {
      var allItems = document.getElementsByClassName('product-box__item');
      var arr_sort = new Array();
      for (var i = 0; i < allItems.length; i++) {
        arr_sort[i] = allItems[i];
      }
    },
    sortTable2: function(num) {
      var arr_sort = new Array();
      var arr_sort_result = new Array();
      for (var i = 0; i < shop.allItemsFull.length; i++) {
        arr_sort[i] = shop.allItemsFull[i];
      }
      arr_sort.sort(sortTr);

      function sortTr(tr1) {
        switch (num) {
          case 1:
            if (parseInt(tr1.querySelector('p').textContent) < 30) {
              arr_sort_result.push(tr1);
            }
            break;
          case 2:
            if (parseInt(tr1.querySelector('p').textContent) < 50) {
              arr_sort_result.push(tr1);
            }
            break;
          case 3:
            if (parseInt(tr1.querySelector('p').textContent) < 100) {
              arr_sort_result.push(tr1);
            }
            break;
          case 4:
            if (parseInt(tr1.querySelector('p').textContent) < 150) {
              arr_sort_result.push(tr1);
            }
            break;
          // default:
          //   console.log(0);
          //   break;
        }
      }
      document.getElementsByClassName('grid-box')[0].innerHTML = '';
      for (var i = 1; i < arr_sort_result.length; i++) {
        document.getElementsByClassName('grid-box')[0].appendChild(arr_sort_result[i]);
        //console.log(arr_sort_result[i]);
      }
    }
    // func_go: function(seats_count) {
    //   var r = /^\d+$/;
    //   if (r.test(seats_count) && seats_count !== '') {
    //     $('#not_number').css('visibility', 'hidden');
    //     if ($(':input[name="rd"]:checked').val() === 'Create') {
    //       cinema.func_create(seats_count);
    //     } else if (r.test(seats_count) && seats_count !== '') {
    //       cinema.func_select(seats_count);
    //     }
    //   } else $('#not_number').css('visibility', 'visible');
    // },
    // func_create: function(seats_count) {
    //   var el_tbody = $('#tbody');
    //   $(el_tbody).html('');
    //   var el_tr = '';
    //   var el_td = '';
    //   for (var i = 1; i <= seats_count; i++) {
    //     if (i % cinema.x !== 0) {
    //       //При создании мест они выстаивались бы не в одну строку, а были бы «разделены» на «десятки»
    //       el_td += "<td value = '0'>" + i + '</td>';
    //     } else {
    //       el_td += "<td value = '0'>" + i + '</td>';
    //       el_tr = '<tr>' + el_td + '</tr>';
    //       $(el_tbody).append(el_tr);
    //       el_td = '';
    //     }
    //   }
    //   el_tr = '<tr>' + el_td + '</tr>';
    //   $(el_tbody).append(el_tr);
    // },
    // func_select: function(seats_count) {
    //   cinema.func_free();
    //   cinema.func_seats_select(seats_count);
    // },
    // func_free: function() {
    //   arr_free = new Array();
    //   count_free = 0;
    //   $('td').each(function() {
    //     if ($(this).attr('value') === '0') {
    //       arr_free[count_free] = this;
    //       count_free++;
    //     }
    //   });
    // },
    // func_seats_select: function(seats_count) {
    //   if (seats_count <= arr_free.length) {
    //     $('#not_enough').css('visibility', 'hidden');
    //     cinema.count_free = Math.floor(Math.random() * arr_free.length);
    //     for (var i = 0; i < seats_count; i++) {
    //       $(arr_free[cinema.count_free]).css('background-color', 'red');
    //       $(arr_free[cinema.count_free]).attr('value', '1');
    //       arr_free.splice(cinema.count_free, 1);
    //       cinema.count_free = Math.floor(Math.random() * arr_free.length);
    //     }
    //   } else {
    //     $('#not_enough').css('visibility', 'visible');
    //   }
    // },
    // //arr_free: new Array(),
    // count_free: 0,
    // x: 10 //кол-во в строке элементов
  };
})();
