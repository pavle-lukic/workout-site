class Exercise {
  constructor(arr) {
    this.excercises = arr;
    this.filteredExcercises = arr;
  }
  addEx(ex) {
    // adds an exercise if it's not already added
    if (this.excercises.indexOf(ex) == -1) {
      this.excercises.push(ex);
      // renders the added exercises after
      UI.displayList(addedEx.excercises);
    }
  }
  removeEx(ex) {
    // removes an added exercise from plan
    if (this.excercises.indexOf(ex) != -1) {
      this.excercises.splice(this.excercises.indexOf(ex), 1);
      // renders the remaining exercises
      UI.displayList(addedEx.excercises);
    }
  }
}
class UI {
  static startUI(obj) {
    // gets all exercises from JSON file and adds it to passed object
    fetch('../data/exercises.json')
      .then((res) => res.json())
      .then((data) => {
        obj.excercises = data;
        obj.filteredExcercises = data;
        // after fetching exercises display them on page
        this.displayEx(obj.excercises);
      });
  }
  static changeImg() {
    const allMuscleAreas = [];
    const addedMuscleAreas = [];
    ex.excercises.forEach((single) => {
      // add every single muscle area to an array
      allMuscleAreas.push.apply(allMuscleAreas, single.muscleArea);
    });
    addedEx.excercises.forEach((single) => {
      // get all muscle areas from currently selected exercises
      addedMuscleAreas.push.apply(addedMuscleAreas, single.muscleArea);
    });
    // remove all duplace values from arrays so only unique ones remain
    // sort so that the same muscle group always has the same index in the
    const allUniqueMuscleAreas = [...new Set(allMuscleAreas)].sort();
    const addedUniqueMuscleAreas = [...new Set(addedMuscleAreas)].sort();

    const indexedMuscleAreas = addedUniqueMuscleAreas.map((el) => {
      // find the overlaping muscle areas and create an array from indexes(easier to map to corresponding image with numbers)
      return allUniqueMuscleAreas.indexOf(el);
    });
    document
      .getElementById('bodyImage')
      .setAttribute(
        'src',
        `../src/img/exImage/body${indexedMuscleAreas.join('')}.png`
      );
  }

  static displayFilterArea() {
    const mov = document.getElementById('movement');
    const cal = document.getElementById('calorie');
    const eq = document.getElementById('equipment');
    const diff = document.getElementById('diff');
    let movVal = mov.options[mov.selectedIndex].value;
    let calVal = cal.options[cal.selectedIndex].value;
    let eqVal = eq.options[eq.selectedIndex].value;
    let diffVal = diff.options[diff.selectedIndex].value;

    const filteredArr = ex.excercises.filter((exercise) => {
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
      return (
        (exercise.isolation == movVal || movVal == true) &&
        (exercise.calorieBurn == calVal || calVal == true) &&
        (exercise.equipment == eqVal || eqVal == true) &&
        (exercise.difficulty.indexOf(diffVal) != -1 || diffVal == true)
      );
    });
    this.displayEx(filteredArr);
  }
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
    info.innerHTML = html;
  }
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
  static getFilterInputs(info) {
    ex.filteredExcercises = ex.excercises;
    let inputs = info.target.value.toLowerCase();

    ex.filteredExcercises = ex.filteredExcercises.filter((values) => {
      return values.name.toLowerCase().indexOf(inputs) > -1;
    });
    this.displayEx(ex.filteredExcercises);
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
