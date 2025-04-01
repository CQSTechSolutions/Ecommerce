import Address from '../models/address.model.js';

// Get all addresses for a user
export const getUserAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user.userId });
        res.json(addresses);
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({ message: 'Error fetching addresses' });
    }
};

// Get a single address by ID
export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findOne({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        
        res.json(address);
    } catch (error) {
        console.error('Get address error:', error);
        res.status(500).json({ message: 'Error fetching address' });
    }
};

// Create a new address
export const createAddress = async (req, res) => {
    try {
        const { street, city, state, zipCode, country, phone, isDefault } = req.body;
        
        // If this address is set as default, unset any existing default address
        if (isDefault) {
            await Address.updateMany(
                { user: req.user.userId, isDefault: true },
                { isDefault: false }
            );
        }
        
        const address = new Address({
            user: req.user.userId,
            street,
            city,
            state,
            zipCode,
            country,
            phone,
            isDefault: isDefault || false
        });
        
        const savedAddress = await address.save();
        res.status(201).json(savedAddress);
    } catch (error) {
        console.error('Create address error:', error);
        res.status(500).json({ message: 'Error creating address' });
    }
};

// Update an address
export const updateAddress = async (req, res) => {
    try {
        const { street, city, state, zipCode, country, phone, isDefault } = req.body;
        
        // Find the address to update
        const address = await Address.findOne({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        
        // If this address is set as default, unset any existing default address
        if (isDefault && !address.isDefault) {
            await Address.updateMany(
                { user: req.user.userId, isDefault: true },
                { isDefault: false }
            );
        }
        
        // Update the address
        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.zipCode = zipCode || address.zipCode;
        address.country = country || address.country;
        address.phone = phone || address.phone;
        address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;
        
        const updatedAddress = await address.save();
        res.json(updatedAddress);
    } catch (error) {
        console.error('Update address error:', error);
        res.status(500).json({ message: 'Error updating address' });
    }
};

// Delete an address
export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ 
            _id: req.params.id, 
            user: req.user.userId 
        });
        
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        
        await address.deleteOne();
        res.json({ message: 'Address removed' });
    } catch (error) {
        console.error('Delete address error:', error);
        res.status(500).json({ message: 'Error deleting address' });
    }
};

// Set an address as default
export const setDefaultAddress = async (req, res) => {
    try {
        // First, remove default from all user addresses
        await Address.updateMany(
            { user: req.user.userId },
            { isDefault: false }
        );
        
        // Set the specified address as default
        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },
            { isDefault: true },
            { new: true }
        );
        
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        
        res.json(address);
    } catch (error) {
        console.error('Set default address error:', error);
        res.status(500).json({ message: 'Error setting default address' });
    }
}; 