'use client';

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Proposition = {
  id: string
  title: string
  description: string
}

export function PropositionFilters() {
  const [propositions, setPropositions] = useState<Proposition[]>([])
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [selectedProposition, setSelectedProposition] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchYears = async () => {
        try {
          const response = await fetch(`/api/years`)
          if (!response.ok) {
            throw new Error('Failed to fetch Years')
            return
          }
          const years = await response.json()
          setAvailableYears(years)
        }
         catch {
          console.log("failure")
          setAvailableYears([])
        } finally {
          setLoading(false)
        }
      }
      fetchYears()
  }, [])

  // useEffect(() => {
  //   const fetchPropositions = async () => {
  //     try {
  //       const response = await fetch('/api/years')
  //       if (!response.ok) throw new Error('Failed to fetch propositions')
  //       const data = await response.json()
  //       console.log
  //       setPropositions(data)
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : 'An error occurred')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchPropositions()
  // }, [])

  // useEffect(() => {
  //   if (!selectedProposition) {
  //     setAvailableYears([])
  //     setSelectedYear('')
  //     return
  //   }

  //   const fetchYears = async () => {
  //     setSelectedYear('')
  //     try {
  //       const response = await fetch(`/api/years`)
  //       if (!response.ok) {
  //         setAvailableYears([])
  //         return
  //       }
  //       const years = await response.json()
  //       setAvailableYears(years)
  //     } catch {
  //       setAvailableYears([])
  //     }
  //   }

  //   fetchYears()
  // }, [selectedProposition])

  if (loading) return <div className="text-gray-500">Loading propositions...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="space-y-4">

      {/*Year Drop Down Menu Selector*/}
      <Select 
        onValueChange={setSelectedYear} 
        value={selectedYear}
        //disabled={!selectedProposition}
      >
        <SelectTrigger className="w-full text-gray-900">
          <SelectValue placeholder="Select year" className="text-gray-900" />
        </SelectTrigger>
        <SelectContent className="text-gray-900">
          {availableYears.length > 0 ? (
            availableYears.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-years-available" disabled>
              {selectedProposition ? 'No years available' : 'Select a proposition first'}
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/*Proposition Drop Down Menu Selector*/}
      <Select
       onValueChange={setSelectedProposition}
       value={selectedProposition}
       disabled={!selectedYear}
        >
        <SelectTrigger className="w-full text-gray-900">
          <SelectValue placeholder="Select a proposition" className="text-gray-900" />
        </SelectTrigger>
        <SelectContent className="text-gray-900">
          {propositions.length > 0 ? (
            propositions.map((prop) => (
              <SelectItem key={prop.id} value={prop.id}>
                {prop.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-propositions-available" disabled>
              No propositions available
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      
    </div>
  )
}
