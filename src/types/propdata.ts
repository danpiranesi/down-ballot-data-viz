export type Proposition = {
    id: number
    name: string
    year: number
}

export type VoteData = {
    county_id: number;
    yes_count: number;
    no_count: number;
    total_votes: number;
    county_name: "string";
  }