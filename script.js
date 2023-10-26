const questions = [
    {
        question: "Qual é o planeta mais próximo do Sol?",
        choices: ["Mercúrio", "Vênus", "Terra", "Marte", "Júpiter"],
        answer: "Mercúrio",
    },
    {
        question: "Quem escreveu a obra 'Dom Quixote'?",
        choices: ["Miguel de Cervantes", "William Shakespeare", "Charles Dickens", "Jane Austen", "Fyodor Dostoevsky"],
        answer: "Miguel de Cervantes",
    },
    {
        question: "Qual é o rio mais longo do mundo?",
        choices: ["Nilo", "Amazonas", "Yangtzé", "Mississippi", "Ganges"],
        answer: "Nilo",
    },
    {
        question: "Em que ano ocorreu a Revolução Francesa?",
        choices: ["1789", "1804", "1832", "1871", "1905"],
        answer: "1789",
    },
    {
        question: "Quem pintou a 'Mona Lisa'?",
        choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Michelangelo"],
        answer: "Leonardo da Vinci",
    },
    {
        question: "Qual é a capital do Japão?",
        choices: ["Tóquio", "Pequim", "Seul", "Bangkok", "Jacarta"],
        answer: "Tóquio",
    },
    {
        question: "Quantos ossos tem um adulto humano?",
        choices: ["206", "214", "190", "220", "180"],
        answer: "206",
    },
    {
        question: "Qual é o maior órgão do corpo humano?",
        choices: ["Pele", "Coração", "Cérebro", "Fígado", "Pulmões"],
        answer: "Pele",
    },
    {
        question: "Quem foi o primeiro homem a pisar na Lua?",
        choices: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard", "John Glenn"],
        answer: "Neil Armstrong",
    },
    {
        question: "Qual é o elemento químico mais abundante na crosta terrestre?",
        choices: ["Oxigênio", "Silício", "Alumínio", "Ferro", "Carbono"],
        answer: "Oxigênio",
    },
    {
        question: "Qual é o maior mamífero?",
        choices: ["Elefante africano", "Baleia azul", "Girafa", "Rinoceronte branco", "Hipopótamo"],
        answer: "Baleia azul",
    },
    {
        question: "Qual é a cidade mais populosa do mundo?",
        choices: ["Tóquio", "Delhi", "Xangai", "São Paulo", "Mumbai"],
        answer: "Tóquio",
    },
    {
        question: "Qual é a capital da França?",
        choices: ["Paris", "Londres", "Berlim", "Madrid", "Roma"],
        answer: "Paris",
    },
    {
        question: "Em que país nasceu o tango?",
        choices: ["Argentina", "Espanha", "Itália", "Portugal", "Brasil"],
        answer: "Argentina",
    },
    {
        question: "Qual é a maior ilha do mundo?",
        choices: ["Groenlândia", "Austrália", "Havaí", "Java", "Nova Zelândia"],
        answer: "Groenlândia",
    }
];

const questionElement = document.querySelector('#question');
const choiceElement = document.querySelectorAll(".choice");
const choiceDiv = document.querySelector("#choices");
const restartButton = document.querySelector(".restart");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;

function loadQuestion() {
    if(currentQuestion >= questions.length){
        questionElement.innerHTML = `<p>Fim de Jogo!! Parabéns, você acertou ${score} de ${questions.length} questões.</p>`;
        restartButton.removeAttribute('hidden');
        choiceDiv.style.display = 'none';
        return;
    }
    choiceDiv.style.display = 'block';
    const currentQuestionData = questions[currentQuestion]
    questionElement.innerHTML = currentQuestionData.question;

    const choices = shuffleArray(currentQuestionData.choices);

    for(let i = 0; i < choiceElement.length; i++){
        choiceElement[i].innerHTML = choices[i];
    }
    answerChosen = false;
}

function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function checkAnswer(e) {
    if(answerChosen) return;
    answerChosen = true;

    if(e.target.innerHTML === questions[currentQuestion].answer && currentQuestion < questions.length) {
        score++;
        scoreElement.innerHTML = `Pontuação: ${score}`;
        currentQuestion++;
        loadQuestion();
    } else {
        wrong++;
        wrongElement.innerHTML = `Erros: ${wrong}`;
        alert(`Errado! A resposta correta é: ${questions[currentQuestion].answer}`)
        currentQuestion++;
        loadQuestion();
    }
}

choiceElement.forEach((btn) => {
    btn.addEventListener("click", checkAnswer);
})

restartButton.addEventListener("click", restartQuiz);


function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    scoreElement.innerHTML = `Pontuação: 0`;
    wrongElement.innerHTML = `Erros: 0`;
    restartButton.toggleAttribute('hidden')
    loadQuestion();
}

loadQuestion();


