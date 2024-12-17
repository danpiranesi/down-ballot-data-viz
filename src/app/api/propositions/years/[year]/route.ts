import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

/**
 * @fileoverview
 * This file contains the api call that returns all of the propositions
 * in a given voting year based on the given year value
 *
 * @dependencies
 * - prisma: ORM for database interaction.
 * - next.js: Framework used for server-side routing and API handling.
 *
 * @usage
 * - The `/propositions/years` endpoint retrieves all available years for propositions.
 * - The `/propositions/years/[year]` endpoint retrieves propositions for a specific year.
 * - The `/propositions/[proposition_id]` endpoint retrieves data for a given proposition ID.
 *
 * @author Oliver Ramirez, Dan Schmidt
 * @version 1.0.0
 * @date 2024-11-28
 * 
 */


export async function GET(req: NextRequest, {params}: {params: Promise<{year: string}>}) {
  try {
    const { year }= await params;

    // Check if 'year' is null or not a valid number
  //   if (!year) {
  //    return NextResponse.json({ error: 'Year query parameter is required' }, { status: 400 });
  // }
    
    
  
  
  const propositions = await prisma.propositions.findMany({
    where: {
      year: parseInt(year, 10),
    },
    include: {
      proposition_county_votes: {
        include: {
          counties: true,
        },
      },
    },
  });
    console.log(propositions)

    if (propositions.length === 0) {
      console.error('No propositions found for year:', year);
      return NextResponse.json({ error: 'No propositions found for this year' }, { status: 404 });
    }

    // Format the vote data for each proposition
    const formattedPropositions = propositions.map((proposition) => {
      const formattedVotes = proposition.proposition_county_votes.map((vote) => ({
        county_id: vote.county_id,
        county_name: vote.counties?.name || 'Unknown County',
        yes_count: vote.yes_count || 0,
        no_count: vote.no_count || 0,
        total_votes: vote.total_votes || 0,
      }));

      return {
        id: proposition.id,
        name: proposition.name,
        year: proposition.year,
        description: proposition.description,
        passed: proposition.passed,
        pass_percentage: proposition.pass_percentage,
        votes: formattedVotes,
      };
    });
    
    return NextResponse.json(formattedPropositions)
  } catch (error) {
    console.error('Prisma error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch propositions',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}