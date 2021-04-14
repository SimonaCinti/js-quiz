const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScore');
const recentScore = localStorage.getItem('recentScore');
const finalScore = document.getElementById('finalScore');
finalScore.innerText = recentScore;

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
console.log(highScores);

const max_high_scores = 5;

username.addEventListener('keyup', ()=>{
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})

saveHighscore = (e) => {
    console.log('clicked the save button');
    e.preventDefault();
    const score = {
        score: recentScore,
        // score: Math.floor(Math.random() * 100),
        name: username.value
    }
    highScores.push(score)
    // sort array
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    console.log(highScores);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('../index.html');

}
