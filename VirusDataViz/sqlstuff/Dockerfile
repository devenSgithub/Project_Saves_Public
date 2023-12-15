FROM mysql 
USER root
EXPOSE 3306 

RUN mysql --local-infile -hlocalhost -uroot -p password


RUN source /mySQL/sqlscript.sql;
