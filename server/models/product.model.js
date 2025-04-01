import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    image: {
        type: String,
        required: [true, 'Product image is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: ['backpacks', 'handbags', 'travel']
    },
    inStock: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        required: [true, 'Product rating is required'],
        min: [0, 'Rating cannot be negative'],
        max: [5, 'Rating cannot exceed 5']
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product; 