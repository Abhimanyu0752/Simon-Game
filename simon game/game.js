var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern=[];

level=0;

started=false;




$(document).on("keydown",function(){

if(!started){
$("#level-title").text("level" + level);
  newSequence();
  started=true;
}

});



$(".btn").on("click",function(){
 var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);

});



function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
console.log("success");
    if(gamePattern.length === userClickedPattern.length){

setTimeout(function(){
newSequence();
},1000);

    }
  }

  else{

    var audio_w = new Audio('sounds/wrong.mp3');
    audio_w.play();

    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function(){

      $("body").removeClass("game-over");
    },200);

   $(document).on("keydown",function(){
startOver();

   });

  }
}




function newSequence(){

  userClickedPattern=[];

level++;

$("#level-title").text("level" + level);

  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);


var randomChosenColour= buttonColours[randomNumber];

gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
animatePress(randomChosenColour);

}



function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColor){

$("#" + currentColor).addClass("pressed");
setTimeout(function(){
  $("#" + currentColor).removeClass("pressed");
},100)

}



function startOver(){
level=0;
gamePattern=[];
started=false;

}
