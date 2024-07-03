// ----- Информация для Квиза ----- //
// Вопросы:
const questionsArr = [
    'Как зовут автора этого квиза?',
    'Столица России?',
    'Сколько книг в серии Гарри Поттера?',
    'Сколько будет 10 - (-25)?',
    'Как называется язык для веб-разработки?',
];

// Варианты ответов:
const answersArr = [
    ['Василий', 'Виталий', 'Виктор', 'Иннокентий', ],    
    ['Москва', 'Париж', 'Казань', 'Барнаул',],    
    ['Две', 'Семь', 'Десять', 'Пять',],
    ['-15', '35', '-35', '5',],
    ['Java', 'Python', 'JavaScript', 'Microsoft',],
];

// Правильные ответы:
const correctAnswersArr = ['Виктор', 'Москва', 'Семь', '35', 'JavaScript'];


// ------------------------------------------- ФУНКЦИИ ------------------------------------------- //

// Отрисовка счетка вопросов (правильных ответов) (функция №1):
function renderQuestionCounter() {
    let counterElem = document.querySelector('.counter-and-btn-container__counter');
    counterElem.style.display = 'block';

    counterElem.innerHTML = `
        Вопросов пройдено: ${correctAnswerCounter}
    `;
}

// Отрисовка вариантов ответов к каждой странице квиза (функция №2):
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

// Отрисовка вопроса (функция №3):
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

// Отрисовка общей страницы квиза (вопрос, ответы, счетчик) функции № 1, 2, 3:
function renderQuizPage() {

    renderQuestionCounter(); // отрисовка счетчика вопросов (правильных ответов);

    renderQuizAnswers(); // отрисовка вариантов ответов к каждой странице квиза;
        
    renderQuizQuestion(); // отрисовка вопроса;
}

// Меню квиза (вопрос, варианты ответов, кнопка перехода к следующему вопросу):
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

// Проверка, выбранного пользователем ответа для перехода к следующему вопросу:
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

    if (
           (quizAnswer == 'Виктор')
        || (quizAnswer == 'Москва')
        || (quizAnswer == 'Семь')
        || (quizAnswer == '35')
        || (quizAnswer == 'JavaScript')
    ) {
        renderQuizPage(); // отрисовываю следующую страницу с вопросом и ответами
        gamePage.removeAttribute('data-user-selected-answer', 'this one'); // чищу дата-атрибут игрового поля квиза
        selectedAnswerBtn.classList.remove('selected-answer'); //  убираю класс с выбранного в прошлом вопросе ответа
    }
}


// ---------------------- Общая Функция Квиза ---------------------- // 
let correctAnswerCounter = 0; // счетчик пройденных вопросов (правильных ответов); Его как-то можно НЕ использовать в global scope?

function playQuizGame(e) {
    let target = e.target;
    if (!target.classList.contains('start-page__btn')) { // Проверка нажатия на кнопку "Старт"
        return;
    }

    let gamePage = document.querySelector('.game-question-page');
    gamePage.style.display = 'flex'; // отображение игровой страницы квиза

    let startPage = document.querySelector('.start-page'); // скрыть стартовую страницу
    startPage.style.display = 'none';

    renderQuizPage(); // --- Пользователь нажимает кнопку "Старт", отрисовывается первая страница Квиза

    // Меню квиза отрисовано (вопрос, варианты ответов, кнопка перехода к следующему вопросу):

    // Выбор ответа пользователем:
    const quizAnswers = document.querySelectorAll('.answers-body-row__answer');
    Array.from(quizAnswers).forEach( (answer) => {
        answer.addEventListener('click', function selectAnswer(e) { // Почему-то функция не работает корректно отдельно от обработчика
            let gamePage = document.querySelector('.game-question-page');
    
            let target = e.target;
    
            if (target.className !== 'answers-body-row__answer') {
                return; // тут снова не нужна эта проверка ^_^
            }
    
            // если у страницы квиза дата-атрибут - "выбран ответ", то другие варианты ответа не выбрать.
            if (gamePage.dataset.userSelectedAnswer) {
                return;
            }
    
            gamePage.setAttribute('data-user-selected-answer', 'this one');
            // document.querySelector('.selected-answer').dataset.userSelectedAnswer // 'this one'
            answer.classList.add('selected-answer');
        })    
    })

    // Отмена выбранного ответа (при двойном клике ЛКМ) - нужна подсказка (тултип):
    document.addEventListener('dblclick', removeSelectedAnswer);

    // Проверка, выбранного пользователем ответа для перехода к следующему вопросу:
    document.addEventListener('click', checkAnswerCorrectness);
    
}
document.addEventListener('click', playQuizGame);

// Концовка игры (победа) ^_^ :
document.querySelector('.counter-and-btn-container__confirm-answer-btn').addEventListener('click', function endOfQuiz() {
    if (correctAnswerCounter >= questionsArr.length) {
        let finalPage = document.querySelector('.final-page');
        finalPage.style.display = 'flex';

        let gamePage = document.querySelector('.game-question-page');
        gamePage.style.display = 'none';
    }
})


