// src/app/page.tsx (or any other React component)

'use client'; // Required for client-side functionality like useState

import React, { useState } from 'react';
import SelectField from './Select';
import { useRouter } from "next/navigation";

// 1. Define the option data

const cityOptions = [
  { id: 'Islamabad', name: 'Islamabad' },
  { id: 'Lahore', name: 'Lahore' },
  { id: 'Karachi', name: 'Karachi' },
];
export default function UserSelectionForm({categories}: {categories: any}) {
 const [category, setCategory] = useState("All Categories");
 const [city, setCity] = useState("All Cities");
 const router = useRouter();
  const handleCategoryChange = (value: string | number) => {
    // In a real application, you might validate or convert the type here
    const params = new URLSearchParams(window.location.search);
    params.set("category", value.toString());
    setCategory(value.toString())
    router.push(`${window.location.pathname}?${params}`);
  };
  const handleCityChange = (value: string | number) => {
    // In a real application, you might validate or convert the type here
    const params = new URLSearchParams(window.location.search);
    params.set("city", value.toString());
     router.push(`${window.location.pathname}?${params}`);
    setCity(value.toString())
  };

 
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <div className='text-bold flex items-center justify-center'>User Search Parameters</div>
      
      <SelectField
        name="category"
        label="Select category"
        options={categories}
        value={category}
        onChange={handleCategoryChange}
        required={true}
        placeholder="Choose a category for search"
      />
      
    <SelectField
        name="city"
        label="Select city"
        options={cityOptions}
        value={city}
        onChange={handleCityChange}
        required={true}
        placeholder="Choose a city for search"
      /> 
      
    </div>
  );
}