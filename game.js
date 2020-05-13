var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var hasStarted = false;

var level = 0;


$("body").mousedown(function() {
  if (!hasStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    hasStarted = true;
  }
});


$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatepress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}
function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {

    gameOver();

  }

}


function gameOver(){
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Press anywhere to Start");
  startOver();

}

function startOver(){
  gamePattern = [];
  level = 0;
  hasStarted = false ;
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatepress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
