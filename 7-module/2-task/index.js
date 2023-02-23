import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  //СВОЙСТВА
  constructor() {                                                                      
    this.elem = this.render(); 
    this.elem.querySelector('.modal__close').addEventListener('click', this.close);    // вешаем событие 'click' на элемент с классом modal__close, метод close()                                                                                                                        // вешаем на кнопку закрытия модального окна событие 'click', описаное в методе Close; 2-ой - закрытие по клику по кнопке [x], которая содержит класс modal__close 
    document.addEventListener("keydown", (event) => this.keyHandler(event));           // вешаем событие keydown на кнопку Esc для закрытие модального окна, описаное в методе keyhandler(event)
  }  

  // МЕТОДЫ
  open() {
    document.body.classList.add('is-modal-open');                                      // Также надо добавить класс is-moda-open элементу body
    document.body.append(this.elem);                                                   // метод open() открывает модальное окно добавляя всю его верстку в body.
  }
 
  setTitle(title) {
    this.elem.querySelector(".modal__title").textContent = title;                      // Метод setTitle("modal title") принимает в качеств аргумента переменную с заголовком модального окна и записывает её значение внутрь элемента с классом modal_title.
  }
     
  setBody(node) {                                                                      // Метод setBody(node) принимает в качестве аргумента корневой HTML того, что мы хотим показать в модальном окне
    let targetElem = this.elem.querySelector('.modal__body');
    if (targetElem) {
      targetElem.innerHTML = '';                                                       // все что было до этого внутри элемента с классом modal__body, должно быть стерто
    } targetElem.append(node);                                                         // и вставляем корневой HTML в элемент с классом modal__body.
  }

  // ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА     
  close() {                                                                            // закрытие при вызове метода close()                                                               
    document.body.classList.remove('is-modal-open');                                   // при закрытии моадльного окна надо полностью удалить его верстку со страницы и убрать класс is-modal-open с элемента body.
    document.removeEventListener("keydown", () => null);                               // обязательно удалить обработчик событий keydown. Чтобы обработчик не вызывался после закрытия окна нажатием кнопок.                                        
    let modal = document.querySelector('.modal');                                      // назначаем имя modal элементу с классом  modal, т.е. всему модальному окну
    if (modal) {
      modal.remove();                                                                  // удаляем элемент с классом model, т.е. удаляем модальное окно, закрываем модальное окно
    } 
  }
   
  keyHandler(_e) {
    if (_e.code === 'Escape') {                                                        // по нажатию клавиши ESC закрытие модального окна
      this.close();                  
    };      
  }
   
 
  render () {                                                                          // добавляем в html код необходимые теги и классы
    let container = document.querySelector('.container');
    let modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');
    container && container.append(modalDiv);

    let modalOverlayDiv = document.createElement('div');
    modalOverlayDiv.classList.add('modal__overlay');
    modalDiv.append(modalOverlayDiv);

    let modalInnerDiv = document.createElement('div');
    modalInnerDiv.classList.add('modal__inner');
    modalDiv.append(modalInnerDiv);

    let modalHeaderDiv = document.createElement('div');
    modalHeaderDiv.classList.add('modal__header');
    modalInnerDiv.append(modalHeaderDiv);

    let modalButtonClose = document.createElement('button');
    modalButtonClose.classList.add('modal__close');
    modalHeaderDiv.append(modalButtonClose);

    let closeIcon = document.createElement('img');
    closeIcon.setAttribute('src', "/assets/images/icons/cross-icon.svg");
    closeIcon.setAttribute('alt', "close-icon");
    modalButtonClose.append(closeIcon);

    let modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal__title');
    modalHeaderDiv.append(modalTitle);

    let modalBodyDiv = document.createElement('div');
    modalBodyDiv.classList.add('modal__body');
    modalInnerDiv.append(modalBodyDiv);

    return modalDiv;
  }
}
