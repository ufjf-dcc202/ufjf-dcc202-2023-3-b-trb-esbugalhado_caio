import numpy as np
import pandas as pd

class Game():
    def __init__(self):

        """Instancia do tabuleiro jogador t_1 
            C1 C2 C3 \n                               
        L1   n  -  - \n
        L2   -  m  - \n
        L3   j  -  h \n
            Instancia do tabuleiro bot t_2
        L4   k  -  f \n
        L5   -  -  i \n
        L6   -  o  f \n   """
        self.tb_1 = np.array([[0,0,0],[0,0,0],[0,0,0]])
        self.tb_2 = np.array([[0,0,0],[0,0,0],[0,0,0]])
        self.score_1 = 0
        self.score_2 = 0

    def counter_oponent(self, col, n, turn):
        """Clean opponents occurances of 'n' for that 'col' """
        if turn == 1:
            table = self.tb_2
        else:
            table = self.tb_1
        for i in range(len(table[col,:])):
            if table[col,i] == n:
                table[col,i] = 0
    
    def validate_and_place(self, pos, n):
        """ Check if square chosen is valid to place the number  
            pos (tuple(int,int)): position to move
            n (int): new number 
        """
        table = self.tb_1
        lin , col = pos    
        if lin >2 or lin< 0 or col>2 or col<0:
            raise ValueError("Coluna e/ou linha inválidas, devem ser int e menor que 3!")
        else: 
            if table[lin,col] == 0:
                self.tb_1[lin,col] = n
            else:
                raise ValueError("Posicao já possui um numero!")            
        
    def update_score(self):
        '''loop trough cols, accumulating values, applying combo or not '''
        score =0
        for i in range(3):
            column = pd.DataFrame(self.tb_1[:,i])
            combo = column.value_counts()
            combo = combo[combo>1]
            if not combo.empty:
                number_combo = np.array(combo.index[0])
                combo = np.array(combo.values)
                score += number_combo*combo*combo
                unique = pd.unique(self.tb_1[:,i])[0]
                score +=unique
            else:
                score += np.sum(self.tb_1[:,i])
        self.score_1 = score
        score =0
        for i in range(3):
            column = pd.DataFrame(self.tb_2[:,i])
            combo = column.value_counts()
            combo = combo[combo>1]
            if not combo.empty:
                number_combo = np.array(combo.index[0])
                combo = np.array(combo.values)
                score += number_combo*combo*combo
                unique = pd.unique(self.tb_2[:,i])[0]
                score +=unique
            else:
                score += np.sum(self.tb_2[:,i])
        self.score_2 = score

        print("Score jogador: ", self.score_1, "\n Score bot: ",self.score_2)
    
    def bot_play(self, n):
        '''Choose a square randomly'''
        while True:
            lin = np.random.randint(0,3)
            col = np.random.randint(0,3)
            if self.tb_2[lin,col] == 0:
                self.tb_2[lin,col] = n
                break
    
    def show_table(self):
        print("Tabuleiro do jogador: \n", self.tb_1)
        print("Tabuleiro do bot: \n", self.tb_2)

    def check_end_of_game(self):
        '''Return whether game is over 1 or not 0'''
        cont1=0
        cont2 =0
        for i in range(3):
            for j in range(3):
                if self.tb_1[i,j] == 0:
                    cont1 +=1
                if self.tb_2[i,j] == 0:
                    cont2 +=1
        if cont1 == 0 or cont2 == 0:
            return 1
        else:
            return 0
                