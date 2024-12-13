'use client'

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Link from 'next/link';

type Props = {
  propId : number
}

export default function VisuslizationSelect(props : Props) {
  const [alignment, setAlignment] = React.useState('histogram');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "Histogram" | "Map" | "Comparison",
  ) => {
    //props.handleVisualChange(newAlignment)
    setAlignment(newAlignment);
    console.log("alignment is ", alignment)
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
     <Link
       href = {props.propId == 0 ? `/visuals/histogram` : 
        `/visuals/histogram/?proposition_id=${props.propId}`}
       >
      <ToggleButton value="Histogram">Histogram</ToggleButton>
      </Link>
      <Link
       href = {props.propId == 0 ? `/visuals/map` : 
        `/visuals/map/?proposition_id=${props.propId}`}
       >
      <ToggleButton value="Map">Map</ToggleButton>
      </Link>
      <Link
       href = {props.propId == 0 ? `/visuals/comparison` : 
        `/visuals/comparison/?proposition_id=${props.propId}`}
       >
      <ToggleButton value="Comparison">Comparison</ToggleButton>
      </Link>
    </ToggleButtonGroup>
  );
}

