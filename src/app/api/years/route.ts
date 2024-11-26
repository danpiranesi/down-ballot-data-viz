import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const results = await prisma.years.findMany({
      orderBy: {
        year: 'desc',  // Sort by year in descending order
      }
    })
    
    const years = results.map(result => result.year)
    
    return NextResponse.json(years)
  } catch (error) {
    console.error('Prisma error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch years for proposition',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}