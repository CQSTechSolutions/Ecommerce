import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../utils/productApi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if coming from a successful order
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('order_success');
    if (success === 'true') {
      setOrderSuccess(true);
      // Clear the URL parameter
      const url = new URL(window.location);
      url.searchParams.delete('order_success');
      window.history.pushState({}, '', url);
    }
  }, [location.search]);
  
  useEffect(() => {
    // Auto-dismiss the success message after 5 seconds
    if (orderSuccess) {
      const timer = setTimeout(() => {
        setOrderSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess]);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        // Get top 4 rated products as featured products
        const featured = products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-paper-light flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <p className="mt-4 text-pixel">Loading featured products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-paper-light flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg max-w-md mx-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Error!</span>
            </div>
            <p className="mt-2">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-paper-light flex flex-col">
      <Navbar />
      
      {orderSuccess && (
        <div className="bg-green-100 border-b border-green-300 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800">Your order has been placed successfully! Thank you for your purchase.</p>
              </div>
              <button 
                onClick={() => setOrderSuccess(false)}
                className="text-green-800 hover:text-green-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#2540b8] via-[#2540b880] to-transparent"></div> */}
          <div className="absolute inset-0 opacity-40">
            <div className="h-full w-full" style={{ 
              backgroundColor: 'black',
              backgroundSize: "80px 140px",
              backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px"
            }}></div>
          </div>
        </div>
        <div className="text-center justify-center relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl font-bold md:text-5xl font-display text-white mb-6 leading-tight">
              Discover Your Perfect Bag
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 leading-relaxed">
              Explore our collection of premium bags designed for every occasion.
              From stylish backpacks to elegant handbags, find the perfect companion
              for your journey.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-white text-[#2540b8] px-6 md:px-8 py-3 rounded-md hover:bg-gray-100 transition-colors duration-200 font-medium"
            >
              <span>Shop Now</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-display text-pixel-dark mb-4">Featured Products</h2>
            <p className="text-pixel max-w-2xl mx-auto text-sm md:text-base">
              Discover our most popular and highly-rated bags, carefully selected for their quality and style.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map(product => (
              <div key={product._id} className="transform hover:scale-105 transition-transform duration-200">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 md:py-16 bg-paper">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-display text-pixel-dark mb-4">Shop by Category</h2>
            <p className="text-pixel max-w-2xl mx-auto text-sm md:text-base">
              Browse our collection by category and find the perfect bag for your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <Link
              to="/category/backpacks"
              className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-paper hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/91kh7Y9VYNL._AC_SL1500_.jpg"
                alt="Backpacks"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-full bg-gradient-to-t from-[#2540b8] to-transparent pt-16 pb-4 px-4">
                  <h3 className="text-xl md:text-2xl font-display text-white text-center">Backpacks</h3>
                </div>
              </div>
            </Link>
            
            <Link
              to="/category/handbags"
              className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-paper hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
                alt="Handbags"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-full bg-gradient-to-t from-[#2540b8] to-transparent pt-16 pb-4 px-4">
                  <h3 className="text-xl md:text-2xl font-display text-white text-center">Handbags</h3>
                </div>
              </div>
            </Link>
            
            <Link
              to="/category/travel"
              className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-paper hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src="https://i5.walmartimages.com/asr/5a3afb11-e450-434e-a11e-5b275d2fcd9c_1.3960fd302ec4fb03b9208279739d0715.jpeg"
                alt="Travel Bags"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="w-full bg-gradient-to-t from-[#2540b8] to-transparent pt-16 pb-4 px-4">
                  <h3 className="text-xl md:text-2xl font-display text-white text-center">Travel Bags</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{ 
            backgroundImage: "linear-gradient(30deg, #2540b8 12%, transparent 12.5%, transparent 87%, #2540b8 87.5%, #2540b8), linear-gradient(150deg, #2540b8 12%, transparent 12.5%, transparent 87%, #2540b8 87.5%, #2540b8), linear-gradient(30deg, #2540b8 12%, transparent 12.5%, transparent 87%, #2540b8 87.5%, #2540b8), linear-gradient(150deg, #2540b8 12%, transparent 12.5%, transparent 87%, #2540b8 87.5%, #2540b8), linear-gradient(60deg, #2540b877 25%, transparent 25.5%, transparent 75%, #2540b877 75%, #2540b877), linear-gradient(60deg, #2540b877 25%, transparent 25.5%, transparent 75%, #2540b877 75%, #2540b877)",
            backgroundSize: "80px 140px",
            backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px"
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center bg-white rounded-lg shadow-paper p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-display text-pixel-dark mb-4">Stay Updated</h2>
            <p className="text-pixel mb-6 md:mb-8 text-sm md:text-base">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-pixel-light rounded-md focus:outline-none focus:ring-2 focus:ring-[#2540b8] transition-colors text-sm md:text-base"
              />
              <button
                type="submit"
                className="bg-[#2540b8] text-white px-6 py-2 rounded-md hover:bg-[#1e3299] transition-colors flex items-center justify-center text-sm md:text-base"
              >
                <span>Subscribe</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;