import { print_score, update_score, tb1, tb2 } from "./functions.js";

print_score();
console.log(tb1,tb2);

tb1[1][1] =10;
tb1[1][2] =2;
// tb2[0][2] = 10

// let score_1 = update_score(1);
// // let score_2 = update_score(2)

print_score();