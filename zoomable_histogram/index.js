import * as d3 from 'd3';

// Set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 50, left: 50 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
const svg = d3
  .select('#my_dataviz')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr(
    'transform',
    'translate(' + margin.left + ',' + margin.top + ')',
  );

// Process and Render the Data
function render(voteData) {
  // Extract the county names and voter data
  const counties = voteData.map((d) => d.County);

  // Define scales
  const x = d3
    .scaleBand()
    .domain(counties)
    .range([0, width])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(voteData, (d) => d.yesVotes + d.noVotes),
    ])
    .nice()
    .range([height, 0]);

  const color = d3
    .scaleOrdinal()
    .domain(['yesVotes', 'noVotes'])
    .range(['#4CAF50', '#F44336']);

  // Append X-axis
  svg
    .append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end');

  // Append Y-axis
  svg.append('g').call(d3.axisLeft(y));

  // Create tooltip
  const tooltip = d3
    .select('#my_dataviz')
    .append('div')
    .style('opacity', 0)
    .attr('class', 'tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '1px')
    .style('border-radius', '5px')
    .style('padding', '10px');

  // Tooltip handlers
  const mouseover = function (event, d) {
    console.log(this);
    tooltip
      .style('opacity', 1)
      .html(
        ` <strong> ${event.data.County} County  </strong><br> <strong>Votes Yes: </strong> ${event.data.yesVotes}<br> <strong>Votes No: </strong> ${event.data.noVotes}`,
      );
  };

  const mousemove = function (event) {
    tooltip
      .style('left', event.pageX + 10 + 'px')
      .style('top', event.pageY + 'px');
  };

  const mouseleave = function () {
    tooltip.style('opacity', 0);
  };

  // Stack the data
  const stackedData = d3
    .stack()
    .keys(['yesVotes', 'noVotes'])(voteData);

  // Draw bars
  svg
    .append('g')
    .selectAll('g')
    .data(stackedData)
    .enter()
    .append('g')
    .attr('fill', (d) => color(d.key))
    .selectAll('rect')
    .data((d) => d)
    .enter()
    .append('rect')
    .attr('x', (d) => x(d.data.County))
    .attr('y', (d) => y(d[1]))
    .attr('height', (d) => y(d[0]) - y(d[1]))
    .attr('width', x.bandwidth())
    .attr('data-key', (d) => d.data.County)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave);
}

// Load Data
const countyurl =
  'https://raw.githubusercontent.com/earthlab/earthpy/refs/heads/main/earthpy/example-data/colorado-counties.geojson';
const balloturl =
  'https://raw.githubusercontent.com/ohk99/cp341/refs/heads/main/PROP_EXQ.csv';

d3.json(countyurl, function (countyData) {
  d3.csv(balloturl, function (voteData) {
    // Process data
    voteData.forEach((row) => {
      row.yesVotes =
        parseInt(
          row['Yes\nNone/Unknown'].replace(/,/g, ''),
          10,
        ) || 0;
      row.noVotes =
        parseInt(
          row['No\nNone/Unknown'].replace(/,/g, ''),
          10,
        ) || 0;
      row.County = row.County.trim();
    });

    //remove the total
    voteData = voteData.filter(
      (d) => d.County !== 'Totals',
    );
    render(voteData);
  });
});
