export default class UserTable {
  
  constructor(rows) {
    this.elem = document.createElement('table');
    this.rows = rows;
    this.render(rows);
    this.onClick();
  }
  
  render(rows) {
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // header table
    for (let key in this.rows[0]) {
      const th = document.createElement('th');
      th.textContent = key;     
      thead.appendChild(th);
    }

    const buttonTh = document.createElement('th');
    thead.appendChild(buttonTh);

    this.elem.appendChild(thead);

    // body table
    this.rows.forEach(rows => {
      const tr = document.createElement('tr');
      const removeTd = document.createElement('td');
      removeTd.innerHTML = '<button>X</button>';


      for (let key in rows) {
        const td = document.createElement('td');
        td.textContent = rows[key];
        tr.appendChild(td); 
      }
      tr.appendChild(removeTd);
      tbody.appendChild(tr);
    });


    this.elem.appendChild(tbody);
  }
  
  //  удаление строки по клику
  onClick() {
    this.buttons = this.elem.querySelectorAll('button');
    this.buttons.forEach(button => {
      button.addEventListener('click', this.remove.bind(this));
    });
  }

  remove(event) { 
    const row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);   
  } 

}






