$(document).ready(function() {
  const url = '../data/exercises.json';
  const axiosTest = axios.get;
  const searchBar = document.getElementById('searchBar');
  let exerciseHtml = '';
  let exerciseArea = document.getElementById('exerciseArea');
  const writeExercises = function(exercise) {
    return `<div class="col-sm-6 mb-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${exercise.name}</h5>
        <p class="card-text">${exercise.description}</p>
        <button href="#" class="btn btn-primary clickable" id=${exercise.id} >Add exercise</button>
      </div>
    </div>
    </div>`;
  };
  let exText = '';
  const exArray = [];

  function writeEachExercise() {
    for (let ex of exArray) {
      exText += `<li class="list-group-item list-group-item-primary p-1 mb-2">${ex}<button class="btn btn-danger m-2 removal" data="${ex}">X</button></li>`;
    }
  }

  const writeSelectedExercises = function() {
    let listArea = document.getElementById('exerciseList');
    exText = '';
    writeEachExercise();
    listArea.innerHTML = exText;
    addRemoval();
  };

  // function for adding remove option for buttons
  const addRemoval = () => {
    document.querySelectorAll('.removal').forEach(button => {
      button.addEventListener('click', () => {
        let exName = button.getAttribute('data');
        if (exArray.indexOf(exName) != -1) {
          exArray.splice(exArray.indexOf(exName), 1);
          writeSelectedExercises();
        }
      });
    });
  };

  // writing list

  // adding exercises to the array after clicking
  const addExercise = function(value) {
    if (exArray.indexOf(value) != -1) {
      return false;
    } else {
      exArray.push(value);
    }
    writeSelectedExercises();
  };

  // adding events to Exercise buttons

  // AJAX request to JSON object
  axiosTest(url).then(data => {
    const exercises = [...data.data];
    exercises.forEach(value => {
      exerciseHtml += writeExercises(value);
    });
    exerciseArea.innerHTML = exerciseHtml;
    eventAdd(exercises);
    // add event listeners for clicking a button
  });
});
