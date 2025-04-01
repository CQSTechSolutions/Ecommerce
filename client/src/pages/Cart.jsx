import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../store/useStore';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [subtotal, setSubtotal] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  useEffect(() => {
    // Check if coming from a successful order
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('order_success');
    if (success === 'true') {
      setOrderSuccess(true);
    }
    
    // Calculate subtotal when cart changes
    const newSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);
  }, [cart, location.search]);
  
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  const shipping = subtotal > 5000 ? 0 : 300; // Free shipping for orders over ₹5000
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {orderSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Your order has been successfully placed!</p>
            <p>Thank you for shopping with us. You can view your order details in your account.</p>
            <div className="mt-2">
              <Link to="/account" className="text-blue-600 hover:underline mr-4">View My Orders</Link>
              <button 
                onClick={() => {
                  const url = new URL(window.location);
                  url.searchParams.delete('order_success');
                  window.history.pushState({}, '', url);
                  setOrderSuccess(false);
                }}
                className="text-gray-600 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              {orderSuccess 
                ? "Your order has been placed successfully! You can continue shopping or view your orders in your account."
                : "Looks like you haven't added any products to your cart yet."}
            </p>
            <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-semibold">
              Continue Shopping
            </Link>
            {orderSuccess && (
              <Link to="/account" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors inline-block font-semibold ml-4">
                View My Orders
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4">Quantity</th>
                      <th className="text-right p-4">Price</th>
                      <th className="text-right p-4">Total</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item._id} className="border-t border-gray-200">
                        <td className="p-4">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="ml-4">
                              <Link 
                                to={`/product/${item._id}`} 
                                className="font-medium text-gray-900 hover:text-blue-600"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-gray-600 mt-1">
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="mx-2 w-10 text-center">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-4 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                        <td className="p-4 text-right font-medium">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="font-medium">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Including GST</p>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full mt-8 bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
