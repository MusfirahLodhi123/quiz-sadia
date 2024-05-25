var firebaseConfig = {
    apiKey: "AIzaSyAA6CoHWqb8-rkMU9sLISgxaieO2l7HPMc",
    authDomain: "quizz-app-c4c15.firebaseapp.com",
    projectId: "quizz-app-c4c15",
    databaseURL: "https://quizz-app-c4c15-default-rtdb.firebaseio.com",
    storageBucket: "quizz-app-c4c15.appspot.com",
    messagingSenderId: "898970103012",
    appId: "1:898970103012:web:27396206333a4980c9d0f1"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  var studentName = prompt("Please enter your name:");

var questions = [
    {
    question: "Which HTML tag is used to define a table row?",
    option1: "<td>",
    option2: "<tr>",
    option3: "<table>",
    corrAnswer: "<tr>"
    },
    {
        question: "What is the correct way to write an inline CSS style?",
        option1: "<style>",
        option2: "<css>",
        option3: "style",
        corrAnswer: "style"
      },
      {
        question: "Which CSS property is used to control the spacing between elements?",
        option1: "margin",
        option2: "padding",
        option3: "space",
        corrAnswer: "margin"
      },
      {
        question: "In JavaScript, how do you declare a variable?",
        option1: "var myVar;",
        option2: "variable myVar;",
        option3: "v myVar;",
        corrAnswer: "var myVar;"
      },
      {
        question: "What is the correct way to write a comment in CSS?",
        option1: "/* This is a comment */",
        option2: "// This is a comment",
        option3: "<!-- This is a comment -->",
        corrAnswer: "/* This is a comment */"
      },
      {
        question: "Which HTML tag is used to create a hyperlink?",
        option1: "<link>",
        option2: "<a>",
        option3: "<href>",
        corrAnswer: "<a>"
      },
      {
        question: "In JavaScript, which method is used to add an element to the end of an array?",
        option1: "push()",
        option2: "pop()",
        option3: "splice()",
        corrAnswer: "push()"
      },
      {
        question: "What is the correct syntax for referring to an external script called 'script.js'?",
        option1: "<script src='script.js'>",
        option2: "<script href='script.js'>",
        option3: "<link href='script.js'>",
        corrAnswer: "<script src='script.js'>"
      },
      {
        question: "In JavaScript, what does DOM stand for?",
        option1: "Document Object Model",
        option2: "Document Order Method",
        option3: "Data Object Model",
        corrAnswer: "Document Object Model"
      },
      {
        question: "Which CSS property is used to change the text color of an element?",
        option1: "color",
        option2: "text-color",
        option3: "font-color",
        corrAnswer: "color"
      },
];

// Get the HTML elements for the question, options, and timer
var ques = document.getElementById('ques');
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var timer = document.getElementById("timer");

// Initialize variables for the current question index, score, and timer
var index = 0;
var score = 0;
var min = 1;
var sec = 59;

// Set up the timer to decrement every second and call nextQuestion() when time's up
setInterval(function(){
  timer.innerHTML = `${min}:${sec}`;
  sec--;
  if(sec<0){
    min--;
    sec = 59;
    if(min<0){
      min=1;
      sec = 59;
      nextQuestion();
    }
  }
},1000);

// Function to handle the next question
function nextQuestion(){
  // Get the selected option
  var getOptions = document.getElementsByName("option");
  for(var i =0; i<getOptions.length; i++){
    if(getOptions[i].checked){
      var selectedValue = getOptions[i].value;
      var selectedQues = questions[index-1].question;
      var selectedAns = questions[index - 1][`option${selectedValue}`];
      var correctAnswer = questions[index -1]["corrAnswer"];
      if(selectedAns===correctAnswer){
        score++;
      }
    }
    getOptions[i].checked =false;
  }
  btn.disabled = true;
  // If all questions have been answered, show the final score
  if (index > questions.length - 1) {
    var studentId = Date.now().toString(25);
    var database = firebase.database();
    var ref = database.ref('results/' + studentId);
    ref.set({
      studentName: studentName,
      studentId: studentId,
      obtainedPercentage: ((score / questions.length) * 100).toFixed(2)
    });
    if((score / questions.length) * 100 >= 50){
      Swal.fire({
        title: "Good job!",
        text: "Your percentage is: " + ((score / questions.length) * 100).toFixed(2),
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Try Hard!",
        text: "Your percentage is: " + ((score / questions.length) * 100).toFixed(2),
        icon: "error",
      });
    }
  } else {
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    index++;
    min = 1;
    sec = 59;
  }
}

function target() {
  var btn = document.getElementById("btn");
  btn.disabled = false;
}

