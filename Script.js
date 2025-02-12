const questions = [
    {
        question: 'which is the largest animal in world',
        answer: [
            {text:"Shark", correct: false},
            {text:"blue whale", correct: true},
            {text:"Elephant", correct: false},
            {text:"Girrafe", correct: false},
        ]
    },
    {
        question: 'which is the smallest country in world',
        answer: [
            {text:"vatican city", correct: true},
            {text:"bhutan", correct: false},
            {text:"nepal", correct: false},
            {text:"Sri Lanka", correct: false},
        ]
    },
    {
        question: 'which is the largest desert in world',
        answer: [
            {text:"Kalahari", correct: false},
            {text:"Gobi", correct: false},
            {text:"Sahara", correct: false},
            {text:"Antarctic", correct: true},
        ]
    },
    {
        question: 'which is the smallest continent in the world',
        answer: [
            {text:"Asia", correct: false},
            {text:"Australia", correct: true},
            {text:"Arctic", correct: false},
            {text:"Africa", correct: false},
        ]
    }
];

let questionElement = document.getElementById('question')
let answerButtons = document.getElementById('answer-button')
let nextBtn = document.getElementById('next-btn')


let currentQuestionIndex = 0;
let score = 0

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0
    nextBtn.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question
    
    currentQuestion.answer.forEach( answer =>{
        const button = document.createElement('button')
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState(){
        nextBtn.style.display = 'none'
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild)
        }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add("correct")
        }
        button.disabled = 'true'
    })
    nextBtn.style.display = "block"

}

function showScore(){
    resetState()
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "play Again"
    nextBtn.style.display = "block"
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore()
    }
}


nextBtn.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }
    else{
        startQuiz()
    }
})


startQuiz()