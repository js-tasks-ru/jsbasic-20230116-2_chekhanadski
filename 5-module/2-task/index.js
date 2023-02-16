function toggleText() {
  
  let buttonElem = document.querySelector('.toggle-text-button'); 
  let textElem = document.getElementById('text');  
   
  buttonElem.onclick = function() {
    if (!textElem.hasAttribute('hidden')) {
      textElem.setAttribute('hidden', true);
    } else {textElem.removeAttribute('hidden');}         
  }; 
      
}




