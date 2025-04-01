import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../store/useStore';
import { getUserAddresses, createAddress, setDefaultAddress } from '../utils/addressApi';

const Checkout = () => {
  const { cart, user, setCheckoutData } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [useNewAddress, setUseNewAddress] = useState(true);
  
  const [shippingAddress, setShippingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
  });
  
  const [billingAddress, setBillingAddress] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    phone: '',
  });
  
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [saveAddress, setSaveAddress] = useState(true);
  
  // Fetch saved addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const addresses = await getUserAddresses();
        setSavedAddresses(addresses);
        
        // If user has a default address, select it
        const defaultAddress = addresses.find(addr => addr.isDefault);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress._id);
          setUseNewAddress(false);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setLoading(false);
      }
    };
    
    if (user) {
      fetchAddresses();
    }
  }, [user]);
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  let shippingCost = 0;

  if (shippingMethod === 'standard') {
    shippingCost = subtotal > 5000 ? 0 : 300; // Free shipping on orders over ₹5000
  } else if (shippingMethod === 'express') {
    shippingCost = 500;
  }

  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCost + tax;
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (sameAsShipping) {
      setBillingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSameAsShippingChange = (e) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };

  const handleAddressSelect = (e) => {
    const addressId = e.target.value;
    if (addressId === 'new') {
      setUseNewAddress(true);
      setSelectedAddressId('');
    } else {
      setUseNewAddress(false);
      setSelectedAddressId(addressId);
      
      // Populate shipping form with selected address
      const selectedAddress = savedAddresses.find(addr => addr._id === addressId);
      if (selectedAddress) {
        setShippingAddress({
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipCode: selectedAddress.zipCode,
          country: selectedAddress.country,
          phone: selectedAddress.phone || '',
        });
        
        if (sameAsShipping) {
          setBillingAddress({
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
            street: selectedAddress.street,
            city: selectedAddress.city,
            state: selectedAddress.state,
            zipCode: selectedAddress.zipCode,
            country: selectedAddress.country,
            phone: selectedAddress.phone || '',
          });
        }
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Save new address if requested
      let addressToUse;
      
      if (useNewAddress && saveAddress) {
        // Create a new address in the database
        const newAddressData = {
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
          isDefault: false // Don't automatically set as default
        };
        
        const savedAddress = await createAddress(newAddressData);
        addressToUse = savedAddress;
        
        // Update the saved addresses list
        setSavedAddresses(prev => [...prev, savedAddress]);
      } else if (!useNewAddress) {
        // Use the selected existing address
        addressToUse = savedAddresses.find(addr => addr._id === selectedAddressId);
      } else {
        // Using a new address but not saving it
        addressToUse = {
          street: shippingAddress.street,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone
        };
      }
      
      // Save checkout data to the store for use in the payment page
      setCheckoutData({
        orderItems: cart.map(item => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        shippingAddress: addressToUse,
        billingAddress: sameAsShipping ? addressToUse : {
          street: billingAddress.street,
          city: billingAddress.city,
          state: billingAddress.state,
          zipCode: billingAddress.zipCode,
          country: billingAddress.country,
          phone: billingAddress.phone
        },
        shippingMethod,
        shippingCost,
        subtotal,
        tax,
        total
      });
      
      // Navigate to payment page
      navigate('/payment');
      
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was a problem processing your checkout. Please try again.');
    }
  };
  
  // If cart is empty, redirect to cart page
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-grow text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">You need to add items to your cart before proceeding to checkout.</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  {/* Saved Addresses Section */}
                  {!loading && savedAddresses.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Saved Addresses</h3>
                      <div className="mb-4">
                        <select 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={useNewAddress ? 'new' : selectedAddressId}
                          onChange={handleAddressSelect}
                        >
                          <option value="new">Use a new address</option>
                          {savedAddresses.map(address => (
                            <option key={address._id} value={address._id}>
                              {address.street}, {address.city}, {address.state} {address.zipCode}
                              {address.isDefault ? ' (Default)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {/* New Address Form - only show if using new address or no saved addresses */}
                  {useNewAddress && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name*</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={shippingAddress.firstName}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name*</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={shippingAddress.lastName}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="street" className="block text-gray-700 mb-2">Street Address*</label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={shippingAddress.street}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="city" className="block text-gray-700 mb-2">City*</label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-gray-700 mb-2">State/Province*</label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={shippingAddress.state}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="zipCode" className="block text-gray-700 mb-2">ZIP / Postal Code*</label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-gray-700 mb-2">Country*</label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            value={shippingAddress.country}
                            onChange={handleShippingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleShippingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div className="mt-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={saveAddress}
                            onChange={() => setSaveAddress(!saveAddress)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 block text-gray-700">Save this address for future orders</span>
                        </label>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Shipping Method */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <span className="block font-medium">Standard Shipping</span>
                        <span className="block text-gray-500 text-sm">
                          {subtotal > 5000 ? 'Free' : '₹300'} - Delivery in 5-7 business days
                        </span>
                      </div>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3">
                        <span className="block font-medium">Express Shipping</span>
                        <span className="block text-gray-500 text-sm">₹500 - Delivery in 1-3 business days</span>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Billing Information */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Billing Information</h2>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sameAsShipping}
                        onChange={handleSameAsShippingChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 block text-gray-700">Same as shipping address</span>
                    </label>
                  </div>
                  
                  {!sameAsShipping && (
                    <div className="billing-form">
                      {/* Billing form fields (similar to shipping) */}
                      {/* Only shown when "Same as shipping address" is unchecked */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="billingFirstName" className="block text-gray-700 mb-2">First Name*</label>
                          <input
                            type="text"
                            id="billingFirstName"
                            name="firstName"
                            value={billingAddress.firstName}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="billingLastName" className="block text-gray-700 mb-2">Last Name*</label>
                          <input
                            type="text"
                            id="billingLastName"
                            name="lastName"
                            value={billingAddress.lastName}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="billingStreet" className="block text-gray-700 mb-2">Street Address*</label>
                        <input
                          type="text"
                          id="billingStreet"
                          name="street"
                          value={billingAddress.street}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="billingCity" className="block text-gray-700 mb-2">City*</label>
                          <input
                            type="text"
                            id="billingCity"
                            name="city"
                            value={billingAddress.city}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="billingState" className="block text-gray-700 mb-2">State/Province*</label>
                          <input
                            type="text"
                            id="billingState"
                            name="state"
                            value={billingAddress.state}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="billingZipCode" className="block text-gray-700 mb-2">ZIP / Postal Code*</label>
                          <input
                            type="text"
                            id="billingZipCode"
                            name="zipCode"
                            value={billingAddress.zipCode}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="billingCountry" className="block text-gray-700 mb-2">Country*</label>
                          <input
                            type="text"
                            id="billingCountry"
                            name="country"
                            value={billingAddress.country}
                            onChange={handleBillingChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="billingPhone" className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          id="billingPhone"
                          name="phone"
                          value={billingAddress.phone}
                          onChange={handleBillingChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="lg:hidden mb-8">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (18%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>₹{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pb-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="divide-y">
                  {cart.map((item) => (
                    <div key={item._id} className="py-3 flex">
                      <div className="h-16 w-16 rounded overflow-hidden mr-4">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                        <p className="text-gray-900 mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout; 