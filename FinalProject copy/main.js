// Constants / global variables
const w = 1100;
const h = 900;
const margin = 70;

// Parse date format
const parseTime = d3.timeParse("%Y-%m-%d");

// Load CSV file
d3.csv("2024to2026FoodInflation.csv").then(data => {

    console.log("data", data);

    // Convert data types
    data.forEach(d => {
        d.observation_date = parseTime(d.observation_date);
        d.CPIUFDSL = +d.CPIUFDSL;
    });

    // X scale
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.observation_date))
        .range([margin, w - margin]);

    // Y scale
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.CPIUFDSL) - 1,
            d3.max(data, d => d.CPIUFDSL) + 1
        ])
        .range([h - 220, margin]);

    // Bottom axis
    const bottomAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.timeFormat("%b %Y"));

    // Left axis
    const leftAxis = d3.axisLeft()
        .scale(yScale);

    // Create SVG
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Chart title
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .text("Food Inflation Index (2024–2026)");

    // Chart description
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", 55)
        .attr("text-anchor", "middle")
        .style("font-size", "13px")
        .text("Monthly U.S. Food Consumer Price Index (CPIUFDSL)");

    // Line generator
    const line = d3.line()
        //.curve(d3.curveNatural)
        .x(d => xScale(d.observation_date))
        .y(d => yScale(d.CPIUFDSL));

    // Draw line
    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    // X-axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${h - 220})`)
        .call(bottomAxis)
        .selectAll("text")
        .attr("transform", "rotate(-40)")
        .style("text-anchor", "end");

    // Y-axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},0)`)
        .call(leftAxis);

    // X-axis label
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", h - 170)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Date");

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -(h - 220) / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Food Inflation Index");

    // Analysis header
    svg.append("text")
        .attr("x", margin)
        .attr("y", h - 120)
        .style("font-size", "15px")
        .style("font-weight", "bold")
        .text("Key Insights:");

    // Analysis text
    svg.append("text")
        .attr("x", margin)
        .attr("y", h - 90)
        .attr("class", "analysis-text")
        .text("• U.S. food prices remained persistently high after earlier inflationary periods.");

    svg.append("text")
        .attr("x", margin)
        .attr("y", h - 65)
        .attr("class", "analysis-text")
        .text("• Policies aimed at controlling inflation slowed extreme growth but did not reduce prices significantly.");

    svg.append("text")
        .attr("x", margin)
        .attr("y", h - 40)
        .attr("class", "analysis-text")
        .text("• External events such as geopolitical conflicts, labor shortages, and supply-chain disruptions continued influencing food costs.");

    svg.append("text")
        .attr("x", margin)
        .attr("y", h - 15)
        .attr("class", "analysis-text")
        .text("• The sudden crash in late 2025 is likely related to the government shutdown, which may have interrupted Federal Reserve data reporting and resulted in missing data.");

});