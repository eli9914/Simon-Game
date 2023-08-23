var gamePattern = []
var buttonColours = ['red', 'blue', 'green', 'yellow']
var userClickedPattern = []
var level = 0
var started = false

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level ' + level)
    nextSequence()
    started = true
  }
})

$('.btn').click(function hr() {
  userChosenColour = $(this).attr('id')
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  console.log(userClickedPattern)
  checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(function () {
      $('body').removeClass('game-over')
      $('#level-title').text('Game Over, Press Any Key to Restart')
    }, 200)

    startOver()
  }
}

function nextSequence() {
  userClickedPattern = []
  level++
  $('#level-title').text('Level ' + level)
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)
  animatePress(randomChosenColour)
  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  console.log(gamePattern)
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')

  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

function startOver() {
  gamePattern = []
  buttonColours = ['red', 'blue', 'green', 'yellow']
  level = 0
  started = false
}
