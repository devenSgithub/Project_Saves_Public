//
//circle.js
//Purpose: Creates a circle display with provided data
//Author(s): Kole Barbetti, Brian Mintah, Tyler Potsko, Deven Schwartz 
//Last Updated: 12/7/2022


function circleDisplay(dataX, dataOne, dataTwo){
    
    //testing data
    /*
    const dataX = [
        { state: 'Some Guy', cases: 5000, deaths: 2000 },
        { state: 'Another guy', cases: 1000, deaths: 500 },
        { state: 'Goku', cases: 500, deaths: 1000 },
        { state: 'Joe', cases: 0, deaths: 4000 },
        { state: 'Michael', cases: 10000, deaths: 1000}

    ];
    */
    
    var onetest = "no";
    var twotest = "yes";
    if (onetest === "no"){ 
    // set the dimensions and margins of the graph
    const margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 860 - margin.left - margin.right,
    height = 860 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   
    // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    const svg = d3.select("#d3test")
        .style('fill', '#f4f4f4')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

      // X scale: common for 2 data series
    const x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(dataX.map(d => d.state)); // The domain of the X axis is the list of states.

      // Y scale outer variable
    const y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 10000000]); // Domain of Y is from 0 to the max seen in the data

      // Second barplot Scales
    const ybis = d3.scaleRadial()
        .range([innerRadius, 5])   // Domain will be defined later.
        .domain([0, 10000000]);
    
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

  // Three function that change the tooltip when user hover / move / leave a cell for the outer cell
    const mouseover = function(event, d) {
        Tooltip
            .style("opacity", 1)
    }
    const mousemove = function(event, d) {
        Tooltip
            .html(d.state + "<br>" + d.cases + " Cases")
            .style("left", (event.x/2+20) + "px")
            .style("top", (event.y/2-30) + "px")
    }
    var mouseleave = function(event, d) {
        Tooltip
            .style("opacity", 0)
    }
    
    
    
    // Three function that change the tooltip when user hover / move / leave a cell for the inner circle
    const mouseover2 = function(event, d) {
        Tooltip
            .style("opacity", 1)
    }
    const mousemove2 = function(event, d) {
        Tooltip
            .html(d.state + "<br>" + d.deaths + " Deaths")
            .style("left", (event.x/2+20) + "px")
            .style("top", (event.y/2-30) + "px")
    }
    var mouseleave2 = function(event, d) {
        Tooltip
            .style("opacity", 0)
    }
    
      // Add the bars
    svg.append("g")
        .selectAll("path")
        .data(dataX)
        .join("path")
        .attr("fill", "#0000ff")
        .attr("class", "yo")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(d => y(d['cases']))
        .startAngle(d => x(d.state))
        .endAngle(d => x(d.state) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", mouseover) // What to do when hovered
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


      // Add the labels
    svg.append("g")
        .selectAll("g")
        .data(dataX)
        .join("g")
        .attr("text-anchor", function(d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.state) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['cases'])+10) + ",0)"; })
        .append("text")
        .text(d => d.state)
        .attr("transform", function(d) { return (x(d.state) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

      // Add the second series
    svg.append("g")
        .selectAll("path")
        .data(dataX)
        .join("path")
        .attr("fill", "#ff0000")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius( d => ybis(d['deaths']))
        .outerRadius( d => ybis(d['cases']))
        .startAngle(d => x(d.state))
        .endAngle(d => x(d.state) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", mouseover2) // What to do when hovered
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2)

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }else if (twotest === "yes"){
    
    
    
    
    
    
    
    
    
    
        const margin = {top: 100, right: 0, bottom: 0, left: 0},
    width = 860 - margin.left - margin.right,
    height = 860 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   
    // the outerRadius goes from the middle of the SVG area to the border

    // append the svg object
    const svg = d3.select("#d3test")
        .style('fill', '#f4f4f4')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${width/2 + margin.left}, ${height/2 + margin.top})`);

      // X scale: common for 2 data series
    const x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(dataOne.map(d => d.name)); // The domain of the X axis is the list of states.

      // Y scale outer variable
    const y = d3.scaleRadial()
        .range([innerRadius, outerRadius])   // Domain will be define later.
        .domain([0, 10000]); // Domain of Y is from 0 to the max seen in the data

      // Second barplot Scales
    const ybis = d3.scaleRadial()
        .range([innerRadius, 5])   // Domain will be defined later.
        .domain([0, 10000]);
    
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

  // Three function that change the tooltip when user hover / move / leave a cell for the outer cell
    const mouseover = function(event, d) {
        Tooltip
            .style("opacity", 1)
    }
    const mousemove = function(event, d) {
        Tooltip
            .html(d.name + "<br>" + d.cases + " Cases")
            .style("left", (event.x/2+20) + "px")
            .style("top", (event.y/2-30) + "px")
    }
    var mouseleave = function(event, d) {
        Tooltip
            .style("opacity", 0)
    }
    
    
    
    // Three function that change the tooltip when user hover / move / leave a cell for the inner circle
    
    
    
    
      // Add the bars
    svg.append("g")
        .selectAll("path")
        .data(dataOne)
        .join("path")
        .attr("fill", "#0000ff")
        .attr("class", "yo")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius(innerRadius)
        .outerRadius(d => y(d['cases']))
        .startAngle(d => x(d.name))
        .endAngle(d => x(d.name) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", mouseover) // What to do when hovered
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


      // Add the labels
    svg.append("g")
        .selectAll("g")
        .data(dataOne)
        .join("g")
        .attr("text-anchor", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.name) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['cases'])+10) + ",0)"; })
        .append("text")
        .text(d => d.name)
        .attr("transform", function(d) { return (x(d.name) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "11px")
        .attr("alignment-baseline", "middle")

        
        
        
        
        
        
        
        
        
        x = d3.scaleBand()
        .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0)                  // This does nothing
        .domain(dataTwo.map(d => d.college)); 
        
    const mouseover2 = function(event, d) {
        Tooltip
            .style("opacity", 1)
    }
    const mousemove2 = function(event, d) {
        Tooltip
            .html(d.college + "<br>" + d.cases + " Cases")
            .style("left", (event.x/2+20) + "px")
            .style("top", (event.y/2-30) + "px")
    }
    var mouseleave2 = function(event, d) {
        Tooltip
            .style("opacity", 0)
    }
        
        
        
        
        
        
      // Add the second series
    svg.append("g")
        .selectAll("path")
        .data(dataTwo)
        .join("path")
        .attr("fill", "#ff0000")
        .attr("d", d3.arc()     // imagine your doing a part of a donut plot
        .innerRadius( d => ybis(d['cases']))
        .outerRadius( d => ybis(d['cases']))
        .startAngle(d => x(d.college))
        .endAngle(d => x(d.college) + x.bandwidth())
        .padAngle(0.01)
        .padRadius(innerRadius))
        .on("mouseover", mouseover2) // What to do when hovered
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2)

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


//eofun
}




//eof
