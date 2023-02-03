'use strict';

function highlight(table) {


  const tbody = table.querySelector('tbody');
  const rows = tbody.querySelectorAll('tr');              

  // === Если нет атрибута data-available:
  // ===    проставляем атрибут hidden
 

  rows.forEach((tr) => {
    const tds = [...tr.querySelectorAll('td')];
    const aaa = tds.map((td) => td.hasAttribute('data-available')).every((item) => item === false);
    if (aaa) {
      tr.setAttribute('hidden', true);
    }
  });

  const statusTds = table.querySelectorAll('tbody td:nth-child(4)');  

  // === Если значение у ячейки Status атрибут data-available: 
  // ===    true - проставляем класс available;
  // ===    false - проставляем класс unavailablel;
  
  statusTds.forEach(status => {                           
    const available = status.dataset.available;           
    if (status.hasAttribute('data-available')) {         
      available === 'true' ? status.parentNode.classList.add('available') : status.parentNode.classList.add('unavailable');  
    }
  });

  const genderTds = table.querySelectorAll('tbody td:nth-child(3)'); 

  // === Если содержание ячейки Gender:
  // ===    m - проставляем класс male
  // ===    f - проставляем класс female

  genderTds.forEach(gender => {                                                                                         
    gender.textContent === 'm' ? gender.parentNode.classList.add('male') : gender.parentNode.classList.add('female');   
  });

  const ageTds = table.querySelectorAll('tbody td:nth-child(2)');      

  // === Если значение ячейки Age <18:
  // ===    добавляем inline стиль Style='text-decoration: line-through'

  ageTds.forEach(age => {                                             
    if (parseInt(age.textContent) < 18) {                             
      age.parentNode.style.textDecoration = 'line-through';           
    }
  });
}
