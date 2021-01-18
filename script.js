const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEle = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

//keep track of current card
let curreActiveCard = 0;

//store DOM cards
const cardsEl = [];

let cardsData = getCardsData();

//store card data
// const cardsData = [
//     {
//         question: 'what must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'what is a variable?',
//         answer: 'container for a piece of data'
//     },
//     {
//         question: 'Example of case sensitive variable',
//         answer: 'thisisAVariable'
//     }
// ];

//create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

//create a single card in DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0) {
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                    ${data.answer}
                </p>
            </div>
        </div>
    `;

    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    //add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
}

//show number of cards
function updateCurrentText() {
    currentEle.innerText = `${ curreActiveCard + 1}/${cardsEl.length}`;
}

//Get cards from localstorage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//set cards to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

//Event Listeners
nextBtn.addEventListener('click', () => {
    cardsEl[curreActiveCard].className = 'card left';
    curreActiveCard = curreActiveCard + 1;
    if(curreActiveCard > cardsEl.length - 1) {
        curreActiveCard = cardsEl.length - 1;
    }
    cardsEl[curreActiveCard].className = 'card active';
    updateCurrentText();
})

prevBtn.addEventListener('click', () => {
    cardsEl[curreActiveCard].className = 'card right';
    curreActiveCard = curreActiveCard - 1;
    if(curreActiveCard < 0) {
        curreActiveCard = 0;
    }
    cardsEl[curreActiveCard].className = 'card active';
    updateCurrentText();
});

//show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

//Add new card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    
    if(question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

//clear cards data
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});