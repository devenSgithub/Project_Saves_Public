//
//bubble.js
//Purpose: Creates a bubble display with provided data
//Author(s): Kole Barbetti, Brian Mintah, Tyler Potsko, Deven Schwartz 
//Last Updated: 12/7/2022
//


function displaybubbles(data, displayopt){

    const width = 1500
    const height = 950

    /*
    const data = [
        { state: 'Iowa', region: 'Asia', cases: 527 },
    { state: 'Alaska', region: 'Asia', cases: 34573 },
    { state: 'Hawaii', region: 'Asia', cases: 235 },
    { state: 'Tennessee', region: 'Asia', cases: 987 },
    { state: 'Virginia', region: 'Asia', cases: 235 },
    { state: 'Oklahoma', region: 'Asia', cases: 3424 },
    { state: 'Pennsylvania', region: 'Asia', cases: 124357 },
        { state: 'Kansas', region: 'Asia', cases: 6000 },
        { state: 'Idaho',  region: 'Asia', cases: 73},
        { state: 'Montana', region: 'Asia', cases: 82},

    ];

    */

    // append the svg object to the body of the page
    const svg = d3.select("#d3test")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    const color = d3.scaleOrdinal()
        .domain(["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"])
        .range(["gold", "blue", "#24803d", "#69e0d8", "#69e0d8", "#8a2061", "#db4f89", "#7db58c", "#5be02f", "#bbc920", "pink", "brown", "slateblue", "orange", "grey", "#dba258", "#ba3223", "#7f82d4", "#151645", "#b881d6", "#5bd4b3", "#bbabc2", "#879996", "#4b5947", "#9c9664", "#c9ae8f", "#66514d", "#11613d", "#6eebb3", "#1c6787", "#a82bf0", "#78a0f0", "#2bed2e", "#8fab2b", "#f547e3", "#f00a34", "#470423", "#ff0000", "#b4d1c1", "#3c0252", "#85755b", "#3d6940", "#32a864", "#e28743", "#627a37", "#cc9356", "#d64633", "#325c8c", "#0b966a", "#7c5094", "#870720"]  );

    //546d6e
    //pa = red\
    
    //county cases
    if (displayopt === "cases"){

        svg.append("text")
            .attr("transform", "translate(10,0)")
            .attr("x", 30)
            .attr("y", 40).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Bubbles Represent Counties with Cases Greater then 45,000 ");

      // Filter a bit the data -> more than 50k cases
        data = data.filter(function(d){ return d.cases>45000 })

      // Size scale for counties
        const size = d3.scaleLinear()
            .domain([0, 1000000])
            .range([1,45])  // circle will be between 1 and 45 px wide

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
                .html('<u>' + d.county + ", " + d.state + '</u>' + "<br>" + d.cases + " cases")
                .style("left", (event.x/2+20) + "px")
                .style("top", (event.y/2-30) + "px")
        }
        var mouseleave = function(event, d) {
            Tooltip
                .style("opacity", 0)
        }

      // Initialize the circle: all located at the center of the svg area
      //maybe make starting x/y random for initial movement
        var node = svg.append("g")
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "node")
            .attr("r", (d => size(d.cases)))
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", d => color(d.state))
            .style("fill-opacity", 0.8)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

      // Features of the forces applied to the nodes:
        const simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(2.2)) // Nodes are attracted one each other of cases is > 0
            .force("collide", d3.forceCollide().strength(1.3).radius(function(d){ return (size(d.cases)+2) }).iterations(1)) // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' cases is low enough), simulations will stop.
        simulation
            .nodes(data)
            .on("tick", function(d){
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
            });

      // What happens when a circle is dragged?
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(.03).restart();
                d.fx = d.x;
                d.fy = d.y;
        }
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
        }

    
    //else display is deaths in counties
    }else{

        svg.append("text")
            .attr("transform", "translate(10,0)")
            .attr("x", 30)
            .attr("y", 40).attr("font-size", "20px")
            .style('fill', '#f4f4f4')
            .text("Bubbles Represent Counties with Deaths Greater then 800 ");

      // Filter a bit the data -> more than 800 deaths
        data = data.filter(function(d){ return d.deaths>800 })

      // Size scale for bubbles
        const size = d3.scaleLinear()
            .domain([0, 10000])
            .range([1,45])  // circle will be between 7 and 55 px wide

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
                .html('<u>' + d.county + ", " + d.state + '</u>' + "<br>" + d.deaths + " deaths")
                .style("left", (event.x/2+20) + "px")
                .style("top", (event.y/2-30) + "px")
        }
        var mouseleave = function(event, d) {
            Tooltip
                .style("opacity", 0)
        }

      // Initialize the circle: all located at the center of the svg area
      //maybe make starting x/y random for initial movement
        var node = svg.append("g")
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("class", "node")
            .attr("r", (d => size(d.deaths)))
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .style("fill", d => color(d.state))
            .style("fill-opacity", 0.8)
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .on("mouseover", mouseover) // What to do when hovered
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
      // Features of the forces applied to the nodes:
        const simulation = d3.forceSimulation()
            .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
            .force("charge", d3.forceManyBody().strength(2.2)) // Nodes are attracted one each other of cases is > 0
            .force("collide", d3.forceCollide().strength(1.3).radius(function(d){ return (size(d.deaths)+2) }).iterations(1)) // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' cases is low enough), simulations will stop.
        simulation
            .nodes(data)
            .on("tick", function(d){
                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y)
            });

      // What happens when a circle is dragged?
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(.03).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(.03);
            d.fx = null;
            d.fy = null;
        }
        
        
        
        
    //eoif
    }







//eofunction
}









//eof
