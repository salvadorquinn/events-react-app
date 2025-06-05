import { useState, useEffect, useRef } from 'react';
import { Search, Calendar, Clock, Check, X } from 'lucide-react';

export interface SearchFilters {
  status: "all" | "active" | "disabled";
  date: "all" | "today" | "week" | "month" | "year";
  upcoming: boolean;
}

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterChange: (filters: SearchFilters) => void;
}

interface FilterOption<T> {
  value: T;
  label: string;
}

const STATUS_OPTIONS: FilterOption<SearchFilters['status']>[] = [
  { value: 'all', label: 'All Events' },
  { value: 'active', label: 'Active Events' },
  { value: 'disabled', label: 'Disabled Events' }
];

const DATE_OPTIONS: FilterOption<SearchFilters['date']>[] = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Next 7 Days' },
  { value: 'month', label: 'Next 30 Days' },
  { value: 'year', label: 'Next Year' }
];

const DEFAULT_FILTERS: SearchFilters = {
  status: "all",
  date: "all",
  upcoming: false
};

export default function SearchBar({ value, onChange, onFilterChange }: SearchBarProps) {
  const [activeFilters, setActiveFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (key: keyof SearchFilters, value: SearchFilters[keyof SearchFilters]) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (activeFilters.status !== 'all') count++;
    if (activeFilters.date !== 'all') count++;
    if (activeFilters.upcoming) count++;
    return count;
  };

  const clearFilters = () => {
    setActiveFilters(DEFAULT_FILTERS);
    onFilterChange(DEFAULT_FILTERS);
    setIsStatusOpen(false);
    setIsDateOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events by title, location, or region..."
          className="w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl text-white placeholder-white/50 
                   focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/15 transition-all"
        />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Status Filter */}
        <div className="relative" ref={statusRef}>
          <button
            onClick={() => {
              setIsStatusOpen(!isStatusOpen);
              setIsDateOpen(false);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
              ${isStatusOpen || activeFilters.status !== 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white hover:bg-white/15'}`}
          >
            <span className="text-sm">Status</span>
            {activeFilters.status !== 'all' && (
              <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
                {activeFilters.status === 'active' ? 'Active' : 'Disabled'}
              </span>
            )}
          </button>

          {isStatusOpen && (
            <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-xl shadow-xl z-50 animate-slideIn origin-top">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleFilterChange('status', option.value);
                    setIsStatusOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                >
                  {option.label}
                  {activeFilters.status === option.value && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Filter */}
        <div className="relative" ref={dateRef}>
          <button
            onClick={() => {
              setIsDateOpen(!isDateOpen);
              setIsStatusOpen(false);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
              ${isDateOpen || activeFilters.date !== 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white hover:bg-white/15'}`}
          >
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              {DATE_OPTIONS.find(opt => opt.value === activeFilters.date)?.label || 'Date'}
            </span>
          </button>

          {isDateOpen && (
            <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-xl shadow-xl z-50 animate-slideIn origin-top">
              {DATE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleFilterChange('date', option.value);
                    setIsDateOpen(false);
                  }}
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                >
                  {option.label}
                  {activeFilters.date === option.value && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Toggle */}
        <button
          onClick={() => handleFilterChange('upcoming', !activeFilters.upcoming)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all
            ${activeFilters.upcoming
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-white hover:bg-white/15'}`}
        >
          <Clock className="w-4 h-4" />
          <span className="text-sm">Upcoming</span>
        </button>

        {/* Clear Filters */}
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-white/70 hover:text-white flex items-center gap-2 transition-colors ml-auto"
          >
            <X className="w-4 h-4" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="text-sm text-white/50">
          {getActiveFilterCount()} {getActiveFilterCount() === 1 ? 'filter' : 'filters'} applied
        </div>
      )}
    </div>
  );
}