import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/api';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  
  // Get order details from location state
  const { orderId, orderNumber, orderDate, total } = location.state || {};
  
  // If no order details, redirect to home
  useEffect(() => {
    if (!orderId && !orderNumber) {
      // Don't instantly redirect, but set error state
      setLoading(false);
      setError('Order information not found. Please check your orders in your account.');
      return;
    }
    
    // Fetch complete order data if we have an orderId
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          setLoading(true);
          const response = await api.get(`/order/${orderId}`);
          setOrder(response.data);
          setError('');
        } catch (err) {
          console.error('Error fetching order details:', err);
          setError('Failed to load order details');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [orderId, orderNumber, navigate]);
  
  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  // If loading, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center flex-col">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-semibold mt-4"
          >
            Return to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Use order data if available, otherwise fall back to location state
  const displayOrderNumber = order ? order._id.substring(order._id.length - 8) : orderNumber;
  const displayOrderDate = order ? order.createdAt : orderDate;
  const displayTotal = order ? order.total : total;
  const displayPaymentMethod = order ? order.paymentMethod : 'Credit Card';
  const displayShippingMethod = (displayTotal > 5000) ? 'Standard Shipping (Free)' : 'Standard Shipping (₹300)';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
            <p className="text-xl text-gray-600">Your order has been successfully placed.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-semibold">Order Details</h2>
              <span className="text-blue-600 text-sm">Confirmation will be emailed to you</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{displayOrderNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{formatDate(displayOrderDate)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order Total:</span>
                <span className="font-medium">₹{parseFloat(displayTotal).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium">{displayPaymentMethod}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Method:</span>
                <span className="font-medium">{displayShippingMethod}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
            
            <div className="space-y-4">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Order Confirmation</h3>
                  <p className="text-gray-600">
                    You will receive an email confirmation shortly at your registered email address.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <span className="text-blue-600 font-semibold">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Order Processing</h3>
                  <p className="text-gray-600">
                    Your order will be processed and prepared for shipment within 1-2 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <span className="text-blue-600 font-semibold">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Order Shipment</h3>
                  <p className="text-gray-600">
                    You will receive a shipping confirmation email with tracking information once your order ships.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <span className="text-blue-600 font-semibold">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Delivery</h3>
                  <p className="text-gray-600">
                    Your items will be delivered according to the shipping method selected at checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Need Help?</h3>
              <p className="text-gray-600">
                If you have any questions or concerns about your order, please contact our customer service.
              </p>
              <Link to="/contact" className="text-blue-600 hover:text-blue-800 transition-colors">
                Contact Customer Service
              </Link>
            </div>
            
            <div className="pt-4">
              <Link to="/account" className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-semibold mr-4">
                View My Orders
              </Link>
              <Link 
                to="/?order_success=true" 
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-300 transition-colors inline-block font-semibold mr-4"
              >
                Continue Shopping
              </Link>
              <Link 
                to="/cart?order_success=true" 
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Return to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation; 