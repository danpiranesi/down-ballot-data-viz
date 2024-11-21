import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const propositions = await prisma.proposition.findMany({
      orderBy: {
        title: 'asc'
      },
      select: {
        id: true,
        title: true,
        description: true
      }
    })
    
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