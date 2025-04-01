import api from './api';

/**
 * Get all addresses for the current user
 * @returns {Promise<Array>} List of addresses
 */
export const getUserAddresses = async () => {
  try {
    const response = await api.get('/address');
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

/**
 * Get a specific address by ID
 * @param {string} addressId - The ID of the address to retrieve
 * @returns {Promise<Object>} The address object
 */
export const getAddressById = async (addressId) => {
  try {
    const response = await api.get(`/address/${addressId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching address ${addressId}:`, error);
    throw error;
  }
};

/**
 * Create a new address
 * @param {Object} addressData - The address data
 * @returns {Promise<Object>} The created address
 */
export const createAddress = async (addressData) => {
  try {
    const response = await api.post('/address', addressData);
    return response.data;
  } catch (error) {
    console.error('Error creating address:', error);
    throw error;
  }
};

/**
 * Update an existing address
 * @param {string} addressId - The ID of the address to update
 * @param {Object} addressData - The updated address data
 * @returns {Promise<Object>} The updated address
 */
export const updateAddress = async (addressId, addressData) => {
  try {
    const response = await api.put(`/address/${addressId}`, addressData);
    return response.data;
  } catch (error) {
    console.error(`Error updating address ${addressId}:`, error);
    throw error;
  }
};

/**
 * Delete an address
 * @param {string} addressId - The ID of the address to delete
 * @returns {Promise<Object>} The deletion response
 */
export const deleteAddress = async (addressId) => {
  try {
    const response = await api.delete(`/address/${addressId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting address ${addressId}:`, error);
    throw error;
  }
};

/**
 * Set an address as default
 * @param {string} addressId - The ID of the address to set as default
 * @returns {Promise<Object>} The updated address
 */
export const setDefaultAddress = async (addressId) => {
  try {
    const response = await api.put(`/address/${addressId}/default`);
    return response.data;
  } catch (error) {
    console.error(`Error setting address ${addressId} as default:`, error);
    throw error;
  }
}; 