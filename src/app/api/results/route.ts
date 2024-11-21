import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propositionId = searchParams.get('propositionId');
  const yearId = searchParams.get('yearId');

  if (!propositionId || !yearId) {
    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  try {
    const results = await prisma.result.findMany({
      where: {
        propositionId,
        yearId,
      },
      select: {
        votesFor: true,
        votesAgainst: true,
        turnout: true,
        county: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    const formattedResults = results.map(result => ({
      countyId: result.county.id,
      countyName: result.county.name,
      votesFor: result.votesFor,
      votesAgainst: result.votesAgainst,
      turnout: result.turnout,
    }));

    return NextResponse.json(formattedResults);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results' },
      { status: 500 }
    );
  }
}