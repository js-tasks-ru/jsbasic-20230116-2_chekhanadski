import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  constructor(product) {
    this.elem = this.card(product);                                         /*В качестве аргумента в конструктор класса передаем объект, описывающий товар*/ 
    this.elem.addEventListener("click", (action) => this.onClick(action));  /*.addEventListener - метод назначающией на элемент обработчик событий(пр. Click)*/  
    this.product = product.id;                                              /*созданное событие product-add должно содержать в себе уникальный идентификатор товара id*/ 
  }

  onClick(action) {
    if (action.target.closest(".card__button")) {                           /*свойстов [action.target] - содержит элемент, на котором сработало событие; [closest] - ищет ближайший родительский элемент подходящий указаному классу*/ 
      let customEvent = new CustomEvent("product-add", { bubbles: true, detail: this.product });
      this.elem.dispatchEvent(customEvent);                                 /*привязали к кнопке событие 'customEvent' срабатывающего по click на кнопку*/ 
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
