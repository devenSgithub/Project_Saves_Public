const express = require("express");
var mysql = require('mysql');
const port = 5550;

//connect to the mysql database
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password", //change to the password used 
    database : "covidDataTest" // change to the actual database name // test is the database im using as a test
})

//test to check a connection is active with the mysql database
connection.connect(function(err) {
    if(err){
      console.log("Error in the connection")
      console.log(err)
    }
    else{
      console.log(`Database Connected`)
      connection.query(`SHOW DATABASES`, 
      function (err, result) {
        if(err)
          console.log(`Error executing the query - ${err}`)
        else
          console.log("Result: ",result) 
      })
    }
})
/*end of connection test*/



//strating the server and testing status
const app = express();

//test to check the server is up and running
app.listen(port, () => {
    console.log("Application started and Listening on port 5550");
});

//the html file and js files that are used
app.use(express.static('pub'))

/*end of testing startup*/



//no longer used just used in previous testing
app.get("/", (req, res) => {

    //using to tes connections
    res.status(200).send('<h5>test</h5>')
    console.log('Server Started.');
    //res.sendFile(__dirnam e + "/index.html")

});




//to look at the code from the client 

//to see the barchart.js code // not used for other purposes
app.get("/barchartfile", (req, res) => {

        res.sendFile(__dirname + "/pub/js/bargraph.js")

});

//to see the barchart.js code // not used for other purposes
app.get("/bubblefile", (req, res) => {

        res.sendFile(__dirname + "/pub/js/bubble.js")

});

//to see the barchart.js code // not used for other purposes
app.get("/scatterplotfile", (req, res) => {

        res.sendFile(__dirname + "/pub/js/scatter.js")

});

//to see the barchart.js code // not used for other purposes
app.get("/sunburstfile", (req, res) => {

        res.sendFile(__dirname + "/pub/js/sunburst.js")

});

//to see the barchart.js code // not used for other purposes
app.get("/heatmapfile", (req, res) => {

        res.sendFile(__dirname + "/pub/js/heatmap.js")

});









///all sending of data happens after this point

//a get request is using this for barchart data
//Be careful changing this!:
app.get("/barchartData", (req, res) => {

    connection.query('select state, cases, deaths from state_cases where date like "2022-11-20" order by state', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);
        //testing json
        //{info: 'text test'})
        //res.status(200).json({name: 'text test'});
        
        //logging the data that is being sent to the client.
        console.log('Data received from barchart:');
        console.log(rows);
        //var lg = json(rows); 
        //console.log(lg);
    });
//a test sql query        
   //select state, cases, deaths from state_cases where date like "2022-11-20" order by state;
    //SELECT college, cases, cases_2021 FROM college where cases > 2000
});



//second barchart data set being sent
app.get("/barchartData2", (req, res) => {

    connection.query('select state, county, cases, deaths from county_cases where state = "Pennsylvania" and date like "%2022-11-20%" ', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);        
        //logging the data that is being sent to the client.
        console.log('Data received from barchart:');
        console.log(rows);
    });

});



//a get request is using this for heatmap data
//Be careful changing this!:
app.get("/heatmapData", (req, res) => {

    connection.query('SELECT college, cases FROM college', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);
        //logging the data that is being sent to the client.
        console.log('Data sent from heatmap:');
        console.log(rows);
    });

});



//a get request is using this for scatterplot data
//Be careful changing this!:
app.get("/scatterplotData", (req, res) => {

    connection.query('select college, state, county, cases from college order by cases desc limit 100', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);  
        //logging the data that is being sent to the client.
        console.log('Data sent from scatterplot:');
        console.log(rows);
    });
   
});



//second data group being sent
app.get("/scatterplotData2", (req, res) => {

    connection.query('select name, state, county, cases from prison order by cases desc limit 100', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows); 
        //logging the data that is being sent to the client.
        console.log('Data sent from scatterplot:');
        console.log(rows);
    });
   
});



//a get request is using this from sunburst data 
//Be careful changing this!:
app.get("/sunburstData", (req, res) => {

    connection.query('select state, cases, deaths from state_cases where date like "2022-11-20" order by state', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);
        
        //logging the data that is being sent to the client.
        console.log('Data sent from sunburst:');
        console.log(rows);
    });

});



//a get request is using this for bubble data
//Be careful changing this!:
app.get("/bubbleData", (req, res) => {

    connection.query('select county, state, cases, deaths from county_cases where date like "2022-11-20" order by county', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);
        
        //logging the data that is being sent to the client.
        console.log('Data received from bubble right here:');
        console.log(rows);
    });
   
});




app.get("/ScatterLesserHell", (req, res) => {


    connection.query('select name, county, cases from prison where state like "%penn%" order by cases desc limit 9', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);
        
        //logging the data that is being sent to the client.
        console.log('Data received from test 1 sun:');
        console.log(rows);
    });
   
});





