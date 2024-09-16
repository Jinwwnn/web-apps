// Simon game, from level 1 - level 2.
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


// Game Process
var started = false;
var level = 0;

// Start the game
// detect if a key is pressed. When pressed at the first time, start the game.
$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

// check which button is pressed and then handle.
$(".btn").click(function() {
    // find the id of the clicked button.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // check if the answer is right.
    checkAnswer(userClickedPattern.length - 1);
});



function nextSequence() {
    // empty the used pattern.
    userClickedPattern = [];
    // add level once this function is called.
    level++;
    // update h1 text.
    $("#level-title").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// play sound according to the color name.
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// add animation for pressed button.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        // if it's wrong, play wrong music.
        playSound("wrong");
        
        //change to css wrong style.
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
