    //Declare consts/global variables
        const margin = 30;
        const width = 500; 
        const height = 500;


    //Load data and related variables
        d3.csv("emails.csv").then(data => {//the real name of the file in the quotes 
            console.log("data", data)
        //format data
        data.forEach(d => { //for each item in the dataset
            d.day = d.day;//column name 
            d.emails = +d.emails; //+: showing the data as numbers 
        });
        
        const maxY = d3.max(data, d =>
    d3.max([
        d.X2014, d.X2015, d.X2016, d.X2017,
        d.X2018, d.X2019, d.X2020, d.X2021,
        d.X2022, d.X2023, d.X2024, d.X2025
    ])
);


    //Scales - note: band and linear
        const xScale = d3.scaleBand()
                        .domain(data.map(d => d.day))
                        .range([margin, width - margin])
                        .paddingInner(.02);//how close the bars are 
        
        const yScale = d3.scaleLinear()
                        .domain([0, maxY]) 
                        .range([height - margin, margin]);//within the margins
        

    //SVG
        const svg = d3.select("body")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height);

                    
    //Axes - create axes
        const bottomAxis = d3.axisBottom()
                             .scale(xScale);
        
        const leftAxis = d3.axisLeft()
                           .scale(yScale);
        

    //Bars
    //rect needs x, y, width, and height
        svg.selectAll("rect") 
            .data(data) 
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.day)) 
            .attr("y", d => yScale(d.emails)) 
            .attr("width", xScale.bandwidth()) // note this is specific to using the bandscale as the scale calculates padding
            .attr("height", d => (height-margin) - yScale(d.emails))//size of the rectangle (the height )
            .attr("fill", "pink");
        

    //Axes - call axes
        svg.append("g")
            .attr("transform", "translate(0," + (height - margin) + ")") 
            .call(bottomAxis);

        svg.append("g")
            .attr("transform", "translate(" + margin + ",0)")
            .call(leftAxis); 

                
    });