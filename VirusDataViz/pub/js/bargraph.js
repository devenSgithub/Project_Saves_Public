//
//bargraph.js
//Purpose: Creates a bargraph display with provided data
//Author(s): Kole Barbetti, Brian Mintah, Tyler Potsko, Deven Schwartz 
//Last Updated: 12/7/2022
//


function display2(data, data2, display2){

    

    const margin = {top: 30, right: 30, bottom: 170, left: 130};
    const width = 1500 - margin.left - margin.right;
    const height = 650 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#d3test")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data

    //y-axis title
    //translate 225 = (650-30-170)/2 ie y = (width-top-bottom)/2(want middle value) or just height/2 

    //x-axis title
    //same idea as last for translate value just width and the first value// 605 was closest to bottom without cutting it off //need to adjust based on length of names 
   
    //state cases   
    if (display2 === "cases"){
        
         svg.append("text")
            .attr("transform", "translate(600,530)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("States");

        svg.append("text")
            .attr("transform", "translate(-65,225)rotate(-90)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Cases");

        //add title
        svg.append("text")
            .attr("transform", "translate(10,0)")
            .attr("x", 0)
            .attr("y", 10).attr("font-size", "22px")
            .style('fill', '#f4f4f4')
            .text("Bargraph: Cases for States USA Total");

        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d => d.state))
            .padding(0.2);
        
        svg.append("g")
            .attr("transform",    `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        var maxy = d3.max(data, function(d) { return d.cases; });


        // Add Y axis
        //change the upper max if text sixe is changed (for the title)
        const y = d3.scaleLinear()
            .domain([1250, maxy+(maxy/15)])
            .range([ height, 0]);
        
        svg.append("g")
            .call(d3.axisLeft(y));


        // create a tooltip
        const Tooltip = d3.select("#d3test")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

      //Three function that change the tooltip when user hover / move / leave a cell
        const mouseover = function(event, d) {
            Tooltip
                .style("opacity", 1)
        }
        const mousemove = function(event, d) {
            Tooltip
                .html('<u>' + d.cases + ", " + d.state + '</u>' + "<br>" + d.cases + " cases")
                .style("left", (event.x/2+20) + "px")
                .style("top", (event.y/2-30) + "px")
        }
        var mouseleave = function(event, d) {
            Tooltip
                .style("opacity", 0)
        }


    // Bars
        svg.selectAll("mybar")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.state))
            .attr("y", d => y(d.cases))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.cases))
            .attr("fill", "#3c25c8")
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            //blue
/////////////////////////////////////////
    //state deaths
    }else if (display2 === "cases_2021"){
        

        svg.append("text")
            .attr("transform", "translate(600,530)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("States");

        svg.append("text")
            .attr("transform", "translate(-65,225)rotate(-90)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Deaths");

            //add title
        svg.append("text")
            .attr("transform", "translate(10,0)")
            .attr("x", 0)
            .attr("y", 10).attr("font-size", "18px")
            .style('fill', '#f4f4f4')
            .text("Bargraph: Deaths for States USA Total");

        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(d => d.state))
            .padding(0.2);
        
        svg.append("g")
            .attr("transform",    `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        var maxy = d3.max(data, function(d) { return d.deaths; });

        // Add Y axis
        //change upper domain if text size is changed
        const y = d3.scaleLinear()
            .domain([0, maxy+(maxy/15)])
            .range([ height, 0]);
        
        svg.append("g")
            .call(d3.axisLeft(y));

        // create a tooltip
        const Tooltip = d3.select("#d3test")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

            // Three function that change the tooltip when user hover / move / leave a cell
          const mouseover = function(event, d) {
                Tooltip
                    .style("opacity", 1)
          }
          const mousemove = function(event, d) {
                Tooltip
                    .html('<u>' + d.deaths + ", " + d.state + '</u>' + "<br>" + d.cases + " cases")
                    .style("left", (event.x/2+20) + "px")
                    .style("top", (event.y/2-30) + "px")
          }
          var mouseleave = function(event, d) {
                Tooltip
                    .style("opacity", 0)
          }

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .join("rect")
            .attr("x", d => x(d.state))
            .attr("y", d => y(d.deaths))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.deaths))
            .attr("fill", "#d42424")
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

