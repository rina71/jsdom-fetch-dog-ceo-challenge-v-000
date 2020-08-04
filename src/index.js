console.log('%c HI', 'color: firebrick')
let breeds = [];
function fetchDogs() {
  return fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(resp => resp.json())
  .then(json => renderDogs(json));
}

function fetchBreeds(){
  return fetch('https://dog.ceo/api/breeds/list/all')
  .then(resp => resp.json())
  .then(json => renderBreeds(json));
}

function selectBreedsStartingWith(letter){
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function updateBreedList(breeds) {
  let ul = documet.querySelector('dog-breeds');
  breeds.forEach(breed => listItems(breed));
}

function renderBreeds(json) {
  const dropdown = document.getElementById('breed-dropdown');
  let breeds  = Object.keys(json.message);
  dropdown.addEventListener('change', function(event){
    selectBreedsStartingWith(event.target.value);
  });
//   let newBreeds = dropdown.setAttribute("onchange", function(){
//     breeds.filter(item => {
//       return item.slice(0,1) === dropdown.value;
//   });
// });
    listItems(breeds);
}



function listItems(breeds){
  breeds.forEach(breed => {
    const ul = document.getElementById('dog-breeds');
    const li = document.createElement('li');
    const st = document.createElement('style');
    li.appendChild(st);
    li.innerHTML = `${breed}`;
    li.onclick = function(){
      li.style.color = '#f15025'
    };
    ul.appendChild(li);
  })
}


function renderDogs(json) {
  const img = document.getElementById('dog-image-container')
  json.message.forEach(dog => {
    const dogImg = document.createElement('img');
    dogImg.src = dog;
    dogImg.style.width = "500px";
    dogImg.style.height = "500px";
    img.appendChild(dogImg);
  })
}

document.addEventListener("DOMContentLoaded", function() {
  fetchDogs();
  fetchBreeds();
})
