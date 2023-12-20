import { updateScore, numberGenerator, counterOponent, tb1, tb2, checkEnd, showWinner } from "functions.js";
let number
let player = 1
let bot = 2


const p = document.querySelector('.status')
const select_btn = document.getElementsByName('enviar')[0]
select_btn.disabled = true


/*Start button, começa ambiente do jogo */
document.getElementById('start').addEventListener('click', () => {

    document.getElementById('game-info').classList.remove('hidden');
    document.getElementById('game-score').classList.remove('hidden');
    // runGame();
    
})
document.getElementById('start').addEventListener('click', runGame)

/*Restart game*/
document.querySelector('.restart').addEventListener('click',() => {
    for (let i =0; i<3; i++){
        for (let j=0;j<3; j++){
            tb1[i][j]=0
            tb2[i][j]=0
        }
    }    
    update_table(tb1,tb2)
    let score1 = updateScore(1)
    let score2 = updateScore(2)
    update_score(score1,score2)
})


/*Show dado for user */
function display_number(n){
    const dado = document.querySelector('.n-dado')
    dado.textContent = n
    return n
}

/*Recebe dados usuario assincronamente*/
document.entrada.addEventListener('submit', leEntrada);
function leEntrada(event){
    event.preventDefault()
    const col = document.entrada.coluna.valueAsNumber
    const lin = document.entrada.linha.valueAsNumber
    if(!checkValidPlace(lin,col)){
        p.textContent = "Posição já ocupada! Selecione outra."
        return
    }
    // libera sequencia do jogo
    select_btn.disabled = true
    tb1[lin][col] = number
    counterOponent(col, number, player)
    PlayerFinishedPlay()
}

/* Show tabuleiro for player */
function update_table(tb1, tb2){
    const table1 = document.querySelector('.tabuleiro1')
    const table2 = document.querySelector('.tabuleiro2')
    const itens1 = table1.querySelectorAll('.place')
    const itens2 = table2.querySelectorAll('.place')
    const tb1_lined = [...tb1[0], ...tb1[1], ...tb1[2]];
    const tb2_lined = [...tb2[0], ...tb2[1], ...tb2[2]];

    for (let i=0; i<itens1.length; i++){
        itens1[i].textContent = tb1_lined[i]
        itens2[i].textContent = tb2_lined[i]

    }
}
/* Atualiza placar na tela*/
function update_score(score1, score2){
    document.querySelector('.player-sc').textContent = score1
    document.querySelector('.bot-sc').textContent = score2
}

/*Verifica se a casa é valida*/
function checkValidPlace(lin,col){
    if (tb1[lin][col] !== 0){
        return 0
    }else{
        return 1
    }
}

let PlayerFinishedPlay
// let gameOver
// await new Promise(resolve => {
//     gameOver = resolve
// })

/*Bot joga, colocando peça na primeira casa disponivel, começando de tb2[0][0]*/
function botPlay(n){
    for (let lin =0; lin<3; lin++){
        for(let col =0; col<3; col++){
            if (tb2[lin][col] === 0){
                tb2[lin][col] = n
                counterOponent(col , n, bot)
                return 1
            }
        }
    }
    return 0
}

async function runGame(){
    let score

    // vez do jogador
    score = updateScore()
    update_score(score[0],score[1])

    select_btn.disabled = false
    number = display_number(numberGenerator())
    await new Promise(resolve => {
            PlayerFinishedPlay = resolve
        })
    update_table(tb1, tb2)

    // if (checkGameOver(p)){
    //     break
    // }
    p.textContent = " "

    // vez do bot
    if (botPlay(display_number(numberGenerator()))===0){
        return
    }

    update_table(tb1, tb2)
    p.textContent = "Sua vez!"
    if (checkEnd()){
        showWinner(p)
        return
    }
    runGame()
    
}

// gameOver()
// showWinner()