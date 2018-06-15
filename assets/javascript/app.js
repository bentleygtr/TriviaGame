$(document).ready(function () {
    var options = [
            {
                question: "What was the peak subscriber count in World of Warcraft?",
                choice: ["10 million", "20 million", "14 million", "5 million"],
                answer: 2,
                photo: "assets/images/World_of_warcraft_logo.jpg"
            },
            {
                question: "What game has sold the most copies world-wide?",
                choice: ["Tetris", "Super Mario Bros.", "Pokemon Red and Blue", "Shrek: The Videogame"],
                answer: 0,
                photo: "assets/images/Tetris_Boxshot.jpg"
            },
            {
                question: "What video game console sold the most world-wide?",
                choice: ["Nintendo DS", "Xbox 360", "Wii", "PlayStation 2"],
                answer: 3,
                photo: "assets/images/PS2.jpg"
            },
            {
               question: "How many Fortnite accounts have been made within the past 2 years?",
               choice: ["30 million", "80 million", "125 million", " 50 million"], 
               answer: 2,
               photo: "assets/images/fort.jpg"
            },
            {
                question: "What is the highest grossing video game franchise?",
                choice: ["Mario", "Pokemon", "Call of Duty", "Grand Theft Auto"],
                answer: 0,
                photo: "assets/images/mario.jpg"
            },
            {
                question: "What is the largest sum of money in a video game tournament prize pool?",
                choice: ["5 million dollars USD", "12 million dollars USD", "17 million dollars USD", "20 million dollars USD"],
                answer: 2,
                photo: "assets/images/dota.jpg"
            },
            {
                question: "What year were the original Pokemon gameboy games released?",
                choice: ["1994", "2001", "1996", "1993"],
                answer: 2,
                photo: "assets/images/pokemon.jpg"
            },
            {
                question: "What's the highest selling Final Fantasy Game?",
                choice:["FF7", "FF10", "FF8", "FF11"],
                answer: 0,
                photo: "assets/images/FF7logo.jpg"
            },
            {
                question: "What's the name of the main character in the Witcher 3?",
                choice: ["Tom", "Geralt", "Kratos", "Utheran"],
                answer: 1,
                photo: "assets/images/w3.jpg"
            },
            {
                question: "What are you most hype for from this year's E3?",
                choice: ["Fallout 76", "Elder Scrolls: 6", "Both Samurai Games", "CyberPunk 2077"],
                answer: 1 || 2 || 3 || 0,
                photo: "assets/images/e3.jpg"
            }];
var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})

