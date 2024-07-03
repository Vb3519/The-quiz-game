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



/* ------------------------------------------------------- ПРОВЕРЕННЫЕ СКРИПТЫ: ------------------------------------------------------- */

/* ------------------ ФУНКЦИИ: ------------------ */
// Выбор ответа пользователем:
const quizAnswers = document.querySelectorAll('.answers-body-row__answer');
// Почему не работает отдельно функция, отдельно обработчик?
// Array.from(quizAnswers).forEach( (answer) => {
//     answer.addEventListener('click', function selectAnswer(e) {
//         let gamePage = document.querySelector('.game-question-page');

//         let target = e.target;

//         if (target.className !== 'answers-body-row__answer') {
//             return; // тут снова не нужна эта проверка ^_^
//         }

//         // если у страницы квиза дата-атрибут - "выбран ответ", то другие ответы не выбрать.
//         if (gamePage.dataset.userSelectedAnswer) {
//             return;
//         }

//         gamePage.setAttribute('data-user-selected-answer', 'this one'); /* -------------------- не забудь его потом убирать, чтоб продолжать игру */
//         // document.querySelector('.selected-answer').dataset.userSelectedAnswer // 'this one'
//         answer.classList.add('selected-answer');
//     })    
// })

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





/* ------------------ ОБРАБОТЧИКИ: ------------------ */

// Выбор ответа пользователем:
// const quizAnswers = document.querySelectorAll('.answers-body-row__answer');
// Array.from(quizAnswers).forEach( (answer) => {
//     answer.addEventListener('click', selectAnswer); // --------------------------- такая запись не работает
// })


// Отмена выбранного ответа (при двойном клике ЛКМ) - нужна подсказка (тултип):
//document.addEventListener('dblclick', removeSelectedAnswer);

// Подтверждение и проверка выбранного ответа (для перехода к следующему вопросу):
//document.addEventListener('click', checkAnswerCorrectness);




function renderQuestionCounter() {
    let counterElem = document.querySelector('.counter-and-btn-container__counter');
        counterElem.style.display = 'block';

        counterElem.innerHTML = `
            Вопросов пройдено: ${correctAnswerCounter}
        `;
}

function renderQuizPage(e) {
    let target = e.target;

    if (! (target.classList.contains('start-page__btn') || target.classList.contains('counter-and-btn-container__confirm-answer-btn')) ) {
        return; // если не стартовая кнопка или не кнопка следующего вопроса - "return";
    }

    // if (! (target.classList.contains('start-page__btn')) ) {
    //     return; // Для стартовой страницы: если не стартовая кнопка - "return";
    // }

    renderQuestionCounter();



    function renderQuizAnswers() {
        let answersList = document.querySelectorAll('.answers-body-row__answer');
        let pageAnswerCounter = 0;
    
        Array.from(answersList).forEach( (answer) => {
            // Проверка: количество верных ответов НЕ может быть больше, чем количество вопросов
            if (answersArr.length > correctAnswerCounter) {
                answer.innerText = answersArr[correctAnswerCounter][pageAnswerCounter];
                pageAnswerCounter++; // здесь счетчик внутри цикла, т.к. нужно заполнить последовательно все 4 элемента.
            }

            return;
        })
    }

    renderQuizAnswers();


    function renderQuizQuestion() {
        let questionText = document.querySelector('.game-question-page__question-body');

        while (correctAnswerCounter < questionsArr.length) {
            questionText.innerText = questionsArr[correctAnswerCounter]; // Поле с вопросом заполняется из данных элементов массива вопросов
            break; // проходит одна итерация и прерываем цикл, проверяем условия и увеличиваем счетчик на 1 (++); Не указать "break" - цикл вечный;
        }        

        if (correctAnswerCounter < questionsArr.length) {
            correctAnswerCounter++;
        }        

        // Вариант 2: (При использовании этого цикла (и при превышении лимита вопросов), будет показываться "undefined", т.к. цикл всегда выполняется хотябы 1 раз) 
        // do {
        //     questionText.innerText = questionsArr[correctAnswerCounter];
        //     break;
        // } while (correctAnswerCounter < questionsArr.length);
    };

    renderQuizQuestion();
    checkAnswerCorrectness();
}


//document.addEventListener('click', renderQuizPage);



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
        renderQuizPage(); // отрисовываю следующую страницу с вопросом и ответами

        gamePage.removeAttribute('data-user-selected-answer', 'this one'); // чищу дата-атрибут игрового поля квиза
        selectedAnswerBtn.classList.remove('selected-answer'); //  убираю класс с выбранного в прошлом вопросе ответа
    }
}


