import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/jobs', { state: { searchQuery: searchQuery.trim() } });
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <img
              src="/vite.svg"
              alt="Logo" 
              className="h-10 w-auto"
            />
            <span className="ml-3 text-2xl font-semibold text-gray-800">Hirebuddy</span>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-1/2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                placeholder="Search jobs..."
              />
              <button type="submit" className="sr-only">Search</button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;