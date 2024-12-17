'use client';

import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Proposition } from '@/types/propdata';
import { useRouter } from 'next/navigation'; 

interface Props {
  setSelectedProp: (value: Proposition) => void; // Accept a Proposition and return nothing
}

export function PropositionFilters(props: Props) {

  const [propositions, setPropositions] = useState<Proposition[]>([]);
  const [selectedProposition, setSelectedProposition] = useState<Proposition>({
    id: 0,
    name: '',
    year: 0,
    votes: [],
    description: '',
    passed: false, // Added 'passed'
  });

  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Fetch voting years for the drop-down on mounting of the component
    const fetchYears = async () => {
      try {
        const response = await fetch(`/api/propositions/years`);
        if (!response.ok) {
          throw new Error('Failed to fetch Years');
        }
        const years = await response.json();
        setAvailableYears(years);
      } catch {
        console.log("Failed to fetch years");
        setAvailableYears([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchPropositionByID = async (prop_id: string) => {
      try {
        const response = await fetch(`/api/propositions/${prop_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch proposition');
        }
        const prop = await response.json();
        console.log("Fetched the propositionByID", prop);
        setSelectedYear(String(prop.year));
        // Ensure 'passed' is included; assign default if necessary
        const completeProp: Proposition = {
          ...prop,
          passed: prop.passed ?? false,
        };
        setSelectedProposition(completeProp);
        props.setSelectedProp(completeProp);
      } catch {
        console.log("Failed to fetch proposition by ID");
        // Optionally, handle the error state
      } finally {
        setLoading(false);
      }
    };

    // Populate years on component mount
    fetchYears();

    // If the URL contains a value for proposition_id, populate the values from the given prop ID
    const searchParams = new URLSearchParams(window.location.search);
    const urlPropId = searchParams.get('proposition_id');
    if (urlPropId) {
      fetchPropositionByID(urlPropId);
    }
  }, []);

  // Fetch propositions from the selected year when a year is chosen.
  useEffect(() => {
    const fetchPropositions = async () => {
      try {
        const response = await fetch(`/api/propositions/years/${selectedYear}`);
        console.log("The response is", response);
        if (!response.ok) {
          throw new Error('Failed to fetch propositions');
        }
        const props = await response.json();
        console.log("Setting propositions to ", props);
        setPropositions(props);
      } catch {
        console.log("Failed to fetch propositions for the selected year");
        setPropositions([]);
      }
    };

    if (!selectedYear) return;

    fetchPropositions();
  }, [selectedYear]);

  // Handle passing the selected prop to the parent container
  const handlePropositionChange = (value: string) => {
    const selected = propositions.find((prop) => prop.name === value);

    if (selected) {
      setSelectedProposition(selected);
      props.setSelectedProp(selected);
    } else {
      // Assign default proposition with 'passed'
      const defaultProp: Proposition = {
        id: 0,
        name: '',
        year: 0,
        votes: [],
        description: '',
        passed: false,
      };
      setSelectedProposition(defaultProp);
      props.setSelectedProp(defaultProp);
      throw new Error('Failed to map prop name to proposition object');
    }
  };

  if (loading) return <div className="text-gray-500">Loading propositions...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">

      {/* Year Drop Down Menu Selector */}
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
              No years available
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Proposition Drop Down Menu Selector */}
      <Select
        onValueChange={handlePropositionChange}
        value={selectedProposition.name}
        disabled={!selectedYear}
      >
        <SelectTrigger className="w-full text-gray-900">
          <SelectValue placeholder="Select a proposition" className="text-gray-900" />
        </SelectTrigger>
        <SelectContent className="text-gray-900">
          {propositions.length > 0 ? (
            propositions.map((prop) => (
              <SelectItem key={prop.id} value={prop.name}>
                {prop.name}
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
  );
}

