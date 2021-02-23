var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isSucc=true;
var isStarted=false;

$(document).on('keypress', function(e) {
  if(isStarted == false)
  {
  isStarted=true;
  nextSquence();
  }

});

function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

function startOver()
{
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  isStarted = false;
  isSucc=true;
}

function checkAnswer(currentLevel) {

  var lengthOfUserPattern = userClickedPattern.length;
  var lengthOfGamePattern = gamePattern.length;
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel])
    isSucc=false;



  if (lengthOfGamePattern == lengthOfUserPattern)
  {
      if(isSucc == true)
      {
        setTimeout(function() {
          nextSquence();
        }, 1000);
      }
      else //failed
      {
      userFailed();
      }
    }
}

function userFailed()
{
  playSound("sounds/wrong.mp3");
  $('body').addClass('game-over');
  var delayInMilliseconds = 200;
  setTimeout(function() {
    $('body').removeClass('game-over');
  }, delayInMilliseconds);
  $('h1').text('Game Over, Press Any Key to Restart')
  startOver();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  var delayInMilliseconds = 100;
  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, delayInMilliseconds);
}

function nextSquence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  randomNumber = Math.floor((Math.random() * 4)); //number between 0-3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound("sounds/" + randomChosenColour + ".mp3");
}

//when user clicked on button handler
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound("sounds/" + userChosenColour + ".mp3");
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});
