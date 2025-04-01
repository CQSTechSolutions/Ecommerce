import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    street: {
        type: String,
        required: [true, 'Street address is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'State/Province is required']
    },
    zipCode: {
        type: String,
        required: [true, 'Postal/Zip code is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Address = mongoose.model('Address', addressSchema);
export default Address; 