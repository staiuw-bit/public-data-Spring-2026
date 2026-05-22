// Consts / global variables
const w = 700;
const h = 500;
const margin = 70;

// Parse date
const parseTime = d3.timeParse("%Y-%m-%d");

// Add webpage title and description
d3.select("body")
    .append("h1")
    .text("Daily Temperature Trends");

d3.select("body")
    .append("p")
    .text("This visualization shows the minimum and maximum daily temperatures over time from the dataset. Use the buttons below to switch between temperature types.");

// Load CSV
d3.csv("D3HW3Dataset.csv").then(data => {

    console.log("data", data);

    // Format data
    data.forEach(d => {

        // Create full date string
        d.date = parseTime(`${d.Year}-${d.Month}-${d.Day}`);

        // Convert temperature values to numbers
        d.max = +d["Max."];
        d.min = +d["Min."];
    });

    // X Scale
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin, w - margin]);

    // Y Scale
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d.min) - 5,
            d3.max(data, d => d.max) + 5
        ])
        .range([h - margin, margin]);

    // Create SVG
    const svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // SVG Chart Title
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Temperature Over Time");

    // X-axis label
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", h - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Date");

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -h / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Temperature");

    // Bottom axis
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b %d"));

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${h - margin})`)
        .call(bottomAxis);

    // Left axis
    const leftAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin},0)`)
        .call(leftAxis);

    // Function to draw data
    function drawData(which) {

        // Line generator
        const coords = d3.line()
            .x(d => xScale(d.date))
            .y(d => {

                if (which === "min") {
                    return yScale(d.min);

                } else if (which === "max") {
                    return yScale(d.max);
                }
            });

        // Draw line
        svg.selectAll(".line")
            .data([data])
            .join("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 3)
            .attr("d", coords);
    }

    // Default graph
    drawData("max");

    // Button interaction
    d3.selectAll("button").on("click", (event) => {

        const selected = event.currentTarget;

        if (selected.id === "buttonMin") {

            drawData("min");

        } else if (selected.id === "buttonMax") {

            drawData("max");
        }
    });

});