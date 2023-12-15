#

#file parses data from pgn and creates a mysql database w/ it


# chessparse.py
# Deven Schwartz
# Parse a pgn file with chess data and 
#create sql statements to create a database 

import chess.pgn
import sys

#import math

#testing cat!!!
#print('htbebti')

#use:
#need file as arg now
#twic210-874.pgn
# python3 test.py twic210-874.pgn 
# python3 test.py 'filename' 'number of games(not required)' | cat > testsql.sql

#in a mysql instance
#source /path/to/file/testpy.sql

# head -n 100 testsql.sql

#names of test files... dont worry about it
#MacKenzie
#chess
#twic210-874


#create the databases and tables that will be used in script
#delete if it exist
print("DROP DATABASE chess;")
#create new
print("CREATE DATABASE chess;")

#get into database
print("USE chess;")

#delete both tables if they exist
print("drop table header;")
print("drop table move;")

#createthe tables to use 
####Add eventdate 
####make date to str since missing dates on multiple occasions
#mysql does not like ?? as date so everthing has to be a str
print("CREATE TABLE header (id int, event varchar(255), site varchar(255), date varchar(255), round varchar(255), white varchar(255), black varchar(255), result varchar(255), eco varchar(255), whiteelo varchar(255), blackelo varchar(255));")

print("CREATE TABLE move (id int, movenumber double, move varchar(255));")





#start of data parse
#open file
#change to the path you have your file located in.
#pgn = open("/home/devenschwartz01/Tony/twic210-874.pgn")
pgn = open(sys.argv[1], encoding= 'unicode_escape')# game  ~ 22K ~ breaks everything 
#encoding= 'unicode_escape')
# encoding="utf-8"
#sys.argv[1]

#default max game count
maxgame = 999999999

try:
    #if a number is given use it as the numbe of games to parse
    
    #do later
    #should set up a flag system to make it cleaner
    #ie -f is a id for a file input and -n for the number of games 
    if sys.argv[2]:

        maxgame = int(sys.argv[2])

except:
    #just to check
    maxgame = 999999999
    #print()

    
#used as id for games
cnt = 1

#loop through the games or to max parse
while ((True) and (cnt != maxgame+1)):
    #gamecount = gamecount + 1
    #move number for second table 
    cnt2 = 1
    game = chess.pgn.read_game(pgn)
    
    #if there is a game go through it
    if game is not None:
        
        #because pgn parser strokes out if you have random title 
        #comments without them in standard comment form, 
        #check for the bad data and skip it if its there
        if (game.headers["Event"]) != '?':
        
        
        
            #list of headers in the game 
            #(some do not have the 7 they should have)
            hds = game.headers
            #declare variables to hold them
            Event = ""
            Site = ""
            Date = ""
            Round = ""
            White = ""
            Black = ""
            Result = ""
            BlackElo = ""
            ECO = ""
            WhiteElo = ""
            EventDate = ""
            
            for x in hds:
                #print(x)
                y = game.headers[x]
                #print(x)
                if x == "Event":
                    Event = y
                    #print("testsetstets" + Event)
                elif x == "Site":
                    Site = y
                    #print("in test pahase" + Site)
                elif x == "Date":
                    Date = y
                elif x == "Round":
                    Round = y
                elif x == "White":
                    White = y
                elif x == "Black":
                    Black = y
                elif x == "Result":
                    Result = y
                elif x == "BlackElo":
                    BlackElo = y
                elif x == "ECO":
                    ECO = y
                elif x == "WhiteElo":
                    WhiteElo = y
                #did not stick in table since its not one of the 
                #seven normal headers but is in some of the test
                #data so stored it to check it
                elif x == "EventDate":
                    EventDate = y
                else:
                    z = y
                    #print(x + "how did I get here??" + z)
            
            
            #print(game.headers["Event"])
            #print(game.headers["Site"])
            #print(game.headers["Date"])
            #print(game.headers["Round"])
            #print(game.headers["White"])
            #print(game.headers["Black"])
            #print(game.headers["Result"])
            #print(game.headers["ECO"])
            #print(game.headers["WhiteElo"])
            #print(game.headers["BlackElo"])

            #add values to table
            #print('INSERT INTO header (id, event, site, date, round, white, black, result, eco, whiteelo, blackelo) VALUES (' + str(cnt) + ', ' + game.headers["Event"] + ', ' + game.headers["Site"] + ', ' + game.headers["Date"] + ', ' + game.headers["Round"] + ', "' + game.headers["White"] + '", "' + game.headers["Black"] + '", ' + game.headers["Result"] +  ', ' + game.headers["ECO"] + ', ' + game.headers["WhiteElo"] + ', ' + game.headers["BlackElo"] + ');')
            
            
            
  ####Add the insert to eventdate since its on some cases
            print('INSERT INTO header (id, event, site, date, round, white, black, result, eco, whiteelo, blackelo) VALUES ("' + str(cnt) + '", "' + Event + '", "' + Site + '", "' + Date + '", "' + Round + '", "' + White + '", "' + Black + '", "' + Result +  '", "' + ECO + '", "' + WhiteElo + '", "' + BlackElo + '");')
            #print()
            

            #loop through moves
            for move in game.mainline_moves():
                #print(str(i) + ": " + str(move))
                #white move = n
                #black move = n.5
                # floor(n) = turn number 

                #add to move table
                print('INSERT INTO move (id, movenumber, move) VALUES (' + str(cnt) + ', ' + str((cnt2)) + ', "' + str(move) + '");')
                
                cnt2= cnt2+0.5

                #prints out board from end of game ##not used
            #board = game.board() 
            #for move in game.mainline_moves():
            #    board.push(move)
            #print(board)


            #add 1 to the id outside of inner for loop
            cnt = cnt + 1
        
        
        
        #if game does not exist end parse
    else:
        break

        
        
        
        
        
        
#EOF
#Deven Schwartz
   
    
    
    
    
    
    
  
    
