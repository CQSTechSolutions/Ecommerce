import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const FilterSidebar = () => {
  const { filters, setFilter, clearFilters } = useStore();
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [selectedRating, setSelectedRating] = useState(filters.rating);
  const [selectedCategories, setSelectedCategories] = useState(
    filters.categories || []
  );

  useEffect(() => {
    setPriceRange(filters.priceRange);
    setSelectedRating(filters.rating);
    setSelectedCategories(filters.categories || []);
  }, [filters]);

  const handlePriceChange = (type, value) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    setFilter('priceRange', newPriceRange);
  };

  const handleRatingChange = (rating) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    setFilter('rating', newRating);
  };

  const handleCategoryChange = (category) => {
    let newCategories;
    if (selectedCategories.includes(category)) {
      // Remove category if already selected
      newCategories = selectedCategories.filter(cat => cat !== category);
    } else {
      // Add category if not selected
      newCategories = [...selectedCategories, category];
    }
    setSelectedCategories(newCategories);
    setFilter('categories', newCategories);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  const categories = [
    { id: 'backpacks', name: 'Backpacks' },
    { id: 'handbags', name: 'Handbags' },
    { id: 'travel', name: 'Travel Bags' }
  ];

  const ratings = [4, 3, 2, 1];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="min-price" className="text-sm text-gray-600 block mb-1">Min (₹)</label>
            <input
              type="number"
              id="min-price"
              min="0"
              max={priceRange.max}
              value={priceRange.min}
              onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="text-sm text-gray-600 block mb-1">Max (₹)</label>
            <input
              type="number"
              id="max-price"
              min={priceRange.min}
              value={priceRange.max}
              onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={selectedRating === rating}
                onChange={() => handleRatingChange(rating)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 flex items-center">
                {[...Array(rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-700">& Up</span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;