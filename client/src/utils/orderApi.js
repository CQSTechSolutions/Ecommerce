import api from './api';

/**
 * Get all orders for the current user
 * @returns {Promise<Array>} List of user orders
 */
export const getUserOrders = async () => {
  try {
    const response = await api.get('/order');
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

/**
 * Get a specific order by ID
 * @param {string} orderId - The ID of the order to retrieve
 * @returns {Promise<Object>} The order object
 */
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Create a new order
 * @param {Object} orderData - The order data including items, shipping address, payment method, etc.
 * @returns {Promise<Object>} Object containing success status and order data or error
 */
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/order', orderData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating order:', error);
    return { 
      success: false, 
      error: error.response?.data?.message || 'Failed to create order' 
    };
  }
};

/**
 * Update order payment details
 * @param {string} orderId - The ID of the order to update
 * @param {Object} paymentResult - The payment result data
 * @returns {Promise<Object>} The updated order
 */
export const updateOrderPayment = async (orderId, paymentResult) => {
  try {
    const response = await api.put(`/order/${orderId}/pay`, { paymentResult });
    return response.data;
  } catch (error) {
    console.error(`Error updating payment for order ${orderId}:`, error);
    throw error;
  }
};

/**
 * Cancel an order
 * @param {string} orderId - The ID of the order to cancel
 * @returns {Promise<Object>} The updated order
 */
export const cancelOrder = async (orderId) => {
  try {
    const response = await api.put(`/order/${orderId}/cancel`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling order ${orderId}:`, error);
    throw error;
  }
};

/**
 * For admin: Get all orders
 * @returns {Promise<Array>} List of all orders
 */
export const getAllOrders = async () => {
  try {
    const response = await api.get('/order/admin');
    return response.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

/**
 * For admin: Update order status
 * @param {string} orderId - The ID of the order to update
 * @param {Object} updateData - The data to update (status, tracking number, etc.)
 * @returns {Promise<Object>} The updated order
 */
export const updateOrderStatus = async (orderId, updateData) => {
  try {
    const response = await api.put(`/order/${orderId}/status`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating status for order ${orderId}:`, error);
    throw error;
  }
}; 