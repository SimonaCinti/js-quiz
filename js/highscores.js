const scoreList = document.getElementById('score-list');
const scoreSaved = JSON.parse(localStorage.getItem('highScores')) || [];

scoreList.innerHTML =
    scoreSaved.map(element => {
    return (`<li> ${element.name} ${element.score} </li>`);
    }).join("");

