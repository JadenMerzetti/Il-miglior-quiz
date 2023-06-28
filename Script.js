document.addEventListener('DOMContentLoaded', function() {
  var timerDuration = 120;

  function startTimer() {
    var timerValueElement = document.getElementById('timeValue');
    timerValueElement.textContent = formatTime(timerDuration);
    timerInterval = setInterval(function() {
      timerDuration--;
      timerValueElement.textContent = formatTime(timerDuration);
      if (timerDuration === 0) {
        endGame();
      }
    }, 1000);
  }

  function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return formattedMinutes + ':' + formattedSeconds;
  }

  function endGame() {
    console.log('Game has Ended');
    window.location.href = 'HighScoresPage.html';
  }

  var questions = [
    {
      Label: "Question 1",
      question: "Which of these statements is NOT correct?",
      answers: [
        { text: "JavaScript can be used for doing math within a webpage.", isCorrect: false },
        { text: "JavaScript only runs within the browser without NODE.js.", isCorrect: false },
        { text: "JavaScript is the tool that you use to add style to your webpage.", isCorrect: true },
        { text: "JavaScript allows the user to interact with a webpage.", isCorrect: false }
      ]
    },
    {
      Label: "Question 2",
      question: "What is the output of the following code: console.log(2 + 2);",
      answers: [
        { text: "4", isCorrect: false },
        { text: "22", isCorrect: true },
        { text: "22.0", isCorrect: false },
        { text: "NaN", isCorrect: false }
      ]
    },
    {
      Label: "Question 3",
      question: "Which of the following is NOT a JavaScript data type?",
      answers: [
        { text: "String", isCorrect: false },
        { text: "Array", isCorrect: false },
        { text: "Variable", isCorrect: false },
        { text: "Float", isCorrect: true }
      ]
    },
    {
      Label: "Question 4",
      question: "JavaScript is considered a strictly typed language?",
      answers: [
        { text: "False", isCorrect: true },
        { text: "True", isCorrect: false },
        { text: "Truly False", isCorrect: false },
        { text: "What is JavaScript?", isCorrect: false }
      ]
    },
    {
      Label: "Question 5",
      question: "What is the result of the following expression: 10 % 3?",
      answers: [
        { text: "7", isCorrect: false },
        { text: "10", isCorrect: false },
        { text: "3", isCorrect: false },
        { text: "1", isCorrect: true }
      ]
    }
  ];
  var currentQuestionIndex = 0;
  var currentQuestion = questions[currentQuestionIndex];

  function updateQuestion() {
    var questionLabelElement = document.getElementById('question-label');
    var questionTextElement = document.getElementById('question-text');
    var answerElements = document.querySelectorAll('.answer-list li');

    if (questionLabelElement && questionTextElement && answerElements) {
    questionLabelElement.textContent = currentQuestion.Label;
    questionTextElement.textContent = currentQuestion.question;

    }

    currentQuestion.answers.forEach(function(answer, index) {
      var answerInputElement = answerElements[index].querySelector('input');
      var answerLabelElement = answerElements[index].querySelector('label');

      answerInputElement.value = index + 1;
      answerInputElement.checked = false;
      answerLabelElement.textContent = answer.text;

      if (answer.isCorrect) {
        answerInputElement.dataset.correct = true;
      } else {
        delete answerInputElement.dataset.correct;
      }
    });
  }

  function handleButtonClick() {
    document.querySelectorAll('input[name="answer"]').forEach(function (answer) {
      answer.disabled = true;
    });

    document.getElementById('confirmButton').disabled = true;
    document.getElementById('nextButton').disabled = false;

    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
      if (selectedAnswer.dataset.correct) {
        console.log("Correct answer!");
        document.getElementById('message').textContent = 'Correct!';
        timerDuration += 5;
      } else if (!selectedAnswer.dataset.incorrect) {
        timerDuration -= 10;
        console.log("Incorrect answer!");
        document.getElementById('message').textContent = 'Incorrect!'; 
      } 
    }
  }
  var confirmButton = document.getElementById('confirmButton');
  var nextButton = document.getElementById('nextButton');

  if (confirmButton && nextButton) {
  document.getElementById('confirmButton').addEventListener('click', function() {
    handleButtonClick();
  });

    
  document.getElementById('nextButton').addEventListener('click', function() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      currentQuestion = questions[currentQuestionIndex];
      updateQuestion();

      document.getElementById('message').textContent = '';
      document.querySelectorAll('input[name="answer"]').forEach(function(answer) {
        answer.disabled = false;
      });

      document.getElementById('confirmButton').disabled = false;
      document.getElementById('nextButton').disabled = true;
    } else {
      endGame();
    }
    
  });

  updateQuestion();
  startTimer();
  }
});

function playAgain() {
  window.location.href = 'index.html';
}








  
      
  
  
  
  
  
  
  
  
  





  