app.get("/scatterHell", (req, res) => {

    connection.query('select college, county, cases from college where state like "%penn%" and county like "%luzern%" or county like "%lacka%" order by cases desc limit 9', (err,rows) => {
        if(err) throw err;
        
        res.status(200).json(rows);
        
        //logging the data that is being sent to the client.
        console.log('Data received from test 2 sun:');
        console.log(rows);
    });
   
});









//all information needed for the reloads of the database, including the required include mods, will be below here.
/////////////////////////

var fs = require('fs');
var readline = require('readline');


/*
//this can be uncommented to use the test file

app.get("/redotest", (req, res) => {

    //connection.query('source /path/testnum1.sql', (err,resp) => {

    var rl = readline.createInterface({
        input: fs.createReadStream('./testfile.sql'),
        terminal: false
    });
    
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    });
    
    
    //testing data.
    
   // const data = {
    //    test: "500",
     //   test2: "600"
      //  }
    
        //const jsonContent = JSON.stringify(data);
        //res.status(200).end(jsonContent);
        res.status(200);
    
        //res.status(200).json(resp);
        
        //logging the data was reloaded.
        console.log('Date working for reload test!!!!!!!:');
        //console.log(data);
   
});

*/

app.get("/reloadCollegeData", (req, res) => {
    //parse the file 
    var rl = readline.createInterface({
        input: fs.createReadStream('./collegeReload.sql'),
        terminal: false
    });
    //go through each command in the sql file
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    }); 
    //send a response to the client (not really needed)
    res.status(200); 
    //logging the data was reloaded.
    console.log('College data was reloaded/updated in the database.');
});



//endpoint to reload prison data.
app.get("/reloadPrisonData", (req, res) => {
    //parse the file
    var rl = readline.createInterface({
        input: fs.createReadStream('./prisonReload.sql'),
        terminal: false
    });
    //go through each command in the sql file
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    });  
    //send a response to the client (not really needed)
    res.status(200); 
    //logging the data was reloaded.
    console.log('Prison data was reloaded/updated in the database.');
});



//endpoint to reload USA data.
app.get("/reloadUSAData", (req, res) => {
    //parse the file
    var rl = readline.createInterface({
        input: fs.createReadStream('./USAReload.sql'),
        terminal: false
    });
    //go through each command in the sql file
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    });  
    //send a response to the client (not really needed)
    res.status(200); 
    //logging the data was reloaded.
    console.log('USA data was reloaded/updated in the database.');
});



//endpoint to reload USA States data.
app.get("/reloadStateData", (req, res) => {
    //parse the file
    var rl = readline.createInterface({
        input: fs.createReadStream('./stateReload.sql'),
        terminal: false
    });
    //go through each command in the sql file
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    });  
    //send a response to the client (not really needed)
    res.status(200); 
    //logging the data was reloaded.
    console.log('USA state data was reloaded/updated in the database.');
});



//endpoint to reload USA States county data.
app.get("/reloadCountyData", (req, res) => {
    //parse the file
    var rl = readline.createInterface({
        input: fs.createReadStream('./countyReload.sql'),
        terminal: false
    });
    //go through each command in the sql file
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    });  
    //send a response to the client (not really needed)
    res.status(200); 
    //logging the data was reloaded.
    console.log('USA states county data was reloaded/updated in the database.');
});



//endpoint to reload ALL data.
app.get("/reloadAllData", (req, res) => {
    //parse the file
    var rl = readline.createInterface({
        input: fs.createReadStream('./fullReload.sql'),
        terminal: false
    });
    //go through each command in the sql file
    rl.on('line', function(chunk){
        connection.query(chunk.toString('ascii'), function(err, sets, fields){
            if(err) console.log(err);
        });
    });  
    //send a response to the client (not really needed)
    res.status(200); 
    //logging the data was reloaded.
    console.log('All data was reloaded/updated in the database.');
});


/*
app.get("/redotest", (req, res) => {

    connection.query('source /home/devenschwartz01/servertest2/testnum1.sql', (err,resp) => {
        if(err) throw err;
        const data = {
        test: "500",
        test2: "600"
        }
        const jsonContent = JSON.stringify(data);
        res.status(200).end(jsonContent);
        //res.status(200).json(resp);
        
        
        //logging the data that is being sent to the client.
        console.log('Date working for reload test!!!!!!!:');
        console.log(data);
    });

        //SELECT college, cases FROM college
    //select county, state, cases, deaths from county_cases where date like "2022-11-20" order by county;
   
});



*/














































//wow the space here is v nice




















//end of /barchartData request
//Sends: college name, total cases, and cases in 2021 as a json




/*additional saved test commented out below*/


//display the data without any client get/post request 
//A test to check database is connected
/*
connection.query('SELECT college, cases FROM college', (err,rows) => {
  if(err) throw err;
   
  console.log('Data received from Db:');
  console.log(rows);
});
*/
