import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {

  constructor(categories) {
    
    this.categories = categories;                                                                                   // в качестве аргумента в констуктор класса передается массив categories для обработки
    this.elem = this.render(this.categories);                                                                       // присваемваем корневому DOM-элементу меню значение this.element 

    this.scrollInner = this.elem.querySelector(".ribbon__inner");                                                   // присваем ленте значение this.scrollInner

    this.elem.querySelector(".ribbon__arrow_left").classList.remove("ribbon__arrow_visible");                       // удаляем class = ribbon__arrow_visible
    this.elem.querySelector(".ribbon__arrow_right").classList.add("ribbon__arrow_visible");                         // добавляем class = ribbon__arrow_visible

    this.elem.addEventListener("click", (event) => this.onClick(event));                                            // вешаем на this.elem событие click, Описаное в блоке onClick

    this.scrollInner.addEventListener("scroll", (event) => this.buttonHide(event));                                 // вешаем на this.scrollInner событие scroll, описаное в блоке buttonHide

    this.scrollInner.addEventListener("click", (event) => this.selection(event));                                   // вешаем на this.scrollInner событие click,  описаное в блоке selection
  }

  selection(event) {                                                                              // ВЫДЕЛЯЕМ СТИЛЯМИ ВЫБРАННУЮ КАТЕГОРИЮ

    event.preventDefault();                                                                                         // останавливаем действия браузера по умолчанию
    let element = event.target;                                                                                     // event.target - элемент на который мы кликнули, присваемваем ему значение element;
    let selectionElement = this.scrollInner.querySelector(".ribbon__item_active");                                  // присваеваем значение selectionElement, для последующего выделения выбраной категории классом
    element.classList.add("ribbon__item_active");                                                                   // добавляем класс ribbon__item_active активированному элементу
    let selectionAllElements = this.scrollInner.querySelectorAll(".ribbon__item_active");                           // выбираем все активированные элементы с классом ribbon__item_active

    if (selectionAllElements.length > 1) {                                                                          // Если все элементы активированные в сумме > 1
      selectionElement.classList.remove("ribbon__item_active");                                                     // тогда удаляем класс ribbon__item_active
    }

    let eventCustome = new CustomEvent("ribbon-select", { bubbles: true, detail: element.getAttribute("data-id") });// даем знать другим копанентам, какую категорию выбрал пользователь
    this.elem.dispatchEvent(eventCustome);                                                                          // Метод dispatchEvent позволяет имитировать событие событие на элементе.
  }

  onClick(event) {                                                                               // ПРОКРУТКА МЕНЮ

    if (event.target.closest(".ribbon__arrow_left")) {                                                              //отслеживает если происходит клик на элемент с описанным классом, тогда произойдет прокрутка на -350px в горизонатльном меню благодаря методу scrollBy; event.target - элемент на который мы кликнули; closest - ищет ближайший родительский элемент подходящий указаному классу .ribbon__arrow_left;
      this.scrollInner.scrollBy(-350, 0);                                                                           
    }

    if (event.target.closest(".ribbon__arrow_right")) {                                                             // отслеживает если происходит клик на элемент с описанным классом, тогда произойдет прокрутка на 350px в горизонатльном меню благодаря методу scrollBy;
      this.scrollInner.scrollBy(350, 0);                                                                            
    }
  }

  buttonHide(event) {                                                                            // ПРЯЧЕМ КНОПКИ В КРАЙНИХ ПОЛОЖЕНИЯХ МЕНЮ                   
    let scrollRight = this.scrollInner.scrollWidth - this.scrollInner.scrollLeft - this.scrollInner.clientWidth;    // .scrollWidth - вся ширина ленты меню, включая не видимую часть ленты; .scrollLeft - ширина не видимой на данный момент ленты слева; clientWidth - ширина видимой части ленты;

    if (this.scrollInner.scrollLeft === 0) {                                                                        // Если невидимая часть ленты слева = 0, тогда скрываем левую кнопку прокрутки при помощи удаления класса ribbon__arrow_visible у левой кнопки;
      this.elem.querySelector(".ribbon__arrow_left").classList.remove("ribbon__arrow_visible");                      
    }                                                                                                                   
    if (this.scrollInner.scrollLeft > 0) {                                                                          // Если невидимая часть ленты слева > 0, показываем кнопку прокрутки влево, для этого добавляем класс ribbon__arrow_visible у левой кнопки;      
      this.elem.querySelector(".ribbon__arrow_left").classList.add("ribbon__arrow_visible");                                     
    }
    if (scrollRight > 1) {                                                                                            
      this.elem.querySelector(".ribbon__arrow_right").classList.add("ribbon__arrow_visible");                       // Если невидимая часть ленты справа > 1, показываем кнопку прокрутки вправо, для этого добавляем класс ribbon__arrow_visible у правой кнопки;     
    }
    if (scrollRight < 1) {
      this.elem.querySelector(".ribbon__arrow_right").classList.remove("ribbon__arrow_visible");                    // Если невидимая часть ленты справа < 1(единица, а не 0 из-за неточности вычеслений), скрываем кнопку для этгого удаляем класса ribbon__arrow_visible у левой кнопки;
    }
  }

  render(categories) {

    let divRibbon = document.createElement("div");                                                                  // создаем <div>, как показано в файле static.html
    divRibbon.classList.add("ribbon");                                                                              // создаем class к созданому <div>,  как показано в файле static.html      

    divRibbon.insertAdjacentHTML("afterbegin", `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);                                                                                  // ВСТАВЛЯЕМ ПОСЛЕ НАЧАЛА КНОПКУ ПРОКРУТКИ ВЛЕВО, как показано в файле static.html

    let navElement = document.createElement("nav");                                                                 // создаем <nav>, как показано в файле static.html
    navElement.classList.add("ribbon__inner");                                                                      // создаем class к созданому <nav>, как показано в файле static.html

    for (let target of this.categories) {                                                                           // циклом for of пробегаем по всему массиву категорий, создаем для каждой <a>, добавляем  атрибуты, классы, добавляем имя категории.

      let aElement = document.createElement("a");                                                                   // создаем <a>

      aElement.setAttribute("href", "#");                                                                           // добавляем к <a> атрибут href на ссылку заглушку
      aElement.classList.add("ribbon__item");                                                                       // и добавляем к <a> class
      aElement.setAttribute("data-id", `${target.id}`);                                                             // добавляем атрибуты к <a>
      aElement.innerHTML = `${target.name}`;                                                                        // Свойство innerHTML позволяет получить HTML-содержимое элемента в виде строки. Мы также можем изменять его.

      if (target.id === '') {                                                                     //ПОКАЗЫВАЕМ ТОВАР ТОЙ КАТЕГОРИИ, КОТОРУЮ ВЫБРАЛ ПОЛЬЗОВАТЕЛЬ
        aElement.classList.add("ribbon__item_active");                                                              // если id (уникального идентификатора категории) пустой, значит выбраны все категории, добавляем класс
      } else if (target.id === "on-the-side") {                                                                     
        aElement.setAttribute("data-id", "on-the-side ribbon__item_active");                                        // если у id (уникального идентификатора категории) есть значение добавлем атрибуты 
      }
      navElement.append(aElement);                                                                                  // вставляем aElement в конец navElement 
    }

    divRibbon.append(navElement);                                                                                   // вставляем navElement в конец divElement

    divRibbon.insertAdjacentHTML("beforeend", `
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);                                                                                  // ВСТАВЛЯЕМ ПЕРЕД КОНЦОМ КНОПКУ ПРОКРУТКИ ВПРАВО

    return divRibbon;
  }
}
