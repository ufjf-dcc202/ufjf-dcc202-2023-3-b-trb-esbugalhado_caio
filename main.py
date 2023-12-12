from esbugalhado import *
import numpy as np

"""Generates random integer number [1,7)"""
def number_generator():
    dado = np.random.randint(1,7)
    return dado

print("Bem vindo ao jogo: Esbugalhado")
input("Aperte alguma tecla para iniciar!")

game = Game()
tbPlayer = game.tb_1
tbBot = game.tb_2

# print(table)
dado = number_generator()

while True:
    print("Sua vez!")
    turn = 1
    print("Numero sorteado: ", dado, "!\n ---->Escolha uma posição!!<------ ")
    col = int(input("Informe a coluna: "))
    lin = int(input("Informe a linha: ")) 
    try:
        game.validate_and_place((lin,col), n = dado)
    except Exception as e:
        print(f"Erro: {e}")
    game.counter_oponent(col, dado, turn)

    game.show_table()  

    game.update_score()  
    if game.check_end_of_game():
        break

    print("Agora é a vez do PC!")
    turn = 0

    dado = number_generator()
    print("Numero sorteado: ", dado, "!")
    game.bot_play(dado)
    game.counter_oponent(col, dado, turn)

    game.show_table()      

    game.update_score()  

    if game.check_end_of_game():
        break



print("Game over!")
if game.score_1 >game.score_2:
    print("Você venceu!")
else:
    print("Você perdeu!")

