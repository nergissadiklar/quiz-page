const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is my least favorite color?',
        choice1: 'Blue',
        choice2: 'Brown',
        choice3: 'Yellow',
        choice4: 'Orange',
        answer: 4,
    },
    {
        question: 'What is my favorite type of food?',
        choice1: 'Candy',
        choice2: 'Cakes',
        choice3: 'Vegetables',
        choice4: 'Fruit',
        answer: 2,
    },
    {
        question: 'What was my dream job as a child?',
        choice1: 'Singer',
        choice2: 'Art Teacher',
        choice3: 'Doctor',
        choice4: 'Cartoon and animation designer',
        answer: 4,
    },
    {
        question: 'What is your favorite season?',
        choice1: 'Spring',
        choice2: 'Summer',
        choice3: 'Autumn',
        choice4: 'Winter',
        answer: 2,
    }
    ]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = ` ${questionCounter} / ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice'+number]
    })

    availableQuestions.splice(questionsIndex,1)
    acceptingAnswers =true

}

choices.forEach(choice => {
    choice.addEventListener('click',e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
             selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()







