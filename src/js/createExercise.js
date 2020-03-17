$(document).ready(function() {
  const url = '../data/exercises.json';
  const axiosTest = axios.get;

  let exerciseHtml = '';
  let exerciseArea = document.getElementById('exerciseArea');
  const writeexercises = function(exercise) {
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
  const writeSelectedexercises = function() {
    let listArea = document.getElementById('exerciseList');
    listArea.innerHTML = exText;
    document.addEventListener;
  };

  // function for adding remove option for buttons
  const addRemoval = function() {
    console.log('hello');
  };
  // adding exercises to the array after clicking
  const addexercise = function(value) {
    if (exArray.indexOf(value) != -1) {
      return false;
    } else {
      exArray.push(value);
      console.log(exArray);
    }
    exText = '';
    for (let ex of exArray) {
      console.log(ex);
      exText += `<li class="list-group-item list-group-item-primary p-1">${ex}<button class="btn btn-danger m-2 removal" data="${ex}">X</button></li>`;
    }
    writeSelectedexercises();
    addRemoval();
  };

  // AJAX request to JSON object
  axiosTest(url).then(data => {
    const exercises = [...data.data];
    console.log(exercises);
    exercises.forEach(value => {
      exerciseHtml += writeexercises(value);
    });
    exerciseArea.innerHTML = exerciseHtml;

    // add event listeners for clicking a button
    exercises.forEach(value => {
      document.addEventListener('click', function(e) {
        if (e.target && e.target.id == `${value.id}`) {
          addexercise(value.name);
          console.log('clicked id is', value.id);
        }
      });
    });
  });
});
