//declaring global variables
 /*   const margin = 30;
    const width = 500;
    const height = 500;

//loading data
 d3.csv("CleanedMeatData.csv").then(data => {//the real name of the file in the quotes 
            console.log("data", data)
        //format data
       data.forEach(d => {
    d.Item = d.Item;

    d.X2014 = +d.X2014;
    d.X2015 = +d.X2015;
    d.X2016 = +d.X2016;
    d.X2017 = +d.X2017;
    d.X2018 = +d.X2018;
    d.X2019 = +d.X2019;
    d.X2020 = +d.X2020;
    d.X2021 = +d.X2021;
    d.X2022 = +d.X2022;
    d.X2023 = +d.X2023;
    d.X2024 = +d.X2024;
    d.X2025 = +d.X2025;
});*/
d3.csv("CleanedMeatData.csv").then(data => {

    // chart size
    const width = 800;
    const height = 500;
    const margin = 50;

    // format data
    data.forEach(d => {
        d.Item = d.Item;
        d.X2025 = +d.X2025;
    });

    // max value
    const maxY = d3.max(data, d => d.X2025);

    // scales
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Item))
        .range([margin, width - margin])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, maxY])
        .range([height - margin, margin]);

    // svg
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // axes
    const bottomAxis = d3.axisBottom(xScale);

    const leftAxis = d3.axisLeft(yScale);

    // bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => xScale(d.Item))
        .attr("y", d => yScale(d.X2025))
        .attr("width", xScale.bandwidth())
        .attr("height", d => (height - margin) - yScale(d.X2025))
        .attr("fill", "pink");

    // bottom axis
    svg.append("g")
        .attr("transform", "translate(0," + (height - margin) + ")")
        .call(bottomAxis);

    // left axis
    svg.append("g")
        .attr("transform", "translate(" + margin + ",0)")
        .call(leftAxis);

});