import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) { 
    this.slides = slides;                                                                                       // в качестве аргумента в констуктор класса передается массив slides для обработки;
    this.elem = this.carousel(this.slides);                                   
    this.elem.addEventListener("click", (event) => this.onClick(event));                                        // event - позволяет понять на какую кнопку мы нажали. вешаем собыите 'click' к this.elem. При нажатии на кнопку onClick должно произойти событие описаное в onClick(event);

    this.value = 0;                                                                                             // стартовое значение смещения transform value = 0;
    this.curentSlide = 1;                                                                                       // стартовое значени стартового слайда = 1;

    this.slideLenght = this.elem.querySelectorAll(".carousel__slide");                                          // узнаем количество слайдов. Для этого выбираем все элементы с class = '.carousel__slide';
    this.left = this.elem.querySelector(".carousel__arrow_left");                                               // выбираем левую кнопку через ее class и даем ей имя this.left
    this.right = this.elem.querySelector(".carousel__arrow_right");                                             // аналогично левой кнопке

    this.left.style.display = "none";                                                                           // у левой кнопки указываем по умолчанию display = 'none', в стартовой позиции слайдера

    this.elem.addEventListener("click", (event) => this.slider(event));                                         // привязываем событие 'click' к this.elem, после 'click' происходит события описаные в slider(event);
  }

  slider(event) {
    
    /** Переключение слайдов и скрытия кнопок*/

    let counter = this.elem.querySelector(".carousel__inner").offsetWidth;                                     // узнаем полную ширину элемента c class = 'carousel__inner';    
    
    if (event.target.closest(".carousel__arrow_left")) {                                                       // [event.target] - это исходный элемент, на котором произошло событие(элемент на который мы кликнули); [closest] - проверяет кликнули ли мы на нужный нам элементе .carousel__arrow_left или элемент вложенный в него
      this.elem.querySelector(".carousel__inner").style.transform = `translateX(${this.value += counter}px)`;  // задаем перемещение слайдов на их ширину влево от this.value
      this.curentSlide -= 1;                                                                                   //  для левого отнимаем один слайд (ширину слайда)
      
      if (this.curentSlide === 1) {
        this.left.style.display = "none";                                                                      // скрываем левую кнопку если находимся на слайде №1
      }
      else if (this.curentSlide !== this.slideLenght.length) {                                                 // если текущий слайд не равен количеству слайдов
        this.right.style.display = "";                                                                         // тогда показываем кнопку вправо
      } else {                                                                                                 // иначе
        this.left.style.display = "";                                                                          // показываем кнопку вправо
      }
    }

    if (event.target.closest(".carousel__arrow_right")) {                                                     //*свойстов [event.target] - содержит элемент, на котором сработало событие; [closest] - ищет ближайший родительский элемент подходящий указаному классу*/       
      this.elem.querySelector(".carousel__inner").style.transform = `translateX(${this.value -= counter}px)`; // задаем перемещение слайдов на ширину слайда вправо
      this.curentSlide += 1;                                                                                  // для правого добавляем ширину слайда

      if (this.curentSlide === this.slideLenght.length) {                                                     // если номер слайда = количеству слайдов
        this.right.style.display = "none";                                                                    // скрываем правую кнопку
      } else if (this.curentSlide !== 1) {                                                                    // если текущий слайд !==1  тогда 
        this.left.style.display = "";                                                                         // показываем кнопку влево
      } else {                                                                                                // иначе
        this.right.style.display = "";                                                                        // тоже показываем кнопку вправо
      }
    }
    
  }

  /**Кнопка добавления товара */
  onClick(event) {
    if (event.target.closest(".carousel__button")) {
      let customEvent = new CustomEvent("product-add", { bubbles: true, detail: this.slides[this.curentSlide - 1].id });
      this.elem.dispatchEvent(customEvent);
    }
  }

  /**Добавлени HTML кода*/
  carousel(slides) {

    let carousel = document.createElement("div");                                                             /* создаем <div>*/
    carousel.classList.add("carousel");                                                                       /* создаем class = 'carousel' для только что созданого <div>*/
    carousel.insertAdjacentHTML("afterbegin", `                                                               /* вставляем Html код вначало относительно опорного элемента*/
        
    <div class="carousel__arrow carousel__arrow_right">                                      
      <img src="/assets/images/icons/angle-icon.svg" alt="icon"> 
    </div>
    <div class="carousel__arrow carousel__arrow_left">                
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    
    `);

    let divCarouselInner = document.createElement("div");                                                    /* создаем <div>*/
    divCarouselInner.classList.add("carousel__inner");                                                       /* добавлем к <div> class = "carousel__inner"*/ 

    for (const value of slides) {                                                                            /**при помощи цикла for of создаем html блоки для всех имеющихся слайдов */

      let divCarouselSlide = document.createElement("div");                                                  /* создаем <div> */
      divCarouselSlide.classList.add("carousel__slide");                                                     /* добавляем к <div> class = "carousel__slide"*/
      divCarouselSlide.setAttribute("data-id", `${value.id}`);                                               /* изменяем значение атрибута <div> */

      divCarouselSlide.insertAdjacentHTML("afterbegin", `                                                    /* добавляем Html посел опорного элемента*/
      <img src="/assets/images/carousel/${value.image}" class="carousel__img" alt="slide">                   /* Изображаения берем из свойства image. А картинки img с CSS классом carousel__img  */
      <div class="carousel__caption">
          <span class="carousel__price">€${value.price.toFixed(2)}</span>  
          <div class="carousel__title">${value.name}</div>                 
          <button type="button" class="carousel__button">                  
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">    
          </button>
      </div>
      `);

      divCarouselInner.append(divCarouselSlide);                                                            // Вставляем divCarouselSlide вконец divCarouselInner, при помощи .append
    }

    carousel.append(divCarouselInner);                                                                      // Вставляем divCarouselInner в конец carousel, при помощи .append
    return carousel;
  }
}