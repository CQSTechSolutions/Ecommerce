import { useState } from 'react';
import { Link } from 'react-router';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import useStore from '../store/useStore';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const { cart, isAuthenticated, user } = useStore();
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
  };
  
  return (
    <nav className="bg-blue-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl">BagsTopia</Link>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden focus:outline-none"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
          
          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/products" className="hover:text-blue-200">Products</Link>
            <div className="relative">
              <button 
                className="flex items-center hover:text-blue-200"
                onClick={toggleCategoriesDropdown}
                onMouseEnter={() => setShowCategoriesDropdown(true)}
              >
                Categories
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>
              
              {/* Categories Dropdown */}
              {showCategoriesDropdown && (
                <div 
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  onMouseLeave={() => setShowCategoriesDropdown(false)}
                >
                  <Link 
                    to="/category/backpacks" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Backpacks
                  </Link>
                  <Link 
                    to="/category/handbags" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Handbags
                  </Link>
                  <Link 
                    to="/category/travel" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Travel Bags
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" className="hover:text-blue-200">About</Link>
            <Link to="/contact" className="hover:text-blue-200">Contact</Link>
            {/* <SearchBar /> */}
          </div>
          
          {/* Cart and Account - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-blue-200">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/account" : "/login"} className="hover:text-blue-200">
              <FaUser className="text-xl" />
            </Link>
          </div>
          
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-blue-800 shadow-md z-10 p-4">
              <div className="flex flex-col space-y-4">
                <Link to="/" className="hover:text-blue-200">Home</Link>
                <Link to="/products" className="hover:text-blue-200">All Products</Link>
                <div className="relative">
                  <button 
                    onClick={toggleCategoriesDropdown}
                    className="flex items-center hover:text-blue-200"
                  >
                    Categories
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d={showCategoriesDropdown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                      />
                    </svg>
                  </button>
                  
                  {/* Mobile Categories Dropdown */}
                  {showCategoriesDropdown && (
                    <div className="pl-4 mt-2 space-y-2">
                      <Link 
                        to="/category/backpacks" 
                        className="block hover:text-blue-200"
                      >
                        Backpacks
                      </Link>
                      <Link 
                        to="/category/handbags" 
                        className="block hover:text-blue-200"
                      >
                        Handbags
                      </Link>
                      <Link 
                        to="/category/travel" 
                        className="block hover:text-blue-200"
                      >
                        Travel Bags
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/about" className="hover:text-blue-200">About</Link>
                <Link to="/contact" className="hover:text-blue-200">Contact</Link>
                <div className="pt-4 border-t border-blue-700 flex justify-between">
                  <Link to="/cart" className="relative hover:text-blue-200 flex items-center">
                    <FaShoppingCart className="text-xl mr-2" />
                    <span>Cart ({totalItems})</span>
                  </Link>
                  <Link to={isAuthenticated ? "/account" : "/login"} className="hover:text-blue-200 flex items-center">
                    <FaUser className="text-xl mr-2" />
                    <span>{isAuthenticated ? 'Account' : 'Login'}</span>
                  </Link>
                </div>
                <div className="pt-4">
                  <SearchBar />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;