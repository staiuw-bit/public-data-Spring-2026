
// SVG size
const w = 900;
const h = 500;
const margin = 60;

// Load CSV file
d3.csv("D3HW2Dataset.csv").then(data => {

    console.log(data);

    // Convert data types
    data.forEach(d => {

        d.Year = +d.Year;
        d.Month = +d.Month;
        d.Day = +d.Day;

        d["Max."] = +d["Max."];
        d["Min."] = +d["Min."];

        // Create full date
        d.date = new Date(d.Year, d.Month - 1, d.Day);
    });

    // X Scale
    const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.date))
        .range([margin, w - margin]);

    // Y Scale
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(data, d => d["Min."]),
            d3.max(data, d => d["Max."])
        ])
        .range([h - margin, margin]);

    // Bottom Axis
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.timeFormat("%b %d"));

    // Left Axis
    const leftAxis = d3.axisLeft(yScale);

    // Create SVG
    const svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Max Temperature line
    const maxLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d["Max."]));

    // Min Temperature line
    const minLine = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d["Min."]));

    // Draw Max Temperature line
    svg.append("path")
        .datum(data)
        .attr("class", "max-line")
        .attr("d", maxLine);

    // Draw Min Temperature line
    svg.append("path")
        .datum(data)
        .attr("class", "min-line")
        .attr("d", minLine);

    // Add x-axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${h - margin})`)
        .call(bottomAxis);

    // Add y-axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${margin}, 0)`)
        .call(leftAxis);

    // X-axis label
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", h - 10)
        .attr("text-anchor", "middle")
        .text("Date");

    // Y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -h / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .text("Temperature");

    // Legend for Max Temperature
    svg.append("line")
        .attr("x1", 650)
        .attr("x2", 690)
        .attr("y1", 60)
        .attr("y2", 60)
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3);

    svg.append("text")
        .attr("x", 700)
        .attr("y", 65)
        .text("Maximum Temperature");

    // Legend for Min Temperature
    svg.append("line")
        .attr("x1", 650)
        .attr("x2", 690)
        .attr("y1", 90)
        .attr("y2", 90)
        .attr("stroke", "crimson")
        .attr("stroke-width", 3);

    svg.append("text")
        .attr("x", 700)
        .attr("y", 95)
        .text("Minimum Temperature");

});