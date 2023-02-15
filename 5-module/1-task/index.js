function hideSelf() {
  const buttonElem = document.querySelector('.hide-self-button'); 
  buttonElem.addEventListener('click', function(event) {
    buttonElem.hidden = true;
  });
}
