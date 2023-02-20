import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  constructor(product) {
    this.elem = this.card(product);                                         /*В качестве аргумента в конструктор класса передаем объект, описывающий товар*/ 
    this.elem.addEventListener("click", (event) => this.onClick(event));    /*вешаем click на this.elem выполниться описаные действия в OnClick(event)*/  
    this.product = product.id;                                              /*созданное событие product-add должно содержать в себе уникальный идентификатор товара id*/ 
  }

  onClick(event) {
    if (event.target.closest(".card__button")) {                           //[event.target] - это исходный элемент, на котором произошло событие(элемент на который мы кликнули); [closest] - проверяет кликнули ли мы на нужный нам элементе .carousel__arrow_left или элемент вложенный в него
      let customEvent = new CustomEvent("product-add", { bubbles: true, detail: this.product });
      this.elem.dispatchEvent(customEvent);                                 
    }
  }
  
  card(product) { 
    return createElement(`  
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/laab_kai_chicken_salad.png" class="card__image" alt="product">    
        <span class="card__price">€${product.price.toFixed(2)}</span>                             
    </div>
    <div class="card__body">
        <div class="card__title">${product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>
`);
  }
}
