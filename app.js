$(document).ready(function() {

/*set global variables to access no matter the scope
to initialize the game. score, the level, and sequence is tracked
*/
var level = 0;
var sequence = [];
var userSequence = [];
var buttons = $('.button-clicked');
var counter = 0;

/*Taken from http://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

Gives me a random number, in this case from 0-3 and then is
returned to use in the next function.
*/
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* getRandomColor is used to implement the random integer from
above and gets passed to pick a random color each sequence
*/
var getRandomColor = function() {
  var colors = ["#red", "#blue", "#yellow", "#green"];

  return colors[getRandomInt(0, 3)];
}

/* runGame function increments the round each time and
pushes a new random color each round/sequence.
*/
var scored = function() {
  var playerScore = ($('.score')[0].innerText);

  return playerScore;
}


var runGame = function(roundNo) {
  round = roundNo + 1;
  $('#gameOver').hide();

  sequence.push(getRandomColor());
  console.log(sequence);

  setTimeout(function() {
    toggleColors();
  }, 1000);
};

  //Runs through the sequence and toggles the opacity class
  //on each interation through the current sequence array.

var toggleColors = function() {
var counter = 0;
var colorOff = true;

// Keeps track of the 'state' of current color block
var stop = setInterval(function() {
  $(sequence[counter]).toggleClass('opaque');
    // Check if current block is turned on or off
    // If block is turned off, do nothing
    // If block is turned on, increment counter and "move on"
  if(colorOff) {
    colorOff = false;
  } else {
    colorOff = true;
    counter++;
  }
    // If we reach the end of the sequence, exit out of Interval
  if(counter > sequence.length) {
    clearInterval(stop);
  }
 }, 400);
};


/* If the player matches the sequence increase the sequence and the
level, if the player wins the level increment it and change the html
to whatever our global variable is tracking and then display it on the page
if the player loses then hide the level and display our game over div. */
buttons.on('click', function() {
  if (sequence[counter] === `#${$(this).attr('id')}`) {
    var buttons = $(this);
    buttons.toggleClass('opaque');
     setTimeout(function() {
      buttons.toggleClass('opaque');
     }, 500);
     counter++
     if(counter === sequence.length){
      level++
      $('#level').html(level);
      counter = 0;
      runGame();

     }
    } else {
      $('#gameOver').html('Game Over');
      $('#level').hide();
    }
  });


//initiates our game once the player clicks on our game button

$('#start').on('click', runGame);


});
