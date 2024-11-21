import { select } from 'd3';
import { tooltip } from './svgGlobals.js';

var countyNames = new Map();

function render(us, voteData) {
  console.log(us);
  const svg = select('svg');
  const height = svg.attr('height');
  var projection = d3.geoMercator().fitSize([500, 400], us);
  var path = d3.geoPath(projection);
  svg
    .append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(us.features)
    .enter()
    .append('path')
    //.attr('fill', '#a6cee3')
    .attr('fill', 'red')
    .attr('stroke', '#333') // Border color
    .attr('d', path)
    .on('mouseenter', function (e, d) {
      //console.log(d);
      d3.select(this).style('fill', '#084081');
      popUpTooltip(e);
    })
    .on('mousemove', function (e, d) {
      adjustTooltip(d);
    })
    .on('mouseleave', function (e, d) {
      d3.select(this).style('fill', 'red');
    })
    .on('mousedown', function (e, d) {
      console.log(
        `Total Yes Votes for ${e.properties.name} County: ${getYesVotes(
          voteData,
          e.properties.name,
        )} \n`,
        `Total No Votes for ${e.properties.name} County: ${getNoVotes(
          voteData,
          e.properties.name,
        )}`,
      );
    })
    .attr('transform', 'translate(300,0)');

  // Add county names
  svg
    .append('g')
    .attr('class', 'county-labels')
    .selectAll('text')
    .data(us.features)
    .enter()
    .append('text')
    .attr('x', (d) => path.centroid(d)[0])
    .attr('y', (d) => path.centroid(d)[1])
    .text((d) => d.properties.name) // Use the county name from GeoJSON properties
    .attr('font-size', '10px')
    .attr('fill', '#000') // Text color
    .attr('text-anchor', 'middle') // Center align text
    .attr('transform', 'translate(300,0)'); // Same translation as counties

  function popUpTooltip(e) {
    //get the number of votes
    tooltip
      .style('opacity', 1)
      .style('z-index', 10)
      .html(
        `${e.properties.name}<br/># of votes yes: ${getYesVotes(
          voteData,
          e.properties.name,
        )} <br/> # of votes no: ${getNoVotes(voteData, e.properties.name)}`,
      );
  }
  function adjustTooltip(e) {
    tooltip
      .style('left', e.x - 80 + 'px')
      .style('top', e.y - 80 + 'px');
  }
}

//get the number of yes votes for a county
function getYesVotes(voteData, county) {
  // Find the matching data for the specified county
  const countyVotes = voteData.find(
    (row) => row.County === county,
  );
  // If data exists, return the number of Yes votes; otherwise, return 0
  return countyVotes ? countyVotes.yesVotes : 0;
}

//get the number of no votes for a county
function getNoVotes(voteData, county) {
  // Find the matching data for the specified county
  const countyVotes = voteData.find(
    (row) => row.County === county,
  );
  // If data exists, return the number of Yes votes; otherwise, return 0
  return countyVotes ? countyVotes.noVotes : 0;
}

//take out confusing naming and just have yes and no votes with county names
function processData(countyData, voteData) {
  voteData.forEach((row, index) => {
    const fixedRow = {
      County: row['County'].trim(),
      yesVotes:
        parseInt(
          row['Yes\nNone/Unknown'].replace(/,/g, ''),
          10,
        ) || 0,
      noVotes:
        parseInt(
          row['No\nNone/Unknown'].replace(/,/g, ''),
          10,
        ) || 0,
    };

    // Replace the original row in voteData with the fixed row
    voteData[index] = fixedRow;
  });
}

// Update the URLs to point to your dataset locations
const countyurl =
  'https://raw.githubusercontent.com/earthlab/earthpy/refs/heads/main/earthpy/example-data/colorado-counties.geojson';
const balloturl =
  'https://raw.githubusercontent.com/ohk99/cp341/refs/heads/main/PROP_EXQ.csv';

Promise.all([d3.json(countyurl), d3.csv(balloturl)]).then(
  ([countyData, voteData]) => {
    console.log(countyData.features[4].properties.name);
    console.log(voteData[4]);
    //make voteData more accessible
    processData(countyData, voteData);
    console.log(voteData);
    // get the names of each county
    voteData.forEach((row) => {
      if (!countyNames.has(row.county)) {
        countyNames.set(row.County, []);
      }
      countyNames.get(row.County).push(row.County);
      //console.log(countyNames);
    });

    render(countyData, voteData);
  },
);
