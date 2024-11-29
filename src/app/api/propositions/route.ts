import prisma from '@/lib/prisma'
import { NextResponse, NextRequest } from 'next/server'

//INCOMPLETE --- NEEDS TO BE FINISHED

/**
 * @fileoverview
 * This file contains the api call that returns all of the propositions
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
 * @author Oliver Ramirez
 * @version 1.0.0
 * @date 2024-11-28
 * 
 */


//CHANGE THIS CODE TO RETURN ALL PROPOSITIONS
export async function GET(req: NextRequest) {
  try {
    // Extract the year query parameter from the URL
    const { searchParams } = new URL(req.url);
    const year = searchParams.get('year');
    console.log("year is" + year)

    // Check if 'year' is null or not a valid number
    if (!year) {
     return NextResponse.json({ error: 'Year query parameter is required' }, { status: 400 });
  }
    
    const propositions = await prisma.proposition_votes.findMany({
      where:{
        proposition_year: parseInt(year, 10)
      },
      select: {
        proposition_id: true,
        proposition_name: true,
      }
    })
    console.log("propositions are" + propositions[0].proposition_name)
    
    return NextResponse.json(propositions)
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