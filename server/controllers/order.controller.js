import Order from '../models/order.model.js';

// Get all orders for the current user
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id,
            user: req.user.userId
        });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.json(order);
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ message: 'Error fetching order' });
    }
};

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { 
            orderItems, 
            shippingAddress, 
            paymentMethod,
            subtotal,
            tax,
            shipping,
            total
        } = req.body;
        
        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }
        
        const order = new Order({
            user: req.user.userId,
            orderItems,
            shippingAddress,
            paymentMethod,
            subtotal,
            tax,
            shipping,
            total,
            status: 'Processing'
        });
        
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: 'Error creating order' });
    }
};

// Update order payment status
export const updateOrderPayment = async (req, res) => {
    try {
        const { paymentResult } = req.body;
        
        const order = await Order.findOne({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = paymentResult;
        
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error('Update payment error:', error);
        res.status(500).json({ message: 'Error updating payment' });
    }
};

// Cancel an order
export const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Only allow cancellation if order is not delivered
        if (order.isDelivered) {
            return res.status(400).json({ message: 'Cannot cancel delivered order' });
        }
        
        order.status = 'Cancelled';
        const updatedOrder = await order.save();
        
        res.json(updatedOrder);
    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({ message: 'Error cancelling order' });
    }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id firstname lastname email');
        res.json(orders);
    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { status, trackingNumber } = req.body;
        
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        order.status = status || order.status;
        
        if (trackingNumber) {
            order.trackingNumber = trackingNumber;
        }
        
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ message: 'Error updating order status' });
    }
}; 