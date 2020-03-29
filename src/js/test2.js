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
  static changeImg() {
    // get all muscleGroup names and put them in 1 array
    const allArr = [];
    ex.arr.forEach(ex => {
      allArr.push.apply(allArr, ex.muscleArea);
    });
    const setAllArr = [...new Set(allArr)].sort();
    console.log(setAllArr);
    // get all curently added muscleGroups and put them in array
    const arr = [];
    addedEx.arr.forEach(ex => {
      arr.push.apply(arr, ex.muscleArea);
    });
    const setArr = [...new Set(arr)];
    setArr.sort();
    console.log(setArr);
    // compare the two arrays
    const indexedArr = setArr.map(el => {
      return setAllArr.indexOf(el);
    });
    console.log(indexedArr);
    // concat the indexes into a string and change HTML
    document
      .getElementById('bodyImage')
      .setAttribute('src', `../src/img/exImage/body${indexedArr.join('')}.png`);
  }

  static displayFilterArea() {}
  // display all the exercises
  static displayEx(arr) {
    let html = '';
    const exArea = document.getElementById('exerciseArea');
    arr.forEach(value => {
      html += `<div class="col-sm-12 col-lg-4 col-md-6 my-3 mx-auto">
    <div class="card bg-dg parYellow border h-100 ">
      <div class="card-body h-100">
        <h4 class="card-title text-center parYellow">${value.name}</h4>
        <p class="card-text">${value.description}</p>
        
      </div>
      <ul class="list-group list-group-flush">
    <li class="list-group-item bg-dg">Muscle Groups: ${value.muscleGroups.join(
      ', '
    )}</li>
    <li class="list-group-item bg-dg">Dapibus ac facilisis in</li>
    <li class="list-group-item bg-dg"><button href="#" class="btn bg clickable w-100 bg-y" id=${
      value.id
    } >Add exercise</button></li>
  </ul>
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
      html += `
      
      <li class="list-group-item h3 bg-dg border py-2 d-flex justify-content-between align-items-center">${value.name}<button class="btn btn-danger" data="${value.id}">X</button></li>`;
    });
    exList.innerHTML = html;
    this.changeImg();
    this.giveEventList(arr);
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
    let inputs = info.target.value.toLowerCase();
    console.log(inputs);
    ex.filteredArr = ex.filteredArr.filter(values => {
      return values.name.toLowerCase().indexOf(inputs) > -1;
    });
    this.displayEx(ex.filteredArr);
  }
  static joinArrays(arr) {
    return arr.join(',');
  }
}

class Storage {
  static addToStorage(ex) {
    const exercises = this.getFromStorage();
    exercises.push(ex);
    localStorage.setItem('exercises', JSON.stringify(exercises));
  }
  static getFromStorage() {
    let exercises;
    if (localStorage.getItem('exercises') === null) {
      exercises = [];
    } else {
      exercises = JSON.parse(localStorage.getItem('exercises'));
    }
    return exercises;
  }
  static removeFromStorage(id) {
    const exercices = this.getFromStorage();
    exercices.forEach((ex, index) => {
      if (ex.id == id) {
        exercices.splice(index, 1);
      }
    });
    localStorage.setItem('exercises', JSON.stringify(exercices));
  }
}
const ex = new Exercise([]);
const addedEx = new Exercise([]);
const searchBar = document.getElementById('searchBar');
document.addEventListener('DOMContentLoaded', UI.startUI(ex));

searchBar.addEventListener('input', function(e) {
  UI.getFilterInputs(e);
});
