/*
Instancia do tabuleiro jogador tb_1 
        C1 C2 C3                                
    L1   n  -  - 
    L2   -  m  - 
    L3   j  -  h 
Instancia do tabuleiro bot tb_2
    L4   k  -  f 
    L5   -  -  i 
    L6   -  o  f    */
const tb1 = [[0,0,0],[0,0,0],[0,0,0]]
const tb2 = [[0,0,0],[0,0,0],[0,0,0]]

// let score1 = update_score(1)
// let score2 = update_score(2)


function print_score(){
    console.log("Placar do jogador: ", update_score(1))
    console.log("Placar do bot: ", update_score(2))
}

function update_score(player){
    let sum = 0
    if (player === 1){
        for (let i =0; i<3; i++){
            let col = tb1.map(row => row[i])
            // obtem numero de repetidas (combo) e valores unicos
            let combo = return_combo_condition(col)
            let unique = [...new Set(col)]
            let unique_arr = Array.from(unique)
            
            // aplica a soma 
            let sum_combo = combo*combo* col.reduce((acc, item) => acc+ item, 0)

            let sum_unique = unique_arr.reduce((acc, item) => acc + item, 0) 

            sum += sum_combo + sum_unique
        }
        return sum
    }
    else{
        for (let i =0; i<3; i++){
            let col = tb2.map(row => row[i])
            // obtem numero de repetidas (combo) e valores unicos
            let combo = return_combo_condition(col)
            let unique = [...new Set(col)]
            let unique_arr = Array.from(unique)
            
            // aplica a soma 
            let sum_combo = combo*combo* col.reduce((acc, item) => acc+ item, 0) 
            let sum_unique = unique_arr.reduce((acc, item) => acc + item, 0) 

            sum += sum_combo + sum_unique
        }
        return sum
    }
}
function return_combo_condition(col){
    let set = new Set(col)
    let set_arr = Array.from(set)
    
    if (set_arr.length === 3){
        return 1
    } 
    if (set_arr.length === 2){
        // garantir que tres zeros na coluna não combem
        let filter_zero = col.filter(i => i === 0)
        if (filter_zero.length === 2)
            return 1
        else
            return 2

    } 
    if (set_arr.length === 1){
        // garantir que tres zeros na coluna não combem
        let filter_zero = col.filter(i => i === 0)
        if (filter_zero.length === 3)
            return 1
        else
            return 3
    } 
}

export {print_score, update_score, tb1, tb2}