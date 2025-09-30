import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const SearchAndFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Projects
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search by project name or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-describedby="search-description"
            />
          </div>
          <p id="search-description" className="mt-1 text-sm text-gray-500">
            Search through project names and descriptions
          </p>
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            aria-describedby="status-description"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="ON_HOLD">On Hold</option>
          </select>
          <p id="status-description" className="mt-1 text-sm text-gray-500">
            Filter projects by their current status
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
        <span className="bg-gray-100 px-2 py-1 rounded">Press Enter to search</span>
        <span className="bg-gray-100 px-2 py-1 rounded">Clear search to show all</span>
      </div>
    </div>
  );
};

export default SearchAndFilter;