///////////////////////////////
    //pa cases
    }else if (display2 === "pa_cases"){
        
        svg.append("text")
            .attr("transform", "translate(600,530)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Pennsylvania Counties");

        svg.append("text")
            .attr("transform", "translate(-65,225)rotate(-90)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Cases");

        //add title
        svg.append("text")
            .attr("transform", "translate(10,0)")
            .attr("x", 0)
            .attr("y", 10).attr("font-size", "18px")
            .style('fill', '#f4f4f4')
            .text("Bargraph: Cases for PA, USA Total");

        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data2.map(d => d.county))
            .padding(0.2);
        
        svg.append("g")
            .attr("transform",    `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        var maxy = d3.max(data2, function(d) { return d.cases; });

        // Add Y axis
        //change upper domain if text size is changed
        const y = d3.scaleLinear()
            .domain([0, maxy+(maxy/15)])
            .range([ height, 0]);
        
        svg.append("g")
            .call(d3.axisLeft(y));

        // create a tooltip
        const Tooltip = d3.select("#d3test")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "black")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        // Three function for tooltip when user hover / move / leave a cell
        const mouseover = function(event, d) {
            Tooltip
                .style("opacity", 1)
        }
        const mousemove = function(event, d) {
            Tooltip
                .html('<u>' + d.county + '</u>' + "<br>" + d.cases + " cases")
                .style("left", (event.x/2+20) + "px")
                .style("top", (event.y/2-30) + "px")
        }
        var mouseleave = function(event, d) {
            Tooltip
                .style("opacity", 0)
        }

        // Bars
        svg.selectAll("mybar")
            .data(data2)
            .join("rect")
            .attr("x", d => x(d.county))
            .attr("y", d => y(d.cases))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.cases))
            .attr("fill", "orange")
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
    
/////////////////////////////////////
    //pa deaths
    }else if (display2 === "pa_deaths"){
        
        svg.append("text")
            .attr("transform", "translate(600,530)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Pennsylvania Counties");

        svg.append("text")
            .attr("transform", "translate(-65,225)rotate(-90)")
            .attr("x", 0)
            .attr("y", 0).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Deaths");

        //add title
        svg.append("text")
            .attr("transform", "translate(10,0)")
            .attr("x", 0)
            .attr("y", 10).attr("font-size", "18px")
            .style('fill', '#f4f4f4')
            .text("Bargraph: Deaths for PA, USA Total");
        
        // X axis
        const x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data2.map(d => d.county))
            .padding(0.2);
        
        svg.append("g")
            .attr("transform",    `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
    
        var maxy = d3.max(data2, function(d) { return d.deaths; });

        // Add Y axis
        //change upper domain if text size is changed
        const y = d3.scaleLinear()
            .domain([0, maxy+(maxy/15)])
            .range([ height, 0]);
        
        svg.append("g")
            .call(d3.axisLeft(y));

        // create a tooltip
        const Tooltip = d3.select("#d3test")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        //3 function tooltip when user hover / move / leave a cell
        const mouseover = function(event, d) {
            Tooltip
                .style("opacity", 1)
        }
        const mousemove = function(event, d) {
            Tooltip
                .html('<u>' + d.county + '</u>' + "<br>" + d.deaths + " deaths")
                .style("left", (event.x/2+20) + "px")
                .style("top", (event.y/2-30) + "px")
        }
        var mouseleave = function(event, d) {
            Tooltip
                .style("opacity", 0)
        }
         
        // Bars
        svg.selectAll("mybar")
            .data(data2)
            .join("rect")
            .attr("x", d => x(d.county))
            .attr("y", d => y(d.deaths))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.deaths))
            .attr("fill", "green")
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)        

    //eoif
    }














//hwat u lookin at









    
    
    
    
    
    
//eofun
}
    
    
    



    
//eof
    
    
