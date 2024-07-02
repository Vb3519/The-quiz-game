// Пример вопросов к квизу:
const questionsArr = [
    'Сколько тебе лет?',
    'Где ты работаешь?',
    'В каком городе ты живешь?',
];

// Пример ответов на каждый вопрос квиза:
const answersArr = [
    ['18', '35', '34', '25', ],    
    ['Офис-менеджер', 'Менеджер-попродажам', 'Руководитель проектов', 'Веб-девелопер',],    
    ['Омск', 'Москва', 'Санкт-Петербург', 'Казань',],
];

// Пример правильных ответов:
const correctAnswersArr = ['34', 'веб-девелопер', 'Санкт-Петербург'];

/* Логика:
- Массив вопросов; Массив ответов; Массив правильных ответов;
- На каждый клик выводится новый вопрос (из массива с вопросами) и четыре варианта ответа (из массива с ответами);
- Выбранный пользователем ответ сравнивается с правильным ответом (из массива правильных ответов)
- Если ответ верный - счетчик вопросов += 1; Если ответ неверный - игра заново;
 */


function showQestion() {
    let gameQuestion = document.querySelector('.game-question-page__question-body');
    gameQuestion.innerText = questionsArr[0];
};

function showAnswersOnPage() {
    let questionAnswers = document.querySelectorAll('.answers-body-row__answer'); // нод-лист ответов (4 шт.)
    let questionAnswersArr = Array.from(questionAnswers); // массив ответов (4 шт.)
    
    //let gamePagesCounter = 0;
    let pageAnswerCounter = 0;

    for (answer of questionAnswersArr) {    
        answer.innerText = answersArr[gamePagesCounter][pageAnswerCounter]; /* Массив ответов к каждой странице. Каждый элемент массива - массив с 4мя ответами */
        pageAnswerCounter++;
    }
}


/* В функцию ниже, как аргумент "gamePagesCounter" передается количество правильных ответов
(сделан правильный ответ - отрисовывается следующая страница игры). */
function switchGamePages(gamePagesCounter) {
    let questionAnswers = document.querySelectorAll('.answers-body-row__answer'); // нод-лист ответов (4 шт.)
    let questionAnswersArr = Array.from(questionAnswers); // массив ответов (4 шт.)

    //let gamePagesCounter = 0;
    
    function showAnswersOnPage() {
        let pageAnswerCounter = 0;
    
        for (answer of questionAnswersArr) {    
            answer.innerText = answersArr[gamePagesCounter][pageAnswerCounter]; /* Массив ответов к каждой странице. Каждый элемент массива - массив с 4мя ответами */
            pageAnswerCounter++;
        }
    }
    
    showAnswersOnPage(); /* функция, которая отрисовывает ответы на странице.
    "pageAnswerCounter" - количество вариантов ответов на странице, в принципе, оно всегда === 4; */
}
   
function checkAnswerCorrectness() {};

//document.querySelector('.start-page__btn').addEventListener('click', switchGamePages);



// ------------------------------------------------------------ Вариант всей логики программы: ------------------------------------------------------
function switchGamePages123() {
    let questionAnswers = document.querySelectorAll('.answers-body-row__answer'); // нод-лист ответов (4 шт.)
    let questionAnswersArr = Array.from(questionAnswers); // массив ответов (4 шт.)

    let gamePagesCounter = 0;
    
    function showAnswersOnPage123() {
        let pageAnswerCounter = 0;
    
        for (answer of questionAnswersArr) {    
            answer.innerText = answersArr[gamePagesCounter][pageAnswerCounter]; /* Массив ответов к каждой странице. Каждый элемент массива - массив с 4мя ответами */
            pageAnswerCounter++;
        }
    }
    
    showAnswersOnPage123(); /* функция, которая отрисовывает ответы на странице.
    "pageAnswerCounter" - количество вариантов ответов на странице, в принципе, оно всегда === 4; */

    function checkAnswer() { // переключать страницы по функции проверки корректного ответа, ч/з обработчик "click"
        for (answer of correctAnswersArr) {
            if (answer.innerText == '34'
                || answer.innerText == 'Веб-девелопер'
                || answer.innerText == 'Санкт-Петербург'
                ) 
            {
                gamePagesCounter++;
            }
        }
    }

    //checkAnswerCorrectness();

}

/* ------------------------------------------------------- ПРОВЕРЕННЫЕ СКРИПТЫ: ------------------------------------------------------- */

/* ------------------ ФУНКЦИИ: ------------------ */
// рендер вопроса первой страницы квиза:
function showFirstPageQuestion() {
    let gameQuestion = document.querySelector('.game-question-page__question-body');
    gameQuestion.innerText = questionsArr[0];
}

// рендер ответов первой страницы квиза:
function showFirstPageAnswers() {
    let questionAnswers = document.querySelectorAll('.answers-body-row__answer'); // нод-лист ответов (4 шт.)
    let questionAnswersArr = Array.from(questionAnswers); // массив ответов (4 шт.)
    
    let pageAnswerCounter = 0;
    
    for (answer of questionAnswersArr) {    
        answer.innerText = answersArr[0][pageAnswerCounter]; /* Массив ответов к каждой странице. Каждый элемент массива - массив с 4мя ответами */
        pageAnswerCounter++;
    }
}

