document.addEventListener("DOMContentLoaded", function () {

    // Fancybox
    Fancybox.bind("[data-fancybox]", {
      Thumbs: false,
    });

    // Рейтинг со звездами
    document.querySelectorAll('[data-rating]').forEach(wrapper => {
      const ratingValue = parseFloat(wrapper.getAttribute('data-rating')) || 0;
      const ratingActiveStars = wrapper.querySelector('.js-stars');

      if (ratingActiveStars) {
          const currentWidth = `${ratingValue * (100/5)}%`;
          ratingActiveStars.style.width = currentWidth;
      }
  })

// const toggleMenu = document.querySelector('menu-toggle');

// if (toggleMenu){
//     toggleMenu.addEventListener('click', function(){

//         if(this.classList.contains('active')){
//             this.classList.remove('active');
//         }else{
//             this.classList.add('active');
//         }
//     })
// }

  // SELECT
  // Полифилл для метода forEach для NodeList
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  const dropdowns = document.querySelectorAll('.dropdown');
  if (dropdowns.length > 0) {
    for (drop of dropdowns) {
      const dropDownBtn = drop.querySelector('.dropdown__button');
      const dropDownList = drop.querySelector('.dropdown__list');
      const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
      const dropDownInput = drop.querySelector('.dropdown__input-hidden');

      // клик по кнопке. Открыть/закрыть select
      dropDownBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const dropActive = document.querySelector('.dropdown__list--visible');
        if (dropActive) {
          dropActive.classList.remove('dropdown__list--visible');
        }
        if (this.classList.contains('dropdown__button--active')) {
          dropDownList.classList.remove('dropdown__list--visible');
          this.classList.remove('dropdown__button--active');
        } else {
          dropDownList.classList.add('dropdown__list--visible');
          this.classList.add('dropdown__button--active');
        }

      });

      // выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
      dropDownListItems.forEach(function (listItem) {
        listItem.addEventListener('click', function (e) {
          e.stopPropagation();
          dropDownBtn.querySelector('span').innerText = this.innerText;
          dropDownBtn.querySelector('span').classList.add('text-black');
          console.log(this.innerText);
          dropDownBtn.focus();
          dropDownInput.setAttribute('value', this.innerText);
          dropDownList.classList.remove('dropdown__list--visible');
          dropDownBtn.classList.remove('dropdown__button--active');
        });
      });

      // клик снаружи дропдауна. Закрыть дропдаун
      document.addEventListener('click', function (e) {
        if (e.target !== dropDownBtn) {
          dropDownBtn.classList.remove('dropdown__button--active');
          dropDownList.classList.remove('dropdown__list--visible');

        }
      });

      // нажатие на Tab или Escape. Закрыть дропдаун
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab' || e.key === 'Escape') {
          dropDownBtn.classList.remove('dropdown__button--active');
          dropDownList.classList.remove('dropdown__list--visible');
        }
      });
    }
  }

  /************************************* */

  // PRODUCTION slider

  const swiperProd = new Swiper('.production-slider', {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 0,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '#slider-next-prod',
      prevEl: '#slider-prev-prod',
    },
  });
  /************************************* */

  // TESTIMONIALS PHOTO slider

  const swiperTes = new Swiper('.testimonials-photo-slider', {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 0,
    loop: true,

    // Navigation arrows
    navigation: {
      nextEl: '#slider-next-tes',
      prevEl: '#slider-prev-tes',
    },
  });
  /************************************* */

    // TESTIMONIALS LOGO slider

    const swiperLogo = new Swiper('.testimonials-logo-slider', {
      // Optional parameters
      slidesPerView: 5,
      spaceBetween: 16,
      loop: true,
    });
    /************************************* */

    // PRODUCTS SLIDER
    let specificSwiperProd = null;

    function initSpecificSwiperProd() {
      const windowWidth = window.innerWidth;
      const swiperContainerProd = document.querySelector(".products-slider");

      if (windowWidth <= 1369 && swiperContainerProd && !specificSwiperProd) {
        specificSwiperProd = new Swiper(".products-slider", {
          slidesPerView: 1,
          spaceBetween: 20,
          grid: {
            rows: 2,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            870: {
              spaceBetween: 16,
              slidesPerView: 2,
            },
          },
        });
      }

      if (windowWidth > 1369 && specificSwiperProd) {
        specificSwiperProd.destroy(true, true);
        specificSwiperProd = null;
      }
    }

    initSpecificSwiperProd();
    window.addEventListener("resize", initSpecificSwiperProd);
    /************************************* */

});

