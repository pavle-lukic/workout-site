$(document).ready(function() {
  const url = '../data/exercises.json';
  const axiosTest = axios.get;
  let exHtml = '';
  const searchBar = document.getElementById('searchBar');
  let exerciseArea = document.getElementById('exerciseArea');

  function eventAdd(values) {
    values.forEach(value => {
      document.addEventListener('click', function(e) {
        if (e.target && e.target.id == `${value.id}`) {
          exercises.addEx(value);
        }
      });
    });
  }

  const exercises = {
    fullEx: ['dsdsd', 'agbasda', 'ddddnnn', 'daaasss'],
    filteredEx: [],
    addedEx: [],
    // write exercices after being filtered
    writeEx: function() {
      this.filteredExercices.forEach(element => {
        console.log(element);
      });
    },
    // after clicking on a button add the exercices to the list on left side
    addEx: function(value) {
      if (this.addedEx.indexOf(value) != -1) {
        console.log('already in');
      } else {
        this.addedEx.push(value);
        console.log(this.addedEx);
      }
      writingEx.writeList(this.addedEx);
    },
    // filter exercices based on the value provided
    filterEx: function(value) {
      this.filteredEx = this.fullEx.filter(function(e) {
        return e.indexOf(value.toLowerCase()) != -1;
      });
    },
    // after clicking on a button remove exercices from the left list
    removeAddedEx: function(value) {
      this.addedEx = this.addedEx.filter(function(e) {
        return e.indexOf(value.toLowerCase() != -1);
      });
    }
  };

  const writingEx = {
    // exercices to be displayed on the right side
    writeEx: function(array) {
      exHtml = '';
      array.forEach(value => {
        exHtml += `<div class="col-sm-6 mb-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${value.name}</h5>
          <p class="card-text">${value.description}</p>
          <button href="#" class="btn btn-primary clickable" id=${value.id} >Add exercise</button>
        </div>
      </div>
      </div>`;
      });
    },
    // exercices to be displayed on the left side
    writeList: function(array) {
      let listArea = document.getElementById('exerciseList');
      exHtml = '';
      array.forEach(value => {
        exHtml += `<li class="list-group-item list-group-item-primary p-1 mb-2">${value.name}<button class="btn btn-danger m-2 removal" data="${value.id}">X</button></li>`;
      });
      listArea.innerHTML = exHtml;
    }
  };

  axiosTest(url).then(data => {
    exercises.fullEx = [...data.data];
    writingEx.writeEx(exercises.fullEx);
    exerciseArea.innerHTML = exHtml;
    eventAdd(exercises.fullEx);
    // add event listeners for clicking a button
  });
});
