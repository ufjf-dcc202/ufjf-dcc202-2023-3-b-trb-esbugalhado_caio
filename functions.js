/*
Instancia do tabuleiro jogador tb_1 
        C1 C2 C3                                
    L1   0  0  0 
    L2   0  0  0 
    L3   0  0  0 
Instancia do tabuleiro bot tb_2
    L1   0  0  0 
    L2   0  0  0 
    L3   0  o  0    */
let tb1 = [[0,0,0],[0,0,0],[0,0,0]]
let tb2 = [[0,0,0],[0,0,0],[0,0,0]]

/* recalcula placar */
function updateScore() {
    var sum1 = 0 
    var sum2 = 0
    for (let i = 0 ; i < 3;  i++) {
        let col = tb1.map(row => row[i]) 
        sum1 += compute_column(col)  
    }
    for (let i = 0 ; i < 3 ; i++) {
        let col = tb2.map(row => row[i]) 
        sum2 += compute_column(col) 
      }
    return [sum1,sum2]
    }

/* checa naquela coluna, se o combo é aplicavel*/
function compute_column(col){
    let sum =0
    // combo =3 
    if (col[0] === col[1] && col[1] === col[2]){
        sum += 3*col.reduce((acc, item) => acc+ item, 0) 
    }
    // sem combo
    else if (col[0] !== col[1] && col[0] !== col[2] && col[1] !== col[2]){
        sum += col.reduce((acc, item) => acc+ item, 0) 
    }
    // combo =2
    else{
        if (col[0] === col[1]){
            sum += 2 * 2* col[0] + col[2]
        }
        else if(col[0] === col[2]){
            sum += 2*2* col[0] + col[1]
        }
        else if(col[1] === col[2]){
            sum += 2*2* col[1] + col[0]
        }
    }
    return sum
}
/* limpa casas do adversario conforme a regra */
function counterOponent(col, n, player){
    let tb
    if(player === 1 ){
        tb = tb2
    }else{
        tb = tb1
    }
    for (let i = 0 ; i < 3;  i++) {
        if (tb[i][col] === n){
            tb[i][col] = 0
        }
    }
}
/* checa fim do jogo */
function checkEnd(){ 
    let NoZeroCnt =0
    for (let i=0; i<3 ; i++){
        for (let j=0; j<3 ; j++){
            if (tb1[i][j]  !== 0){
                NoZeroCnt++
            }
        }
    }
    if (NoZeroCnt === 9){
        return 1
    }
}

/* mostra vencedor */
function showWinner(p){
    let score = updateScore()
    if (score[0] > score[1]) {
        p.textContent = 'Jogador venceu!'
        // return 1
    } else {
        p.textContent = 'Bot venceu';
        // return 2
    }
}

/*sortea dado*/
function numberGenerator(){
    return Math.floor(Math.random() * 6) + 1;
}

export { updateScore, numberGenerator, counterOponent, showWinner, checkEnd, tb1, tb2}