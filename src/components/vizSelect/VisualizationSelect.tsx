'use client'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useRouter } from 'next/navigation'; 
import React, { useEffect } from 'react';

type Props = {
  propId: number;
}

export default function VisualizationSelect(props: Props) {
  const [alignment, setAlignment] = React.useState<"Histogram" | "Map" | "Comparison" | null>("Histogram");
  const router = useRouter();
  
  // Function to handle navigation
  const handleNavigation = (newAlignment: "Histogram" | "Map" | "Comparison" | null) => {
    if (newAlignment === "Histogram") {
      router.push(props.propId === 0 ? `/visuals/histogram` : `/visuals/histogram/?proposition_id=${props.propId}`);
    } else if (newAlignment === "Map") {
      router.push(props.propId === 0 ? `/visuals/map` : `/visuals/map/?proposition_id=${props.propId}`);
    } else if (newAlignment === "Comparison") {
      router.push(props.propId === 0 ? `/visuals/comparison` : `/visuals/comparison/?proposition_id=${props.propId}`);
    }
  };

 
  useEffect(() => {
    if (window.location.pathname.includes('/visuals/histogram')) {
      setAlignment("Histogram");
    } else if (window.location.pathname.includes('/visuals/map')) {
      setAlignment("Map");
    } else if (window.location.pathname.includes('/visuals/comparison')) {
      setAlignment("Comparison");
    }
  }, []);  // Make sure this effect runs when the path changes

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: "Histogram" | "Map" | "Comparison" | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      handleNavigation(newAlignment);  
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Visualization Type"
    >
      <ToggleButton value="Histogram">
        Histogram
      </ToggleButton>

      <ToggleButton value="Map">
        Map
      </ToggleButton>

      <ToggleButton value="Comparison">
        Comparison
      </ToggleButton>

    </ToggleButtonGroup>
  );
}
