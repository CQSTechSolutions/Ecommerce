import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../utils/api';

const user = (set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
  updateUserProfile: (updatedData) => set(state => ({
    user: { ...state.user, ...updatedData }
  })),
  updateUserAddress: (updatedAddress) => set(state => ({
    user: { 
      ...state.user, 
      address: { ...state.user.address, ...updatedAddress } 
    }
  })),
});

const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      user: null,
      isAuthenticated: false,
      searchTerm: '',
      checkoutData: null,
      filters: {
        category: null,
        priceRange: { min: 0, max: 50000 },
        rating: null,
      },
      
      // Cart actions
      addToCart: (product) => 
        set((state) => {
          const existingItem = state.cart.find(item => item._id === product._id);
          if (existingItem) {
            return {
              cart: state.cart.map(item => 
                item._id === product._id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),
      
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter(item => item._id !== productId)
        })),
      
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map(item => 
            item._id === productId 
              ? { ...item, quantity } 
              : item
          )
        })),
      
      clearCart: () => set({ cart: [] }),
      
      // Checkout actions
      setCheckoutData: (data) => set({ checkoutData: data }),
      clearCheckoutData: () => set({ checkoutData: null }),
      
      // Auth actions
      login: (userData) => set({ user: userData, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // User profile actions
      updateUserProfile: (profileData) => 
        set((state) => ({
          user: {
            ...state.user,
            ...profileData
          }
        })),
      
      // Address actions
      addAddress: async (addressData) => {
        try {
          const response = await api.post('/address', addressData);
          set((state) => ({
            user: {
              ...state.user,
              addresses: state.user.addresses 
                ? [...state.user.addresses, response.data]
                : [response.data]
            }
          }));
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Add address error:', error);
          return { success: false, error: error.response?.data?.message || 'Failed to add address' };
        }
      },
      
      updateAddress: async (addressId, addressData) => {
        try {
          const response = await api.put(`/address/${addressId}`, addressData);
          set((state) => ({
            user: {
              ...state.user,
              addresses: state.user.addresses?.map(addr => 
                addr._id === addressId ? response.data : addr
              )
            }
          }));
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Update address error:', error);
          return { success: false, error: error.response?.data?.message || 'Failed to update address' };
        }
      },
      
      deleteAddress: async (addressId) => {
        try {
          await api.delete(`/address/${addressId}`);
          set((state) => ({
            user: {
              ...state.user,
              addresses: state.user.addresses?.filter(addr => addr._id !== addressId)
            }
          }));
          return { success: true };
        } catch (error) {
          console.error('Delete address error:', error);
          return { success: false, error: error.response?.data?.message || 'Failed to delete address' };
        }
      },
      
      setDefaultAddress: async (addressId) => {
        try {
          const response = await api.put(`/address/${addressId}/default`);
          set((state) => ({
            user: {
              ...state.user,
              addresses: state.user.addresses?.map(addr => ({
                ...addr,
                isDefault: addr._id === addressId
              }))
            }
          }));
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Set default address error:', error);
          return { success: false, error: error.response?.data?.message || 'Failed to set default address' };
        }
      },
      
      // Order actions
      createOrder: async (orderData) => {
        try {
          const response = await api.post('/order', orderData);
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Create order error:', error);
          return { success: false, error: error.response?.data?.message || 'Failed to create order' };
        }
      },
      
      cancelOrder: async (orderId) => {
        try {
          const response = await api.put(`/order/${orderId}/cancel`);
          return { success: true, data: response.data };
        } catch (error) {
          console.error('Cancel order error:', error);
          return { success: false, error: error.response?.data?.message || 'Failed to cancel order' };
        }
      },
      
      // Search actions
      setSearchTerm: (term) => set({ searchTerm: term }),
      clearSearch: () => set({ searchTerm: '' }),
      
      // Filter actions
      setFilter: (filterType, value) => 
        set((state) => ({
          filters: {
            ...state.filters,
            [filterType]: value
          }
        })),
      
      clearFilters: () => 
        set({
          filters: {
            category: null,
            priceRange: { min: 0, max: 50000 },
            rating: null
          }
        }),
      ...user(set),
    }),
    {
      name: 'zustand-store'
    }
  )
);

export default useStore;