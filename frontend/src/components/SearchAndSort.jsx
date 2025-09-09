import React from 'react';
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
    "All Categories", "Electronics", "Clothing", "Books", 
    "Home & Garden", "Sports", "Beauty", "Toys", "Automotive", "Other"
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-4  border-gray-200 focus:border-blue-500 focus:ring-blue-500"
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
            className="flex items-center gap-2 border-gray-200 hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? (
              <SortAsc className="w-4 h-4" />
            ) : (
              <SortDesc className="w-4 h-4" />
            )}
            Price {sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
          </Button>
        </div>
      </div>
    </div>
  );
}
