// ----------------------------
// QUIZ DATA
// ----------------------------

const quizData = {

html: [

{
question:"Which HTML tag is used to create a hyperlink?",
options:["<link>","<a>","<href>","<url>"],
answer:1
},

{
question:"Which tag is used for inserting an image?",
options:["<image>","<img>","<picture>","<src>"],
answer:1
},

{
question:"Which HTML element represents the largest heading?",
options:["<h6>","<heading>","<head>","<h1>"],
answer:3
},

{
question:"Which tag creates a line break?",
options:["<break>","<lb>","<br>","<hr>"],
answer:2
},

{
question:"Which tag is used to create a table?",
options:["<table>","<tab>","<tr>","<td>"],
answer:0
}

],

css:[

{
question:"Which property changes text color?",
options:["font-color","text-color","color","background"],
answer:2
},

{
question:"Which CSS property makes corners rounded?",
options:["border-style","border-radius","radius","curve"],
answer:1
},

{
question:"Which property changes background color?",
options:["background","background-color","color","fill"],
answer:1
},

{
question:"Which layout system is one-dimensional?",
options:["Grid","Flexbox","Bootstrap","Float"],
answer:1
},

{
question:"Which property adds space inside an element?",
options:["margin","padding","spacing","gap"],
answer:1
}

],

javascript:[

{
question:"Which keyword declares a constant?",
options:["let","const","var","static"],
answer:1
},

{
question:"Which method prints data in browser console?",
options:["print()","log()","console.log()","display()"],
answer:2
},

{
question:"Which function displays an alert box?",
options:["message()","alert()","popup()","show()"],
answer:1
},

{
question:"Which operator checks equality and type?",
options:["==","=","===","!="],
answer:2
},

{
question:"Which method selects an element by ID?",
options:["query()","getElementById()","selectId()","getId()"],
answer:1
}

]

};

// ----------------------------

let currentCategory="html";
let currentQuestion=0;
let score=0;

// ----------------------------

const question=document.getElementById("question");
const options=document.getElementById("options");
const nextBtn=document.getElementById("nextBtn");
const scoreBox=document.getElementById("score");
const progressBar=document.getElementById("progressBar");

const resultCard=document.getElementById("resultCard");
const quizCard=document.querySelector(".quiz-card");

const finalScore=document.getElementById("finalScore");
const message=document.getElementById("message");

// ----------------------------

loadQuestion();

// ----------------------------

document.querySelectorAll(".category").forEach(btn=>{

btn.addEventListener("click",()=>{

document.querySelectorAll(".category")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

currentCategory=btn.dataset.category;

currentQuestion=0;
score=0;

resultCard.classList.add("hidden");
quizCard.classList.remove("hidden");

loadQuestion();

});

});

// ----------------------------

function loadQuestion(){

let quiz=quizData[currentCategory];

document.getElementById("questionNumber").innerText=currentQuestion+1;
document.getElementById("totalQuestions").innerText=quiz.length;

question.innerText=quiz[currentQuestion].question;

options.innerHTML="";

quiz[currentQuestion].options.forEach((option,index)=>{

let div=document.createElement("div");

div.classList.add("option");

div.innerText=option;

div.onclick=()=>selectAnswer(div,index);

options.appendChild(div);

});

scoreBox.innerText="Score : "+score;

progressBar.style.width=
((currentQuestion)/quiz.length)*100+"%";

}

// ----------------------------

function selectAnswer(element,index){

let quiz=quizData[currentCategory];

let correct=quiz[currentQuestion].answer;

document.querySelectorAll(".option")
.forEach(option=>option.style.pointerEvents="none");

if(index===correct){

element.classList.add("correct");

score++;

}else{

element.classList.add("wrong");

document.querySelectorAll(".option")[correct]
.classList.add("correct");

}

scoreBox.innerText="Score : "+score;

}

// ----------------------------

nextBtn.onclick=function(){

let quiz=quizData[currentCategory];

currentQuestion++;

if(currentQuestion<quiz.length){

loadQuestion();

}else{

showResult();

}

};

// ----------------------------

function showResult(){

quizCard.classList.add("hidden");

resultCard.classList.remove("hidden");

let quiz=quizData[currentCategory];

finalScore.innerText=score+" / "+quiz.length;

progressBar.style.width="100%";

if(score===quiz.length){

message.innerText="Outstanding Performance!";

}else if(score>=3){

message.innerText="Great Job!";

}else{

message.innerText="Keep Practicing!";

}

}

// ----------------------------

document.getElementById("restartBtn")
.onclick=function(){

currentQuestion=0;

score=0;

resultCard.classList.add("hidden");

quizCard.classList.remove("hidden");

loadQuestion();

};

// ----------------------------
// API
// ----------------------------

document.getElementById("jokeBtn")
.addEventListener("click",loadJoke);

async function loadJoke(){

const joke=document.getElementById("joke");

joke.innerText="Loading...";

try{

const response=await fetch(
"https://official-joke-api.appspot.com/jokes/programming/random"
);

const data=await response.json();

joke.innerText=data[0].setup+
"\n\n"+
data[0].punchline;

}catch{

joke.innerText=
"Unable to load joke. Please try again.";

}

}