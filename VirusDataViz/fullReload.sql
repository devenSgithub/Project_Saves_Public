


SET GLOBAL local_infile = 1;


USE covidDataTest;



/*Creation of tables */

drop table county_cases;

/*county*/
CREATE TABLE county_cases(date date NOT NULL, county varchar(255), state varchar(255), fips INT, cases INT NOT NULL, deaths INT NOT NULL);

/*states*/
drop table state_cases;

CREATE TABLE state_cases(date date NOT NULL, state varchar(255), fips INT, cases INT NOT NULL, deaths INT NOT NULL);

/*us total*/
drop table us_cases;

CREATE TABLE us_cases(date date NOT NULL, cases INT NOT NULL, deaths INT NOT NULL);

/*prisons*/
drop table prison;


CREATE TABLE prison(id INT NOT NULL, name varchar(255) NOT NULL, city varchar(255) NOT NULL, county varchar(255) NOT NULL, fips INT NOT NULL, state varchar(255) NOT NULL, longit FLOAT, latit FLOAT, pop INT, cases INT, deaths INT, primary key (id));

/*colleges*/
drop table college;

CREATE TABLE college(date date NOT NULL, state varchar(255) NOT NULL, county varchar(255) NOT NULL, city varchar(255) NOT NULL, id INT NOT NULL, college varchar(255) NOT NULL, cases INT NOT NULL, cases_2021 INT, primary key (id));




/*load the csv files into the sql database*/


/*1=county20 file*/
LOAD DATA LOCAL INFILE '/mySQL/1temp.csv' 
INTO TABLE county_cases 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/*2=county21 file*/
LOAD DATA LOCAL INFILE '/mySQL/2temp.csv' 
INTO TABLE county_cases 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/*3=county22 file*/
LOAD DATA LOCAL INFILE '/mySQL/3temp.csv' 
INTO TABLE county_cases 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/*4=states file*/
LOAD DATA LOCAL INFILE '/mySQL/4temp.csv' 
INTO TABLE state_cases 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/*5=us file*/
LOAD DATA LOCAL INFILE '/mySQL/5temp.csv' 
INTO TABLE us_cases 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

/*6=prison file*/
LOAD DATA LOCAL INFILE '/mySQL/6temp.csv' 
INTO TABLE prison 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, name, @col3, city, county, fips, state, longit, latit, pop, @col11, cases, deaths, @col14, @col15, @col16);

/*7=college file*/
LOAD DATA LOCAL INFILE '/mySQL/7temp.csv' 
INTO TABLE college 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(date, state, county, city, id, college, cases, cases_2021, @col9);

/* Adding ID columns THESE MIGHT BREAK TEST THEM*/

ALTER TABLE county_cases
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE state_cases
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;

ALTER TABLE us_cases
ADD COLUMN id INT AUTO_INCREMENT PRIMARY KEY;
