'use strict';

var Alexa = require('alexa-sdk');
var i;
var number;
var handlers = {

  'LaunchRequest': function() {
    this.attributes['game'] = '';
    this.attributes['guess'] = '';
   
    this.response
        .speak('Try our latest game crazy cricket. Welcome to Voice Games. Recommended before playing this game please go through the instructions, Today we have guessing game. To start say guessing game.' ).listen(
        'To start say guessing game.');
    this.emit(':responseReady');
  },

  'SetMyGameIntent': function() {
          this.attributes['game'] = this.event.request.intent.slots.games.value;
    var game = this.attributes['game'];
    
    if (game === 'guessing') {
            i=3;
            number = Math.floor(Math.random() * (11 - 1)) + 1;
         this.response
          .speak('Lets start, select a number between 1 to 10.').listen('select a number between 1 to 10');
    }
   
    else {
     
      this.response
          .speak('Sorry i didnot get that If you want to end just say stop.').listen();
    }
    this.emit(':responseReady');
  },
  'SetMyGuessIntent': function(){
          i--;
           this.attributes['guess'] = this.event.request.intent.slots.guess.value;
           var guess = this.attributes['guess'];
          if (guess == number) 
          {
                this.response.speak('Congratulations, you have got it.');
          }
          else if (i >= 1)
          {
                this.response.speak('nope, you have ' + i + ' more chance left.').listen();
          }
          else
          {
                this.response.speak('Sorry, you failed. My number is ' + number);
                
          }
          this.emit(':responseReady');
  },
  
  'SetMyInstructionIntent': function(){
        this.response.speak('Here are your instructions: ' + 
        ' In this game i will select a number randomly in between 1 to 10. You will have to guess what I have selected.' +
        ' Now rules: ' +
        ' 1. You will have 3 lifes.' +
        ' 2. Once the answer is given, you cannot change it.' +
        ' Lets start, So what would you like to play?' +
        ' Guessing game. OR words game.').listen('Guessing game. OR words game.');
        this.emit(':responseReady');
  },

  // Stop
  'AMAZON.StopIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },

  // Cancel
  'AMAZON.CancelIntent': function() {
      this.response.speak('Ok, let\'s play again soon.');
      this.emit(':responseReady');
  },
  
  //Help
   'AMAZON.HelpIntent': function () {
         this.response.speak('You can call 911, or ask for instructions about the game. What would you like to do?').listen('What can I help you with?');
         this.emit(':responseReady');
 }
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
