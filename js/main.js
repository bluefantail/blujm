// Initialise Smooth Scroll and Gumshoe for Navigation
gumshoe.init();
smoothScroll.init({
    speed: 560, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    offset: -1, // Integer. How far to offset the scrolling anchor location in pixels
    updateURL: true, // Boolean. If true, update the URL hash on scroll
});

// Forms
var playerElements = document.querySelectorAll('#player-select>label');
var	players = document.querySelector('#players');
var teamMessage = document.querySelector('#team-message');

// FUNCTIONS
// Events
function handle_click(event) {
	playerNum = event.currentTarget.getAttribute("id");
	console.log(playerNum + " players selected");
	set_players(playerNum);
	insert_player_feilds(playerNum);
	message(playerNum);
}
// DOM Manipulation
function set_players(playerCount) {
	var count = playerCount;
	Array.prototype.forEach.call(playerElements, function(element) {
		element.setAttribute('class', '');
		if (count > 0) {
			element.setAttribute('class', 'set');
		}
		count -= 1;
	})
}
function insert_player_feilds(playerCount){
	var	count = playerCount;
	players.innerHTML = "";
	do {
		players.insertAdjacentHTML('afterbegin', '<input type="text" name="Player ' + count + '" placeholder="Name (Player ' + count + ')" required>');
		count -= 1; 
	} while (count > 0);
}
function message(playerCount){
	var message = "";
	switch (playerCount) {
		case '1':
			message = "<div>Lone Wolf.</div>";
			break;
		case '2':
			message = "<div>Dynamic Duo.</div>";
			break;
		case '3':
			message = "<div>Musketeers.</div>";
			break;
		case '4':
			message = "<div>Camping!</div>";
			break;
		case '5':
			message = "<div>Perfect Prime.</div>";
			break;
	}
	teamMessage.innerHTML = message;
}
// END FUNCTIONS

// LISTENERS
Array.prototype.forEach.call(playerElements, function(element) {
	element.addEventListener("click", handle_click);
})
// END LISTENERS

// Handle team submissions (adapted from cloudstitch 'Magic Forms' examples)
var sendForm = function() {
	var entryForm = document.getElementsByClassName('magic-form')[0];	   
	var xhr = new XMLHttpRequest();
	xhr.open(entryForm.getAttribute('method'), entryForm.getAttribute('action')); 
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	xhr.onload = function() {
		console.log("Form Sent:");
		console.log("Response Code: " + xhr.status + "\nResponse Text: " + xhr.responseText);
		entryForm.insertAdjacentHTML('beforebegin', '<div id="entry-confirmation">Thanks! A human will get back to you with a confirmation once that is processed.</div>');
		entryForm.setAttribute('style', 'display: none');
	};
	
	var inputs = entryForm.getElementsByTagName('INPUT');
	var pairs = [];
	
	for (var i = 0; i < inputs.length; i++) {
		pairs.push(encodeURI(inputs[i].getAttribute('name')) + '=' + encodeURI(inputs[i].value));
	}  
	
	xhr.send(pairs.join('&'));        
}

document.getElementById('team-submit').addEventListener('click', function(e) {
	e.stopPropagation();
	e.preventDefault();
	sendForm();
	return false;
}, true);

// Logs
console.log('Forms');
console.log('-------------------------------------------------');
console.log('Players Object:');
console.log(playerElements);
console.log('-------------------------------------------------');