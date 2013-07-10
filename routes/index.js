
/*
 * GET home page.
 */

var allSessions= [];
var uuid = require('node-uuid');

// Sets up first page to the Guessing Game.

exports.index = function(req, res){
  res.render('index');
};

exports.start = function(req, res){
  res.render('start');
};

exports.Batman = function(req, res){
  res.render('Batman');
};

exports.Thomas = function(req, res){
  res.render('Thomas');
};

exports.Martha = function(req, res){
  res.render('Martha');
};

exports.Bruce = function(req, res){
  res.render('Bruce');
};

exports.Batcave = function(req, res){
  res.render('Batcave');
};

exports.firstguess = function(req, res){
  res.render('firstguess');
};

 // creates session for the game with the variables stored in each session bassed on the uuid

exports.startview= function(req, res){
	var  i=0;
	var computerGuess=1+ Math.floor(Math.random()*1000);
	var guessHistory= [];
	var answerHistory= []; 
	var answer1= 'No input';
	var id = uuid.v1();
	sessionDetails={
		gh : guessHistory,
		ah : answerHistory,
		cg : computerGuess,
		i : i
	};
	console.log(id);

	// if seesion exists, it is set, if not the uuid is assigned to the session.

	if ( req.session.a1 ){
		console.log('Session is set ' + req.session.a1);
	}else {
		console.log('Session is not set, setting it now');
		req.session.a1= id;
	}
 
	allSessions[id]= sessionDetails;


	res.render('guessHandler', {guess: req.body.userguess, answer1: answer1, computerGuess: computerGuess, guessHistory: guessHistory, answerHistory: answerHistory, i: i});
};

exports.guessHandler = function(req, res){

	// if session exists, uses it, if not returns to home page.

	if ( req.session.a1 ){
		console.log('Session is set ' + req.session.a1);
	}else {
		res.render('index');
		return;
	}

		// variable specific to the individual guesser declared and stored in session details

		var thisSessionDetails = allSessions[req.session.a1]
		var guess= req.body.userguess;
		var answer1;
		var guessNumber=7; // guessNumber +1= total guesses
		thisSessionDetails.i=thisSessionDetails.i+1;
	
	// if past max guess number either goes to win or lose

	if (thisSessionDetails.i>guessNumber){
	
	 	thisSessionDetails.ah[thisSessionDetails.i-1]= answer1;
		thisSessionDetails.gh[thisSessionDetails.i-1]= guess;
	   	
			if(guess>= thisSessionDetails.cg && guess <= thisSessionDetails.cg){
				req.session=null;	
				thisSessionDetails.ah[thisSessionDetails.i-1]= "CORRECT";
			
			res.render('win',{ computerGuess: thisSessionDetails.cg, guessHistory: thisSessionDetails.gh, answerHistory: thisSessionDetails.ah});

			// session cleared so user can restart game

				thisSessionDetails.i=0;
				thisSessionDetails.gh=[];
				thisSessionDetails.ah=[];
				thisSessionDetails.cg= 1+Math.floor(Math.random()*1000);
				
			}else{
				thisSessionDetails.ah[thisSessionDetails.i-1]= "WRONG";
				
				res.render('lose',{ computerGuess: thisSessionDetails.cg, guessHistory: thisSessionDetails.gh, answerHistory: thisSessionDetails.ah});

				req.session=null;
				thisSessionDetails.i=0;
				thisSessionDetails.gh=[];
				thisSessionDetails.ah=[];
				thisSessionDetails.cg= 1+Math.floor(Math.random()*1000);

	// determines if guess is too high or low and diverts to proper route based on the respons

	}}else{
		console.log('Computer guess is ' + thisSessionDetails.cg);
		console.log("User guess is " + guess);

		thisSessionDetails.gh[thisSessionDetails.i-1]= guess;

		if( guess > thisSessionDetails.cg){
			answer1= 'LOWER';
			thisSessionDetails.ah[thisSessionDetails.i-1]= answer1; 

			// page is opened again with updated information

			res.render('guessHandler',{guess: req.body.userguess, answer1: answer1, guessHistory: thisSessionDetails.gh, answerHistory: thisSessionDetails.ah, i: thisSessionDetails.i});

		}else if(guess < thisSessionDetails.cg){
			answer1= 'HIGHER';
			thisSessionDetails.ah[thisSessionDetails.i-1]= answer1; 

			// page is opened again with updated information

			res.render('guessHandler',{guess: req.body.userguess, answer1: answer1, guessHistory: thisSessionDetails.gh, answerHistory: thisSessionDetails.ah, i: thisSessionDetails.i});

		}else if(guess>= thisSessionDetails.cg && guess <= thisSessionDetails.cg) {
			req.session=null;
			thisSessionDetails.ah[thisSessionDetails.i-1]= "CORRECT";
			
		// if user guess correctly before last guess, same win page is opened
			
			res.render('win',{ computerGuess: thisSessionDetails.cg, guessHistory: thisSessionDetails.gh, answerHistory: thisSessionDetails.ah});

			thisSessionDetails.i=0;
			thisSessionDetails.gh=[];
			thisSessionDetails.ah=[];
			thisSessionDetails.cg= 1+Math.floor(Math.random()*1000);
		
		// if the guess is not low, high, or correct it is deemed wrond. This is for when a letter or word is used instead of a number.		

		}else {
			answer1= 'WRONG';
			thisSessionDetails.ah[thisSessionDetails.i-1]= answer1; 
			
			guess= null;
			
			res.render('guessHandler',{guess: guess, answer1: answer1, guessHistory: thisSessionDetails.gh, answerHistory: thisSessionDetails.ah, i: thisSessionDetails.i});

		}}
		};


