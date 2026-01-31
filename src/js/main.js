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
      const currentWidth = `${ratingValue * (100 / 5)}%`;
      ratingActiveStars.style.width = currentWidth;
    }
  });

  const bodyEl = document.body;
   const btnMenu = document.querySelector('.menu-open');
   const mobileMenu = document.querySelector('.menu');



  function closeMobileMenu() {
    btnMenu.classList.remove('active');
    mobileMenu.style.height = 0;
    bodyEl.classList.remove('lock');
  }

  function openMobileMenu() {
    btnMenu.classList.add('active');
    let menuHeight = mobileMenu.scrollHeight + 20;
    mobileMenu.style.height = menuHeight + 'px';
    bodyEl.classList.add('lock');
  }

   btnMenu.addEventListener('click', () => {
    if (btnMenu.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
   });

    // поведение ссылок в хедере при клике

    const menuItems = mobileMenu.querySelectorAll('a');
    // const menu = document.querySelector('.header-nav-wrapper');

    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            for (el of menuItems) {
              removeActive();
            }
        });
    }
    );

  // resize();

  // $(window).resize(function() {
  //     resize();
  //     removeActive();
  // });



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

  // reviews PHOTO slider

  const swiperTes = new Swiper('.reviews-photo-slider', {
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

  // reviews LOGO slider

  const swiperLogo = new Swiper('.reviews-logo-slider', {
    // Optional parameters
    slidesPerView: 5,
    spaceBetween: 16,
    // a11y: false,
    // freeMode: true,
    // speed: 2000,
    // loop: true,
    // autoplay: {
    //     delay: 0.0,
    //     disableOnInteraction: false,
    // },

  });
  /************************************* */

  // reviews LOGO slider

  const swiperRewTxt = new Swiper('.reviews-txt-slider', {
    // Optional parameters
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
      nextEl: '#slider-next-txt',
      prevEl: '#slider-prev-txt',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    //   speed: 600
    // },
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

// ACCORDEON IN FAQ SECTION
const accordeonTitle = document.querySelectorAll('[data-name="accordeon-title"]');

accordeonTitle.forEach(function (item) {
    item.addEventListener('click', showAccordeon);
});

function showAccordeon() {
    this.classList.toggle('show');
    let loock = this.nextElementSibling;
    if (loock.style.height){
    loock.style.height = null;
    } else {
        loock.style.height = loock.scrollHeight + "px";
    }
}
});

