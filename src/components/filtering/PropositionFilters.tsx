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
  proposition_id: string
  proposition_name: string
}

export function PropositionFilters() {
  const [propositions, setPropositions] = useState<Proposition[]>([])
  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [selectedProposition, setSelectedProposition] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  //Fetch voting years for the drop down on mounting of the component
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

  //Fetch propositions from the selected year when a year is chose.
  useEffect(() => {
    const fetchPropositions = async () => {
      try {
        const response = await fetch(`api/propositions?year=${selectedYear}`)
        if (!response.ok){
          throw new Error('failed to fetch propositions')
        }
        const propositions = await response.json()

        console.log(" name: " + propositions[0].proposition_name)
        setSelectedProposition('');
        setPropositions(propositions)
      }catch{
        setPropositions([])
      }
      
    }
    
    fetchPropositions()
  }, [selectedYear])


  if (loading) return <div className="text-gray-500">Loading propositions...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    <div className="space-y-4">

      {/*Year Drop Down Menu Selector*/}
      <Select 
        onValueChange={setSelectedYear} 
        value={selectedYear}
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
              <SelectItem key={prop.proposition_id} value={prop.proposition_id}>
                {prop.proposition_name}
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
