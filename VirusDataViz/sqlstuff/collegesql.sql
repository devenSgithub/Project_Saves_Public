SET GLOBAL local_infile = 1;

DROP DATABASE covidDataTest;

CREATE DATABASE covidDataTest;


USE covidDataTest;




/*Creation of tables */

/*colleges*/
drop table college;

CREATE TABLE college(date date NOT NULL, state varchar(255) NOT NULL, county varchar(255) NOT NULL, city varchar(255) NOT NULL, id INT NOT NULL, college varchar(255) NOT NULL, cases INT NOT NULL, cases_2021 INT, primary key (id));



/*load the csv files into the sql database*/







/*7=college file*/
LOAD DATA LOCAL INFILE '/home/devenschwartz01/mysqldata/1temp.csv' 
INTO TABLE college 

FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(date, state, county, city, id, college, cases, cases_2021, @col9);
