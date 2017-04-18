// ----
// DATA
// ----

// A couple jokes to start with
var jokes = {
  'the horse': {
    setup: 'A horse walks into the bar. The bartender asks...',
    punchline: 'Why the long face?'
  },
  'Orion\'s pants': {
    setup: 'How does Orion keep his pants up?',
    punchline: 'With an asteroid belt.'
  }
}

var stringFiedJoke = window.localStorage.getItem('joke')
if (stringFiedJoke) {
  jokes = JSON.parse(stringFiedJoke)
} else {
  stringFiedJoke = JSON.stringify(jokes)
  window.localStorage.setItem('joke', stringFiedJoke)
}

// The message to display if the jokes object is empty
var noJokesMessage = 'I... I don\'t know any jokes. 😢'

// -------------
// PAGE UPDATERS
// -------------

// Update the listed jokes, based on the jokes object
var jokesMenuList = document.getElementById('jokes-menu')
var updateJokesMenu = function () {
  // Don't worry too much about this code for now.
  // You'll learn how to do advanced stuff like
  // this in a later lesson.
  var jokeKeys = Object.keys(jokes)
  var jokeKeyListItems = jokeKeys.join('</li><li>') || noJokesMessage
  jokesMenuList.innerHTML = '<li>' + jokeKeyListItems + '</li>'
}

// Update the displayed joke, based on the requested joke
var requestedJokeInput = document.getElementById('requested-joke')
var jokeBox = document.getElementById('joke-box')
var updateDisplayedJoke = function () {
  var requestedJokeKey = requestedJokeInput.value
  if (jokes[requestedJokeKey]) {
    jokeBox.innerHTML =
    '<p>SETUP</p>' +
    '<p>PUNCHLINE</p>'
  } else {
    jokeBox.textContent = 'No matching joke found.'
  }
}

// Function to keep track of all other
// page update functions, so that we
// can call them all at once
var updatePage = function () {
  updateJokesMenu()
  updateDisplayedJoke()
}

// -------
// STARTUP
// -------

// Update the page immediately on startup
updatePage()

// ---------------
// EVENT LISTENERS
// ---------------

// Keep the requested joke up-to-date
requestedJokeInput.addEventListener('input', updateDisplayedJoke)

var rememberButton = document.getElementById('rememberButton')
var JokeKey = document.getElementById('theJoke')
var setUp = document.getElementById('setUp')
var punchlineInfo = document.getElementById('punchlineForNew')
var updateTheJoke = function () {
  jokes[JokeKey.value] = {
    setup: setUp.value,
    punchline: punchlineInfo.value
  }
  updateJokesMenu()
  var stringFiedJoke = JSON.stringify(jokes)
  window.localStorage.setItem('joke', stringFiedJoke)
}

rememberButton.addEventListener('click', updateTheJoke)

var forgetJoke = document.getElementById('forgetJoke')
var jokeToForget = document.getElementById('jokeToForget')

var deleteTheJoke = function () {
  if (jokes[jokeToForget.value]) {
    delete jokes[jokeToForget.value]
  }
  updateJokesMenu()
  var stringFiedJoke = JSON.stringify(jokes)
  window.localStorage.setItem('joke', stringFiedJoke)
}

forgetJoke.addEventListener('click', deleteTheJoke)
