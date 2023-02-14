function initCarousel() {   

  let carouselInner = document.querySelector(".carousel__inner");
  let carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  let carouselArrowRight = document.querySelector(".carousel__arrow_right");
  let sizeOffset = document.querySelector(".carousel__img").width;
  let windowWidth = `${carouselInner.offsetWidth}`;
  
  if (windowWidth < 988) {
    sizeOffset = windowWidth;
  } 
  
  carouselArrowLeft.addEventListener("click", clickLeft);       
  carouselArrowLeft.style.display = "none";                   
  carouselArrowRight.addEventListener("click", clickRight);

  function getOffset() {                  
    let offset = carouselInner.offset;
    return isNaN(offset) ? 0 : offset;
  }

  function clickLeft() {
    visibleButton(getOffset() + 1);
  }

  function clickRight() {
    visibleButton(getOffset() - 1);
  }

  function visibleButton(offset) {
  
    carouselArrowRight.style.display = offset > -3 ? "" : "none";
    carouselArrowLeft.style.display = offset < 0 ? "" : "none";

    carouselInner.style.transform = `translateX(${offset * sizeOffset}px)`;
    carouselInner.offset = offset;
  } 

}
