$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
})
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: 'When was the first Star Wars movie released?',
      q2: 'Who is the leading actor of the movie Big Trouble in Little China?',
      q3: 'Which movie was released first?',
      q4: 'Who is the most successful American movie director?',
      q5: 'What is considered to be the first slasher horror movie?'
    },
    options: {
      q1: ['1975', '1977', '1979', '1981'],
      q2: ['Kurt Russell', 'Robert Redford', 'Tom Cruise', 'Jude Law'],
      q3: ['Reservoir Dogs', 'Pulp Fiction', 'Kill Bill', 'Inglorious Basterds'],
      q4: ['Steven Spielberg', 'Ron Howard', 'Michael Bay', 'George Lucas'],
      q5: ['Saw','The Exorcist','The Texas Chainsaw Massacre','The Silence of the Lambs']
    },
    answers: {
      q1: '1977',
      q2: 'Kurt Russell',
      q3: 'Reservoir Dogs',
      q4: 'Steven Spielberg',
      q5: 'The Texas Chainsaw Massacre'
    },

    startGame: function(){
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      $('#results').html('');
      $('#timer').text(trivia.timer);
      $('#start').hide();
      $('#remaining-time').show();
      
      trivia.nextQuestion();
    },



    nextQuestion : function(){
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
    },


    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Not fast enough! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        $('#results')
          .html('<h3>Thanks for playing the movie trivia game!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Want to play again?</p>');
        
        $('#game').hide();
        $('#start').show();
      }
    },



    guessChecker : function() {
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>You are correct!</h3>');
      }

      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Try not sucking! Right answer was:  '+ currentAnswer +'</h3>');
      }
    },



    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();     
    }
  }