function hideSelf() {
  document.addEventListener('click', function(event) {
    const buttonOne = document.querySelector('.hide-self-button');
    buttonOne.hidden = true;
  });
}
