class Exercise {
  constructor(arr) {
    this.arr = arr;
    this.filteredArr = arr;
  }
  addEx(ex) {
    if (this.arr.indexOf(ex) == -1) {
      this.arr.push(ex);
      UI.displayList(addedEx.arr);
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
      .then((res) => res.json())
      .then((data) => {
        ex.arr = data;
        ex.filteredArr = data;
        this.displayEx(obj.arr);
      });
  }
  static changeImg() {
    // get all muscleGroup names and put them in 1 array
    const allArr = [];
    ex.arr.forEach((ex) => {
      allArr.push.apply(allArr, ex.muscleArea);
    });
    const setAllArr = [...new Set(allArr)].sort();
    // get all curently added muscleGroups and put them in array
    const arr = [];
    addedEx.arr.forEach((ex) => {
      arr.push.apply(arr, ex.muscleArea);
    });
    const setArr = [...new Set(arr)];
    setArr.sort();
    // compare the two arrays
    const indexedArr = setArr.map((el) => {
      return setAllArr.indexOf(el);
    });
    // concat the indexes into a string and change HTML
    document
      .getElementById('bodyImage')
      .setAttribute('src', `../src/img/exImage/body${indexedArr.join('')}.png`);
  }

  static displayFilterArea() {
    const mov = document.getElementById('movement');
    const cal = document.getElementById('calorie');
    const eq = document.getElementById('equipment');
    const diff = document.getElementById('diff');
    let movVal = mov.options[mov.selectedIndex].value;

    let calVal = cal.options[cal.selectedIndex].value;

    let eqVal = eq.options[eq.selectedIndex].value;
    console.log(eqVal);
    let diffVal = diff.options[diff.selectedIndex].value;

    const filteredArr = ex.arr.filter((exercise) => {
      if (diffVal == 'any') {
        diffVal = true;
      }
      if (eqVal == 'any') {
        eqVal = true;
      }
      if (calVal == 'any') {
        calVal = true;
      }
      if (movVal == 'any') {
        movVal = true;
      }
      console.log(movVal, calVal, eqVal, diffVal);
      return (
        (exercise.isolation == movVal || movVal == true) &&
        (exercise.calorieBurn == calVal || calVal == true) &&
        (exercise.equipment == eqVal || eqVal == true) &&
        (exercise.difficulty.indexOf(diffVal) != -1 || diffVal == true)
      );
    });
    console.log(filteredArr);
    this.displayEx(filteredArr);
  }
  // display all the exercises
  static displayEx(arr) {
    let html = '';
    const exArea = document.getElementById('exerciseArea');
    arr.forEach((value) => {
      html += `<div class="col-sm-12 col-lg-4 col-md-6 my-3">
    <div class="card bg-dg parYellow h-100 my-0 ">
      <div class="card-body h-100">
        <h4 class="card-title text-center parYellow font-weight-bold">${
          value.name
        }</h4>
        <p class="card-text"><span class="parYellow ">Description: </span>${
          value.description
        }</p>
        
      </div>
      <ul class="list-group list-group-flush">
    <li class="list-group-item bg-dg"><span class="parYellow">Muscle Groups: </span>${value.muscleGroups.join(
      ', '
    )}</li>
    <li class="list-group-item bg-dg"><span class="parYellow">Calorie Burn: </span>${
      value.calorieBurn.charAt(0).toUpperCase() + value.calorieBurn.substring(1)
    }</li>
    
    <li class="list-group-item bg-dg"><button href="#" class="btn bg clickable w-100 font-weight-bold bg-y" id=${
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
    arr.forEach((value) => {
      html += `
      
      <li class="list-group-item h3 bg-dg py-2 d-flex justify-content-between align-items-center">${value.name}<button class="btn btn-danger" data="${value.id}">X</button></li>`;
    });
    exList.innerHTML = html;
    this.changeImg();
    this.displayInformation(arr);
    this.giveEventList(arr);
    this.displayFilterArea();
  }

  static displayInformation(arr) {
    let html = '';
    const info = document.getElementById('statistic');
    // function to give average value of calorie burn
    const cal = function (item) {
      const calObj = {};
      item.forEach((value) => {
        calObj[value.calorieBurn] = 1 + (calObj[value.calorieBurn] || 0);
      });
      let max = 0;
      let val = '';
      if (Object.keys(calObj).length === 0) {
        val = 'None';
      }
      for (let prop in calObj) {
        if (calObj[prop] >= max) {
          max = calObj[prop];
          val = prop;
        }
      }
      return val.toUpperCase();
    };
    const ex = function (item) {
      const exObj = {};
      let html = '';
      item.forEach((value) => {
        value.muscleGroups.forEach((muscle) => {
          exObj[muscle] = 1 + (exObj[muscle] || 0);
        });
      });
      if (Object.keys(exObj).length === 0) {
        html += `<li class="list-group-item d-flex justify-content-between align-items-center bg-dg h5" >
        No exercises have been selected!
      </li>`;
      }
      for (let key in exObj) {
        if (exObj.hasOwnProperty(key)) {
          html += `<li class="list-group-item d-flex justify-content-between align-items-center bg-dg h5" >
          - ${
            key.charAt(0).toUpperCase() + key.substring(1)
          }: <span class="parYellow font-weight-bold">${exObj[key]}</span>
        </li>`;
        }
      }
      return html;
    };

    // calc average intensity of exercise
    const intens = function (arr) {
      let totalIntensity = 0;
      arr.forEach((value) => {
        totalIntensity += value.intensity;
      });
      if (totalIntensity / arr.length < 3) {
        return 'Low';
      } else if (totalIntensity / arr.length < 7) {
        return 'Medium';
      } else if (totalIntensity / arr.length) {
        return 'High';
      } else return 'None';
    };
    // formating the html
    html += ` <li class="list-group-item d-flex justify-content-between align-items-center bg-dg h5">
    Number of selected exercises:<span class="parYellow">${arr.length}</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center bg-dg h5"> 
    Calorie Burn:<span class="parYellow font-weight-bold">${cal(arr)}</span>
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center bg-dg h5">
    Intensity:<span class="parYellow font-weight-bold">${intens(
      arr
    ).toUpperCase()}</span>
   </li>
   <li class="list-group-item d-flex justify-content-beggining align-items-end bg-dg h5">
   Following Muscle Groups are included:
  </li>
  ${ex(arr)}`;

    // function to give intensity value done
    // function to get number of each musle groups affected
    info.innerHTML = html;
  }
  // Delegate the events after they have been writen in the DOM
  static giveEventMain(values) {
    values.forEach((value) => {
      document
        .querySelector('#exerciseArea')
        .addEventListener('click', function (e) {
          if (e.target && e.target.id == `${value.id}`) {
            addedEx.addEx(value);
          }
        });
    });
  }
  // give remove event to the already added Exercises
  static giveEventList(values) {
    values.forEach((value) => {
      document
        .querySelector('#exerciseList')
        .addEventListener('click', function (e) {
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

    ex.filteredArr = ex.filteredArr.filter((values) => {
      return values.name.toLowerCase().indexOf(inputs) > -1;
    });
    this.displayEx(ex.filteredArr);
  }
}

const ex = new Exercise([]);
const addedEx = new Exercise([]);
const searchBar = document.getElementById('searchBar');
document.addEventListener('DOMContentLoaded', UI.startUI(ex));
document.getElementById('filter').addEventListener('click', (e) => {
  e.preventDefault();
  UI.displayFilterArea();
});
searchBar.addEventListener('input', function (e) {
  UI.getFilterInputs(e);
});
