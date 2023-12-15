code for parsing a pgn chess data file and creating a mysql database with it.

no data queries are hardcoded into the files avaible here. Some avaible at the end of file to look at.


REQUIREMENTS
------------

The following is needed to run program:

Python version 3.7+

chess.pgn 
    (https://python-chess.readthedocs.io/en/latest/index.html)
    
    Install with pip:
    'pip install chess'


sys is used as well

    used to read file from command line and a max number of game to parse
    
    remove lines 9, 70-82, and replace line 62 'sys.argv[1]' with path to file to parse, to remove requirement: run program with 'python3 chessparse.py' if removed


INSTALL/RUN
-----------

*To run have a pgn file and the python file in the same directory. 

RUN: 'python3 chessparse.py "name_of_pgn_file.pgn" (optional number of games [999999999 default])'
Note: this outputs sql commands to terminal so I used cat to write the output to a .sql file to be used to create the database.

RUN: 'python3 chessparse.py "name_of_pgn_file.pgn" (optional number of games [999999999 default]) | cat > filename.sql'
Note: parses the file and puts output directly into a sql file


Exact command I ran:

    ***RUN: 'python3 chessparse.py twic210-874.pgn 300 | cat > chessdata.sql'

//Note: I parsed 300 games to save time when testing.
//Note: You can run the same command without '300' to parse up to 999,999,999 games ('python3 chessparse.py twic210-874.pgn | cat > chessdata.sql') or replace it with whatever number you want  
NOTE: No number is required it will default to 999,999,999 games or the end of a file
Note: if number of games provided it will parse that many games or until the end of the pgn file which ever comes first.

Then log into mysql:

    ***RUN: 'sudo mysql -p' or an equivalent to log in

Then run the sql script created:

    ***RUN: 'source replace/with/path/to/chessdata.sql'

Note: should be the same path as where the python file and pgn file are. 

//Sidenote: might be able to run the python program directy here. Not sure didnt test it since I already did this.



RUN WITHOUT NOTES
-----------------

RUN: 'python3 chessparse.py (file.pgn) (optional number of games) | cat > (outputfile.sql)'

Log into mysql
RUN: 'sudo mysql -p' or an equivalent to log in

RUN: 'source replace/with/path/to/(outputfile.sql)'



OTHER NOTES
-----------

The python code creates the database and tables. To ensure the tables fill with only the games in the pgn file provided the tables and database is deleted (if it exist) with in the code as well. 

To remove this delete lines 35, 37, 40, 43, 44, 50, 52 (line numbers may not be accurate.)
//they create and delete the tables and database 
If removed the database and tables must be created seperatly (if names changed reflect changes in the code)





-----------------------------------------------------------------------------------------------

some sql querries to look at the data:

    select count(id) as 'Black Wins' from header where result like "%0-1%";

    select (count(id)*100.00/(select count(id) from header)) as 'Precent b4 First Move' from move where move like "%b4%" and movenumber < 2;

    select count(id)/(select count(id) from header) as 'Avg Move Count' from move ;

    select count(move) as 'Kingside Castling Before Blacks 20 Move' from move where (move like "%e1g1%" or move like "%e8g8%") and movenumber < 21 ;












