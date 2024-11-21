import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const results = await prisma.result.findMany({
      where: {
        propositionId: params.id
      },
      select: {
        year: {
          select: {
            year: true
          }
        }
      },
      distinct: ['yearId'],
      orderBy: {
        year: {
          year: 'desc'
        }
      }
    })
    
    const years = results.map(result => result.year.year)
    
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