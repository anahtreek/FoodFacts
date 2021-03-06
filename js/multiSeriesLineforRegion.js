let margin = {
    top: 30,
    right: 40,
    bottom: 30,
    left: 50
};
let width = 600 - margin.left - margin.right;
let height = 270 - margin.top - margin.bottom;
// let	parseDate = d3.time.format('%d-%b-%y').parse;

let x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 1, 0.2);
let y = d3.scale.linear().range([height, 0]);

let xAxis = d3.svg.axis().scale(x).orient('bottom');

let yAxis = d3.svg.axis().scale(y).orient('left');

let valueline = d3.svg.line()
    .x(function(d) {
        return x(d.region);
    })
    .y(function(d) {
        return y(d.fat);
    });

let valueline2 = d3.svg.line()
    .x(function(d) {
        return x(d.region);
    })
    .y(function(d) {
        return y(d.protein);
    });

let valueline3 = d3.svg.line().x(function(d) {
    return x(d.region);
}).y(function(d) {
    return y(d.carbohydrates);
});

let svg = d3.select('#multiline')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Get the data
d3.json('../outputdata/carboProteinFat.json', function(error, data) {
    data.forEach(function(d) {
        d.region = d.region;
        d.fat = +d.fat;
        d.protein = +d.protein;
    });

    x.domain(data.map(function(d) {
        return d.region;
    }));
    // Scale the range of the data
    // x.domain(d3.extent(data, function(d) { return d.region; }));
    y.domain([0, d3.max(data, function(d) {
        return Math.max(d.fat, d.protein, d.carbohydrates);
    })]);
    // Add the valueline path.
    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', valueline(data));
    // Add the valueline2 path.
    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'green')
        .attr('d', valueline2(data));

    // Add the valueline2 path.
    svg.append('path')
        .attr('class', 'line')
        .style('stroke', 'blue')
        .attr('d', valueline3(data));

    // Add the X Axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    // Add the Y Axis
    svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].fat) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'red')
        .text('fat');

    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].protein) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'green')
        .text('protein');

    svg.append('text')
        .attr('transform', 'translate(' + (width + 3) + ',' + y(data[0].carbohydrates) + ')')
        .attr('dy', '.35em')
        .attr('text-anchor', 'start')
        .style('fill', 'blue')
        .text('carbo');


    // console.log(data.length-1);
    // console.log(data[data.length-1].open);
    // console.log(data[0].open);
    // console.log(y(data[0].open));
    // console.log(y(data[0].close));
});