/////////////////////////// ----------------------------------------- ОБЩАЯ ФУНКЦИЯ КВИЗА: --------------------------------------------- //
let correctAnswerCounter = 0; // счетчик пройденных вопросов (правильных ответов);

function playQuizGame(e) {
    let target = e.target;
    if (!target.classList.contains('start-page__btn')) {
        return;
    }

    let gamePage = document.querySelector('.game-question-page');
    gamePage.style.display = 'flex'; // отображение игровой страницы квиза

    /////////////////////////////--- ОТРИСОВКА СТРАНИЦЫ КВИЗА ---/////////////////////////////////////////////////////////
    function renderQuizPage() {

        function renderQuestionCounter() {
            let counterElem = document.querySelector('.counter-and-btn-container__counter');
                counterElem.style.display = 'block';
        
                counterElem.innerHTML = `
                    Вопросов пройдено: ${correctAnswerCounter}
                `;
        }

        renderQuestionCounter(); // отрисовка счетчика вопросов;

        /////////////////////--- ОТРИСОВКА СПИСКА ОТВЕТОВ ---/////////////////////////
        function renderQuizAnswers() {
            let answersList = document.querySelectorAll('.answers-body-row__answer');
            let pageAnswerCounter = 0;
        
            Array.from(answersList).forEach( (answer) => {
                // Проверка: количество верных ответов НЕ может быть больше, чем количество вопросов
                if (answersArr.length > correctAnswerCounter) {
                    answer.innerText = answersArr[correctAnswerCounter][pageAnswerCounter];
                    pageAnswerCounter++; // здесь счетчик внутри цикла, т.к. нужно заполнить последовательно все 4 элемента.
                }
    
                return;
            })
        }
    
        renderQuizAnswers(); // отрисовка ответов;

        /////////////////////--- ОТРИСОВКА ВОПРОСА ---/////////////////////////
        function renderQuizQuestion() {
            let questionText = document.querySelector('.game-question-page__question-body');
    
            while (correctAnswerCounter < questionsArr.length) {
                questionText.innerText = questionsArr[correctAnswerCounter]; // Поле с вопросом заполняется из данных элементов массива вопросов
                break; // проходит одна итерация и прерываем цикл, проверяем условия и увеличиваем счетчик на 1 (++); Не указать "break" - цикл вечный;
            }        
    
            if (correctAnswerCounter < questionsArr.length) {
                correctAnswerCounter++;
            }        
    
            // Вариант 2: (При использовании этого цикла (и при превышении лимита вопросов), будет показываться "undefined", т.к. цикл всегда выполняется хотябы 1 раз) 
            // do {
            //     questionText.innerText = questionsArr[correctAnswerCounter];
            //     break;
            // } while (correctAnswerCounter < questionsArr.length);
        };
    
        renderQuizQuestion(); // отрисовка вопроса;
    }
    renderQuizPage(); ////////////////////////////////////////////// ----- Вот тут закончена отрисовка первой страницы квиза, посе нажатия кнопки "старт"

    // Работа с элементами страницы квиза:
    // Выбор ответа пользователем:
    const quizAnswers = document.querySelectorAll('.answers-body-row__answer');

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
    document.addEventListener('dblclick', removeSelectedAnswer); // обработчик для отмены выбранного ответа

    // Проверка выбранного ответа:
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

        let quizAnswer = selectedAnswerBtn.innerText;

        if ((quizAnswer == '34') || (quizAnswer == 'Веб-девелопер') || (quizAnswer == 'Санкт-Петербург')) {
            renderQuizPage(); // отрисовываю следующую страницу с вопросом и ответами
            gamePage.removeAttribute('data-user-selected-answer', 'this one'); // чищу дата-атрибут игрового поля квиза
            selectedAnswerBtn.classList.remove('selected-answer'); //  убираю класс с выбранного в прошлом вопросе ответа
        }

        // correctAnswersArr.forEach( (elem) => {
        //     if (quizAnswer == elem) {
        //         renderQuizPage(); // отрисовываю следующую страницу с вопросом и ответами
        //         gamePage.removeAttribute('data-user-selected-answer', 'this one'); // чищу дата-атрибут игрового поля квиза
        //         selectedAnswerBtn.classList.remove('selected-answer'); //  убираю класс с выбранного в прошлом вопросе ответа                
        //     }
        // })
    }
    document.addEventListener('click', checkAnswerCorrectness); // обработчик для проверки выбранного ответа

}

document.addEventListener('click', playQuizGame);