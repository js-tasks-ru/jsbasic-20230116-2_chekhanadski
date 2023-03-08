import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';
export default class Main {

  constructor() {
  }

  // Метод async render() показывает все компоненты магазина на странице и возвращает промис.
  async render() {
    //карусель
    let carousel = new Carousel(slides); 
    let dataCarouselHolder = document.querySelector("[data-carousel-holder]");
    dataCarouselHolder.append(carousel.elem);

    // Лента-меню
    let ribbonMenu = new RibbonMenu(categories);
    let dataRibbonHolder = document.querySelector("[data-ribbon-holder]");
    dataRibbonHolder.append(ribbonMenu.elem);

    // Слайдер
    let stepSlider = new StepSlider({ steps: 5 });
    let dataSliderHolder = document.querySelector("[data-slider-holder]");
    dataSliderHolder.append(stepSlider.elem);

    // Иконка корзины
    let cartIcon = new CartIcon();
    let dataCartIconHolder = document.querySelector("[data-cart-icon-holder]");
    dataCartIconHolder.append(cartIcon.elem);

    let cart = new Cart(cartIcon);

    // Показ списка товаров
    async function getProductList() {
      // делаем запрос на сервер с помощью fetch по адресу products.json.
      return await fetch('products.json').then(response => response.json());
    }
    
    // Делаем await получения товаров, т.к. метод render возвращает промис
    let productList = await getProductList();

    // После получения массива товаров, создаем экземпляр компонента ProductsGrid
    let productsGrid = new ProductsGrid(productList);
    let dataProductsGridHolder = document.querySelector("[data-products-grid-holder]");
    // Очищаем содержимое элемента, в который мы вставляем список товаров
    dataProductsGridHolder.innerHTML = "";
    // Вставляем его корневой элемент внутрь элемента с атрибутом data-products-grid-holder
    dataProductsGridHolder.append(productsGrid.elem);

    // Фильтрация товаров после получения с сервера
    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value
    });

    // Связь компонентов через события
    // Если на элементе body происходит событие 'product-add', то нужно по productId из объекта события найти нужный товар в массиве товаров и добавить его в корзину
    document.body.addEventListener("product-add", (event) => {
      let productToAdd = productList.find((product) => product.id === event.detail);
      cart.addProduct(productToAdd);
    });

    // Если на корневом элементе экземпляра компонента StepSlider происходит событие 'slider-change', то нужно отфильтровать товары по новому значению остроты
    stepSlider.elem.addEventListener("slider-change", (event) => {
      productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    // Если на корневом элементе экземпляра компонента RibbonMenu происходит событие 'ribbon-select', то нужно отфильтровать товары по новому значению категории
    ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      productsGrid.updateFilter({
        category: event.detail,
      });
    });

    // Фильтрация по изменению чекбоксов
    document.querySelector(".filters").addEventListener("change", (event) => {
      if (event.target.closest("#nuts-checkbox")) {
        productsGrid.updateFilter({
          noNuts: event.target.checked,
        });
      }
      if (event.target.closest("#vegeterian-checkbox")) {
        productsGrid.updateFilter({
          vegeterianOnly: event.target.checked,
        });
      }
    });
  }
}