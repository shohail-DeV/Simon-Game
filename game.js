var buttonColours=["red", "blue", "green", "yellow"]; //Storing the colours

var userClickedPattern=[]; //To maintain the pattern by user

var gamePattern=[]; //To keep track of game pattern

var started=false; //Initialize the value with false

var level=0; //Setting the level of game to zero

//Function to begin the game .
$(document).keydown(function() {
if(!started)
$("#level-title").text("Level " + level);
  nextSequence();
  started = true;
});

//To carry out the click-operations.
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

//Generates a new sequence.
function nextSequence(){
userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber=Math.floor(Math.random() * (3 + 1));
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

//To carry-out the animation when a button is clicked.
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function() {
  $("#"+currentColor).removeClass("pressed");
}, 100);
}

//To check for the correctness of pattern between the generated one and the one the useer is entering.
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
} else {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}
}

//To play the sound.
function playSound(name){
  var audio = new Audio(name+".mp3");
audio.play();
}

//To reset the values at end of game and begin over.
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
