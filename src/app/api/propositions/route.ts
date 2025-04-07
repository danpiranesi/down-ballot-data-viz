import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * @fileoverview
 * This file contains the API call that returns all propositions.
 *
 * @usage
 * - The `/propositions` endpoint retrieves a list of all propositions.
 *
 * @author Oliver Ramirez, Dan Schmidt
 * @version 1.0.0
 * @date 2024-11-28
 */

export async function GET() {
  try {
    // Return all propositions when accessed directly
    const allPropositions = await prisma.propositions.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        year: true,
        passed: true,
        pass_percentage: true,
      },
      orderBy: {
        year: 'desc',
      },
    });

    return NextResponse.json(allPropositions);
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch proposition data',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}