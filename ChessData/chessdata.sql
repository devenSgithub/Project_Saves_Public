DROP DATABASE chess;
CREATE DATABASE chess;
USE chess;
drop table header;
drop table move;
CREATE TABLE header (id int, event varchar(255), site varchar(255), date varchar(255), round varchar(255), white varchar(255), black varchar(255), result varchar(255), eco varchar(255), whiteelo varchar(255), blackelo varchar(255));
CREATE TABLE move (id int, movenumber double, move varchar(255));
