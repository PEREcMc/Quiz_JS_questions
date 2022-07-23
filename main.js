// All answer options
const option1 = document.querySelector('.option1')
const option2 = document.querySelector('.option2')
const option3 = document.querySelector('.option3')
const option4 = document.querySelector('.option4')

// All our options
const optionElements = document.querySelectorAll('.option')
// Define qustion
const question =  document.getElementById('question')

const numberOfQuestion = document.getElementById('number-of-question')

const numberOfAllQuestions = document.getElementById('number-of-all-questions')

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы

const  btnNext = document.getElementById('btn-next') // кнопка далее   
const answersTracker = document.getElementById('answers-tracker') // обёртка для трекера

let score = 0; // итоговый результат

// Modal window
const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // количество всех вопросов в модальном окне
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"

// Define questions
const questions = [
    {
        question: 'Что будет в результате данного сравнения: null == undefined?',
        options: [
            'Так в JavaScript сделать нельзя',
            'False',
            'Erorr',
            'True',
        ],
        rightAnswer: 3
    },
    {
        question: 'В чём разница между == и ===??',
        options: [
            '== для строкового сравнения, а === для сравнения объектов и массивов',
            'Оператор двойного равенства производит приведение типов, оператор строгого равенства - нет.',
            'Нет разницы',
            'Нет разницы кроме случая с null',
        ],
        rightAnswer: 1
    },
    {
        question: 'Как проверить, является ли объект массивом?',
        options: [
            'Объект не может являться массивом!',
            'Для этого можно использовать встроенный метод Array.isArray()',
            'Использовать встроенный метод Array.thisArray()',
            'Использовать метод isArray?()',
        ],
        rightAnswer: 1
    },
    {
        question: 'Результат выражения "3" + 5 * 1.5?',
        options: [
            '351.5',
            '37.5',
            'Undefined',
            'Error',
        ],
        rightAnswer: 1
    },
    {
        question: 'Каково назначения метода ForEach() в JavaScript?',
        options: [
            'Что-то делает для каждого элемента',
            'Перебирает массив и возвращает изменённый массив, согласно условию',
            'Выполняет указанную функцию один раз для каждого элемента в массиве',
            'Не помню',
        ],
        rightAnswer: 2
    },
    {
        question: 'Для чего используется оператор "!!"?',
        options: [
            'Чтобы поставить отрицание и воскицательный знак к строковому типу данных',
            'Не знаю такого оператора - есть только отрицание: !',
            'Оператор "!!" (двойное отрицание) приводит значение справа от него к логическому значению',
            'Не помню',
        ],
        rightAnswer: 2
    },
    {
        question: 'Что возвращает оператор конъюнкции: &&?',
        options: [
            'Всё кроме дизъюнкции',
            'Первое true',
            'Последнее true',
            'Первое false',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие значения в Java Script являются ложными?',
        options: [
            "' ', 0, false",
            "null, undefined",
            "NaN и все вышеперечисленые",
            "Всё что false",
        ],
        rightAnswer: 2
    },
    {
        question: 'Почему typeof null возвращает object?',
        options: [
            "Затрудняюсь ответить",
            "Null - это пустота!",
            "Typeof null == 'object' всегда будет возвращать true по историческим причинам",
            "Это не баг, это - фича!",
        ],
        rightAnswer: 2
    },
];

numberOfAllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question // сам вопрос 

    // мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    // обозначим номер текущей страницы

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++ // увеличиваем индекс страницы
};

let completedAnswers = []; // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate == true) {
                randomQuestion()
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
}

const checkAnswer = (el) => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    }) 
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})