class Exercise {
  constructor(arr) {
    this.arr = arr;
    this.filteredArr = arr;
  }
  addEx(ex) {
    if (this.arr.indexOf(ex) == -1) {
      this.arr.push(ex);
      UI.displayList(addedEx.arr);
    } else {
      console.log('already in exercise list');
    }
  }
  filterEx(arr) {
    console.log(arr);
  }
  removeEx(ex) {
    if (this.arr.indexOf(ex) != -1) {
      this.arr.splice(this.arr.indexOf(ex), 1);
      UI.displayList(addedEx.arr);
    }
  }
}
class UI {
  static startUI(obj) {
    fetch('../data/exercises.json')
      .then(res => res.json())
      .then(data => {
        ex.arr = data;
        ex.filteredArr = data;
        this.displayEx(obj.arr);
      });
  }
  // display all the exercises
  static displayEx(arr) {
    let html = '';
    const exArea = document.getElementById('exerciseArea');
    arr.forEach(value => {
      html += `<div class="col-sm-3 mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${value.name}</h5>
        <p class="card-text">${value.description}</p>
        <button href="#" class="btn btn-primary clickable" id=${value.id} >Add exercise</button>
      </div>
    </div>
    </div>`;
    });
    exArea.innerHTML = html;
    this.giveEventMain(arr);
  }
  // display the added exercises
  static displayList(arr) {
    let html = '';
    const exList = document.getElementById('exerciseList');
    arr.forEach(value => {
      html += `<li class="list-group-item list-group-item-primary p-1 mb-2">${value.name}<button class="btn btn-danger m-2 removal" data="${value.id}">X</button></li>`;
    });
    exList.innerHTML = html;
    UI.giveEventList(arr);
  }
  // Delegate the events after they have been writen in the DOM
  static giveEventMain(values) {
    values.forEach(value => {
      document
        .querySelector('#exerciseArea')
        .addEventListener('click', function(e) {
          if (e.target && e.target.id == `${value.id}`) {
            addedEx.addEx(value);
          }
        });
    });
  }
  // give remove event to the already added Exercises
  static giveEventList(values) {
    values.forEach(value => {
      document
        .querySelector('#exerciseList')
        .addEventListener('click', function(e) {
          if (e.target && e.target.getAttribute('data') == `${value.id}`) {
            addedEx.removeEx(value);
          }
        });
    });
  }
  // filter displayed exercices based on search inputs
  static getFilterInputs(info) {
    ex.filteredArr = ex.arr;
    let calorie = '';
    let cal = document.getElementById('inlineFormCheck');
    if (cal.checked) {
      ex.filteredArr = ex.filteredArr.filter(values => {
        return values.calorieBurn == cal.value;
      });
    }
    let inputs = info.target.value.toLowerCase();
    console.log(inputs);
    ex.filteredArr = ex.filteredArr.filter(values => {
      return values.name.toLowerCase().indexOf(inputs) > -1;
    });
    this.displayEx(ex.filteredArr);
  }
}

class Storage {
  static addToStorage() {
    console.log('storage');
  }
}
const ex = new Exercise([]);
const addedEx = new Exercise([]);
const searchBar = document.getElementById('searchBar');
document.addEventListener('DOMContentLoaded', UI.startUI(ex));

searchBar.addEventListener('input', function(e) {
  UI.getFilterInputs(e);
});
