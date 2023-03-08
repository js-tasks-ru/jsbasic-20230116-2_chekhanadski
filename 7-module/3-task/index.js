export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.elem = this.render();
  
    this.elem.addEventListener("click", (event) => this.valueRange(event));  
    this.elem.addEventListener("click", (event) => this.switchEvent(event)); 
  }

  switchEvent(event) {
    this.elem.dispatchEvent(new CustomEvent("slider-change", { bubbles: true, detail: this.value }));   // таким образом внешний код сможет узнавать об изменениях слайдера. Генерация пользовательского события.
  }

  valueRange(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;                                  // мы получаем расстояние в пикселях от начала слайдера до места клика.
    let leftRelative = left / this.elem.offsetWidth;                                                    // полученное значение будет в диапазоне от 0 до 1, ведь клик был внутри слайдера.
    
    let segments = this.steps - 1; 
    let approximateValue = leftRelative * segments;    

    let value = Math.round(approximateValue);                                                           // чтобы получить конкретно значение, которое нужно задать слайдеру, округлим дробное значение по правилам математики:

    if (document.querySelector(".slider__step-active")) {                                                
      document.querySelector(".slider__step-active").classList.remove("slider__step-active");           // удаляем класс slider__step-active, если он есть
    }

    this.value = value;

    document.querySelectorAll("span")[value + 1].classList.add("slider__step-active");                  // визуально выделяем шаг на слайдере, добавив класс slider__step-active элементу span внутри элемента с классом slider__steps. 
    document.querySelector(".slider__value").innerHTML = `${value}`;                                    // отмечаем номер выбранного элемента
        
    let valuePercents = value / segments * 100;
    
    let thumb = this.elem.querySelector('.slider__thumb');                                          
    let progress = this.elem.querySelector('.slider__progress');                                    

    thumb.style.left = `${valuePercents}%`;                                                             // Передаем классу .slider__thumb параметр left = ${leftPersentLine}% Поменять положение ползунка (элемент с классом slider__thumb), задав ему left в стилях.
    progress.style.width = `${valuePercents}%`;                                                         // Передаем классу .slider__progress параметр width = `${leftPersentLine}%`; Расширить закрашеную область до ползунка (элемент с классом slider__progress) изменив ее ширину.
  }

  render() {
    let divSlider = document.createElement("div");
    divSlider.classList.add("slider");
    divSlider.insertAdjacentHTML("afterbegin", `
      <div class="slider__thumb" style="left: 0%;">
          <span class="slider__value">0</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps"></div>`);

    for (let i = this.steps; i > 0; i--) {                                                              // создаю необходимое число <span>  и добавляю их по очереди в <div class = 'slider_steps> 
      let spanElem = document.createElement("span");
      divSlider.querySelector(".slider__steps").append(spanElem);
    }

    let one = divSlider.querySelectorAll("div.slider__steps > span")[0];                                // черточка деления на шаги, у выбранного элемента она более широкая
    one.classList.add("slider__step-active");
    return divSlider;
  }
}