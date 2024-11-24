import { tooltip } from './svgGlobals.js';
import { select } from 'd3';

export function popUpTooltip(e, voteData) {
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

export function adjustTooltip(e) {
  console.log(e);
  console.log(e.pageY);
  tooltip
    .style('left', e.pageX - 80 + 'px')
    .style('top', e.pageY - 80 + 'px');
}

//get the number of yes votes for a county
export function getYesVotes(voteData, county) {
  // Find the matching data for the specified county
  const countyVotes = voteData.find(
    (row) => row.County === county,
  );
  // If data exists, return the number of Yes votes; otherwise, return 0
  return countyVotes ? countyVotes.yesVotes : 0;
}

//get the number of no votes for a county
export function getNoVotes(voteData, county) {
  // Find the matching data for the specified county
  const countyVotes = voteData.find(
    (row) => row.County === county,
  );
  // If data exists, return the number of Yes votes; otherwise, return 0
  return countyVotes ? countyVotes.noVotes : 0;
}
