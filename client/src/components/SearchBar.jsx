import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useStore from '../store/useStore';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useStore();
  const [input, setInput] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    setInput(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input);
    navigate('/search');
  };

  const handleClear = () => {
    setInput('');
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-sm text-black">
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Search products..."
          value={input}
          onChange={handleChange}
          className="w-full px-4 py-2 focus:outline-none text-black"
        />
        {input && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 px-2 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-700 rounded-md text-white p-2 hover:bg-blue-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 