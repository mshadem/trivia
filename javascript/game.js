exports = typeof window !== "undefined" && window !== null ? window : global;

exports.Game = function() {
  //local
  var players = [], places = [], purses = [], inPenaltyBox = [];
  var popQuestions = [], scienceQuestions = [], sportsQuestions = [], rockQuestions = [];
  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function(){
    return !(purses[currentPlayer] == 6)
  };

  var currentCategory = function(){
	var categories = ['Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Science', 'Sports', 'Rock', 'Pop', 'Rock', 'Sports'];
	return categories[places[currentPlayer]];
  };

  var askQuestion = function() {
    if(currentCategory() == 'Pop')
      console.log(popQuestions.shift());
    if(currentCategory() == 'Science')
      console.log(scienceQuestions.shift());
    if(currentCategory() == 'Sports')
      console.log(sportsQuestions.shift());
    if(currentCategory() == 'Rock')
      console.log(rockQuestions.shift());
  };  
  
  //global

  this.add = function(playerName){
    players.push(playerName);
    places[players.length - 1] = 0;
    purses[players.length - 1] = 0;
    inPenaltyBox[players.length - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.roll = function(roll){
	var player = players[currentPlayer];
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);
    if (inPenaltyBox[currentPlayer]){
      if (roll % 2 != 0){
        isGettingOutOfPenaltyBox = true;
        console.log(player + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11){
          places[currentPlayer] = places[currentPlayer] - 12;
        }
        console.log(player + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + currentCategory());
        askQuestion();
      } else {
        console.log(player + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11){
        places[currentPlayer] = places[currentPlayer] - 12;
      }
      console.log(player + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " + purses[currentPlayer]  + " Gold Coins.");
        var winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length) {
          currentPlayer = 0;
	    }
        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length) {
          currentPlayer = 0;
	    }
        return true;
      }
    } else {
      console.log("Answer was correct!!!!");
      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " + purses[currentPlayer]  + " Gold Coins.");
      var winner = didPlayerWin();
      currentPlayer += 1;
      if(currentPlayer == players.length) {
        currentPlayer = 0;
	  }
      return winner;
    }
  };

  this.wrongAnswer = function() {
	console.log('Question was incorrectly answered');
	console.log(players[currentPlayer] + " was sent to the penalty box");
	inPenaltyBox[currentPlayer] = true;
    currentPlayer += 1;
    if (currentPlayer == players.length) {
      currentPlayer = 0;
    }
	return true;
  };
  
  
  // initialize
  for(var i = 0; i < 50; i++){
    popQuestions.push("Pop Question "+i);
    scienceQuestions.push("Science Question "+i);
    sportsQuestions.push("Sports Question "+i);
    rockQuestions.push("Rock Question "+i);
  };
};

var notAWinner = false;
var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do{
  game.roll(Math.floor(Math.random()*6) + 1);

  if (Math.floor(Math.random()*10) == 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);
