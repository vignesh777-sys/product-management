import React, { useState, useEffect } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { Search, SortAsc, SortDesc } from 'lucide-react';

export default function SearchAndSort({ 
  searchTerm, 
  onSearchChange, 
  sortOrder, 
  onSortChange,
  categoryFilter,
  onCategoryFilterChange 
}) {
  const categories = [
    "All Categories", "Furniture", "Electronics", "Clothing", "Books", "Home & Garden", 
    "Sports", "Beauty", "Toys", "Automotive", "Food", "Grocery", "Footwear", "Other"
  ];

  // Local state to avoid cursor jump
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // Keep localSearch in sync if parent searchTerm changes externally
  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (val) => {
    setLocalSearch(val);        // update input immediately
    onSearchChange(val);        // notify parent
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">

        {/* Search */}
        <div className="relative flex-1 w-full">
          
          <Input
            placeholder="Search products by name..."
            value={localSearch}
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-10 h-4"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryFilterChange(e.target.value)}
            className="block w-full h-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onSortChange(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 border-gray-200 hover:bg-gray-50 h-10"
          >
            {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </Button>
        </div>
      </div>
    </div>
  );
}