// рендер вопроса и ответов ПЕРВОЙ страницы квиза:
function showQuizFirstPage(e) {
    let target = e.target;

    if (target.className !== 'start-page__btn') {
        return; // эта проверка проводится, когда обработчик вешается на "document"
    }

    let startPage = document.querySelector('.start-page');
    startPage.style.display = 'none';
    
    showFirstPageQuestion();
    showFirstPageAnswers();
}

// Выбор ответа пользователем:
const quizAnswers = document.querySelectorAll('.answers-body-row__answer');
// Почему не работает отдельно функция, отдельно обработчик?
Array.from(quizAnswers).forEach( (answer) => {
    answer.addEventListener('click', function selectAnswer(e) {
        let gamePage = document.querySelector('.game-question-page');

        let target = e.target;

        if (target.className !== 'answers-body-row__answer') {
            return; // тут снова не нужна эта проверка ^_^
        }

        // если у страницы квиза дата-атрибут - "выбран ответ", то другие ответы не выбрать.
        if (gamePage.dataset.userSelectedAnswer) {
            return;
        }

        gamePage.setAttribute('data-user-selected-answer', 'this one'); /* -------------------- не забудь его потом убирать, чтоб продолжать игру */
        // document.querySelector('.selected-answer').dataset.userSelectedAnswer // 'this one'
        answer.classList.add('selected-answer');
    })    
})

// Отмена выбранного ответа (при двойном клике ЛКМ) - нужна подсказка (тултип):
function removeSelectedAnswer(e) {
    let gamePage = document.querySelector('.game-question-page');

    let target = e.target;

    if (! target.classList.contains('selected-answer') ) {
        return;
    }

    gamePage.removeAttribute('data-user-selected-answer', 'this one');        
    target.classList.remove('selected-answer');

    // Еще вариант:
    // if ( target.classList.contains('selected-answer') ) {
    // "очень сложный код"
    // }

    // и еще вариант:
    // if (target.className !== 'answers-body-row__answer selected-answer') {
    //     return;
    // }
}

// Подтверждение и проверка выбранного ответа (для перехода к следующему вопросу):
function checkAnswerCorrectness(e) {
    let target = e.target;

    if ( !target.classList.contains('counter-and-btn-container__confirm-answer-btn') ) {
        return;
    }

    // или так:
    // if (target.className !== 'counter-and-btn-container__confirm-answer-btn confirm-btn') {
    //     return;
    // }    

    let selectedAnswerBtn = document.querySelector('.selected-answer'); // выбранный ответ
    let gamePage = document.querySelector('.game-question-page');

    if (!selectedAnswerBtn) { // если ответ не выбран - просьба выбрать ответ
        alert('Пожалуйста выберите один из четырех вариантов ответа ^_^');
        return; // если не указать "return", то когда НЕ выбран ответ - будет ошибка чтения пустого элемента "selectedAnswerBtn.innerText"
    }

    if ( selectedAnswerBtn.innerText == ('34' || 'Веб-девелопер' || 'Санкт-Петербург') ) {
        showAnswersOnPage(); // отрисовываю следующую страницу с вопросом и ответами

        gamePage.removeAttribute('data-user-selected-answer', 'this one'); // чищу дата-атрибут игрового поля квиза
        selectedAnswerBtn.classList.remove('selected-answer'); //  убираю класс с выбранного в прошлом вопросе ответа
    }
}

// может разбить функцию "checkAnswerCorrectness" на парочку поменьше?


/* ------------------ ОБРАБОТЧИКИ: ------------------ */

// рендер вопроса и ответов ПЕРВОЙ страницы квиза:
document.addEventListener('click', showQuizFirstPage);

// Выбор ответа пользователем:
// const quizAnswers = document.querySelectorAll('.answers-body-row__answer');
// Array.from(quizAnswers).forEach( (answer) => {
//     answer.addEventListener('click', selectAnswer); // --------------------------- такая запись не работает
// })


// Отмена выбранного ответа (при двойном клике ЛКМ) - нужна подсказка (тултип):
document.addEventListener('dblclick', removeSelectedAnswer);

// Подтверждение и проверка выбранного ответа (для перехода к следующему вопросу):
document.addEventListener('click', checkAnswerCorrectness);







// РАБОТАЮ ТУТ (НУЖНА ПРОВЕРКА / ТЕСТЫ) ---------------------------------------------------------------------------------- //



function showAnswersOnPage() {
    let questionAnswers = document.querySelectorAll('.answers-body-row__answer'); // нод-лист ответов (4 шт.)
    let questionAnswersArr = Array.from(questionAnswers); // массив ответов (4 шт.)
    // сделай тут две функции (как и в начале):
    // Вопрос:
    let pagequestionCounter = 1;
    let questionText = document.querySelector('.game-question-page__question-body');

    for (question of questionsArr) {
        questionText.innerText = questionsArr[pagequestionCounter];
        //pagequestionCounter++;
    }

    // Ответы:
    let pageAnswerCounter = 0;

    for (answer of questionAnswersArr) {    
        answer.innerText = answersArr[1][pageAnswerCounter]; /* Массив ответов к каждой странице. Каждый элемент массива - массив с 4мя ответами */
        pageAnswerCounter++;
    }
}