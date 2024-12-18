export type Proposition = {
    id: number
    name: string
    year: number
    votes: VoteData[]
    description: string
    passed: boolean
    passed_percentage: number


}

export type VoteData = {
    county_id: number;
    yes_count: number;
    no_count: number;
    total_votes: number;
    county_name: string;
  }