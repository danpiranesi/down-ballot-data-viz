export interface MapConfig {
    style: string;
    center: [number, number];
    zoom: number;
  }
  
  export interface ElectionResult {
    county: string;
    winner: string;
    margin: number;
    totalVotes: number;
  }