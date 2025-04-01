import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useStore from '../store/useStore';
import api from '../utils/api';
import { getUserAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from '../utils/addressApi';
import { getUserOrders, cancelOrder } from '../utils/orderApi';

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUserProfile } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [editAddressMode, setEditAddressMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [addressData, setAddressData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Fetch user profile data from API
  const fetchUserProfile = async () => {
    if (!isAuthenticated || !user?.token) {
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.get('/user/profile');
      
      if (response.data) {
        const userData = {
          id: response.data._id,
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          isAdmin: response.data.isAdmin,
          // Preserve the token from the current user
          token: user.token,
          // Add any additional fields from the profile
          ...(response.data.address && { address: response.data.address }),
          ...(response.data.phone && { phone: response.data.phone })
        };
        
        // Update the store with the complete profile data
        updateUserProfile(userData);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user addresses from API
  const fetchUserAddresses = async () => {
    if (!isAuthenticated || !user?.token) {
      return;
    }
    
    setLoading(true);
    try {
      const addresses = await getUserAddresses();
      setAddresses(addresses);
      
      // If there's a default address, select it
      const defaultAddress = addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id);
      } else if (addresses.length > 0) {
        setSelectedAddressId(addresses[0]._id);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
      setError('Failed to load addresses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user orders from API
  const fetchUserOrders = async () => {
    if (!isAuthenticated || !user?.token) {
      return;
    }
    
    setOrderLoading(true);
    try {
      const orders = await getUserOrders();
      
      if (Array.isArray(orders)) {
        setOrders(orders);
      } else {
        console.error('Invalid order data format:', orders);
        setOrderError('Received invalid order data format');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrderError('Failed to load orders. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Fetch user profile data and addresses when component mounts
      fetchUserProfile();
      fetchUserAddresses();
      fetchUserOrders();
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Initialize form data with user data
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(profileData);
    setEditMode(false);
  };

  // Reset address form for creating a new address
  const handleAddNewAddress = () => {
    setAddressData({
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: '',
      isDefault: false
    });
    setSelectedAddressId(null);
    setEditAddressMode(true);
  };

  // Load address data for editing
  const handleEditAddress = (addressId) => {
    const addressToEdit = addresses.find(addr => addr._id === addressId);
    if (addressToEdit) {
      setAddressData({
        street: addressToEdit.street || '',
        city: addressToEdit.city || '',
        state: addressToEdit.state || '',
        zipCode: addressToEdit.zipCode || '',
        country: addressToEdit.country || '',
        phone: addressToEdit.phone || '',
        isDefault: addressToEdit.isDefault || false
      });
      setSelectedAddressId(addressId);
      setEditAddressMode(true);
    }
  };

  // Delete address
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await deleteAddress(addressId);
        // Refresh addresses after deletion
        fetchUserAddresses();
      } catch (err) {
        console.error('Error deleting address:', err);
        setError('Failed to delete address. Please try again.');
      }
    }
  };

  // Set address as default
  const handleSetDefaultAddress = async (addressId) => {
    try {
      await setDefaultAddress(addressId);
      // Refresh addresses after setting default
      fetchUserAddresses();
    } catch (err) {
      console.error('Error setting default address:', err);
      setError('Failed to set default address. Please try again.');
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (selectedAddressId) {
        // Update existing address
        await updateAddress(selectedAddressId, addressData);
      } else {
        // Create new address
        await createAddress(addressData);
      }
      
      setEditAddressMode(false);
      // Refresh addresses
      fetchUserAddresses();
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address. Please try again.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        // Refresh orders after cancellation
        fetchUserOrders();
      } catch (err) {
        console.error('Error cancelling order:', err);
        setOrderError('Failed to cancel order. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-6">My Account</h2>
              
              <nav className="flex flex-col space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-2 rounded-md text-left ${activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Profile Information
                </button>
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`px-4 py-2 rounded-md text-left ${activeTab === 'address' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Address Book
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 rounded-md text-left ${activeTab === 'orders' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                >
                  Order History
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-left text-red-600 hover:bg-red-50 mt-6"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white shadow rounded-lg p-6">
              {/* Profile Information */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Profile Information</h2>
                    {!editMode && (
                      <button 
                        onClick={() => setEditMode(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  
                  {editMode ? (
                    <form onSubmit={handleProfileSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={profileData.firstName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditMode(false)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-gray-500 text-sm">First Name</h3>
                          <p className="text-gray-800">{user.firstName}</p>
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">Last Name</h3>
                          <p className="text-gray-800">{user.lastName}</p>
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">Email Address</h3>
                          <p className="text-gray-800">{user.email}</p>
                        </div>
                        <div>
                          <h3 className="text-gray-500 text-sm">Phone Number</h3>
                          <p className="text-gray-800">{user.phone || "Not provided"}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Address Book */}
              {activeTab === 'address' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Address Book</h2>
                    {!editAddressMode && (
                      <button 
                        onClick={handleAddNewAddress}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Add New Address
                      </button>
                    )}
                  </div>
                  
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  
                  {editAddressMode ? (
                    <form onSubmit={handleAddressSubmit}>
                      <div className="grid grid-cols-1 gap-4 mb-4">
                        <div>
                          <label htmlFor="street" className="block text-gray-700 mb-1">Street Address</label>
                          <input
                            type="text"
                            id="street"
                            name="street"
                            value={addressData.street}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="city" className="block text-gray-700 mb-1">City</label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              value={addressData.city}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="state" className="block text-gray-700 mb-1">State/Province</label>
                            <input
                              type="text"
                              id="state"
                              name="state"
                              value={addressData.state}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="zipCode" className="block text-gray-700 mb-1">Postal/Zip Code</label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={addressData.zipCode}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-gray-700 mb-1">Country</label>
                            <input
                              type="text"
                              id="country"
                              name="country"
                              value={addressData.country}
                              onChange={handleAddressChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number (Optional)</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={addressData.phone}
                            onChange={handleAddressChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              name="isDefault"
                              checked={addressData.isDefault}
                              onChange={e => setAddressData(prev => ({ ...prev, isDefault: e.target.checked }))}
                              className="mr-2"
                            />
                            <span>Set as default address</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          {selectedAddressId ? 'Update Address' : 'Save Address'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditAddressMode(false)}
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div>
                      {loading ? (
                        <div className="text-center py-4">
                          <p>Loading addresses...</p>
                        </div>
                      ) : addresses.length > 0 ? (
                        <div className="space-y-4">
                          {addresses.map(address => (
                            <div key={address._id} className={`p-4 rounded-lg border ${address.isDefault ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
                              <div className="flex justify-between items-start">
                                <div>
                                  {address.isDefault && (
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">Default</span>
                                  )}
                                  <address className="not-italic">
                                    <p>{user.firstName} {user.lastName}</p>
                                    <p>{address.street}</p>
                                    <p>{address.city}, {address.state} {address.zipCode}</p>
                                    <p>{address.country}</p>
                                    {address.phone && <p>Phone: {address.phone}</p>}
                                  </address>
                                </div>
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => handleEditAddress(address._id)}
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteAddress(address._id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    Delete
                                  </button>
                                  {!address.isDefault && (
                                    <button 
                                      onClick={() => handleSetDefaultAddress(address._id)}
                                      className="text-green-600 hover:text-green-800"
                                    >
                                      Set as Default
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600">No addresses saved yet.</p>
                          <button 
                            onClick={handleAddNewAddress}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          >
                            Add Address
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Order History */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  
                  {orderError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {orderError}
                    </div>
                  )}
                  
                  {orderLoading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Loading orders...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {orders.map(order => (
                            <tr key={order._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">#{order._id.substring(order._id.length - 8)}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-sm text-gray-900">₹{order.total.toLocaleString()}</span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Processing'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : order.status === 'Shipped'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <button 
                                  className="text-blue-600 hover:text-blue-900 mr-3"
                                  onClick={() => navigate(`/order/${order._id}`)}
                                >
                                  Details
                                </button>
                                
                                {(order.status === 'Processing' || order.status === 'Shipped') && (
                                  <button 
                                    className="text-red-600 hover:text-red-900"
                                    onClick={() => handleCancelOrder(order._id)}
                                  >
                                    Cancel
                                  </button>
                                )}
                                
                                {order.trackingNumber && (
                                  <a 
                                    href={`https://www.tracking-url.com/${order.trackingNumber}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-900 ml-3"
                                  >
                                    Track
                                  </a>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No orders found.</p>
                      <button 
                        onClick={() => navigate('/products')}
                        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Account; 