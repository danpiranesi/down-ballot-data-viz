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

export default function PropositionDropdown() {
  const [propositions, setPropositions] = useState<Proposition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPropositions = async () => {
      try {
        const response = await fetch('/api/propositions')
        if (!response.ok) {
          throw new Error('Failed to fetch propositions')
        }
        const data = await response.json()
        setPropositions(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPropositions()
  }, [])

  if (loading) {
    return <div className="text-gray-500">Loading propositions...</div>
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  return (
    <Select onValueChange={(value) => console.log('Selected:', value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a proposition" />
      </SelectTrigger>
      <SelectContent>
        {propositions.map((prop) => (
          <SelectItem key={prop.id} value={prop.id}>
            {prop.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}