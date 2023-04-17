const gameContainer = document.getElementById("game");
let selection1 = null;
let selection2 = null;
let correct = 0;
let noClicking = false;
let initial = 6;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add('default');
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // let select = event.target.className;
  // event.target.style.backgroundColor = select;
  document.body.style.backgroundColor = 'black';
  if (noClicking) return;
  if (event.target.classList.contains('flipped')) return;
  event.target.classList.toggle('default'); 
 
  let currentClick = event.target;
  if (!selection1 || !selection2) {
    currentClick.classList.add('flipped');
    selection1 = selection1 || currentClick;
    selection2 = currentClick === selection1 ? null : currentClick;

  }

  if (selection1 && selection2) {
    noClicking = true;

    let answer1 = selection1.className;
    let answer2 = selection2.className;

    if ( answer1 === answer2) {
      correct += 2;
      selection1.removeEventListener('click', handleCardClick);
      selection2.removeEventListener('click', handleCardClick);
      selection1 = null;
      selection2 = null;
      noClicking = false;
      initial = initial + correct;
    }
    else{
      setTimeout(function (){
        selection1.classList.toggle('default'); 
        selection2.classList.toggle('default'); 
        selection1.classList.remove('flipped'); 
        selection2.classList.remove('flipped');
        selection1 = null;
        selection2 = null;
        noClicking = false; 
        initial --;
      },1000)
    }
  }
  
  

  

  // you can use event.target to see which element was clicked
  
  console.log("you just clicked", event.target);
  console.log(initial);
  document.getElementById('num').innerHTML = initial ;
  if (correct === COLORS.length || initial <= 0) alert("game over!");
}


// when the DOM loads
createDivsForColors(shuffledColors);
