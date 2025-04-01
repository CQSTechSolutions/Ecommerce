import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    brand: '',
    category: '',
    countInStock: 0,
    description: '',
    image: '',
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isNewProduct = id === 'new';

  useEffect(() => {
    if (!isNewProduct) {
      const fetchProduct = async () => {
        try {
          // In a real application, fetch from your API
          // const response = await fetch(`/api/products/${id}`);
          // const data = await response.json();
          
          // For demo purposes, using sample data
          setTimeout(() => {
            // Mock product data based on ID
            const mockProduct = {
              _id: id,
              name: id === '1' ? 'Elegant Tote Bag' : id === '2' ? 'Leather Messenger Bag' : 'Canvas Backpack',
              price: id === '1' ? 59.99 : id === '2' ? 89.99 : 49.99,
              brand: id === '1' ? 'LuxuryBrand' : id === '2' ? 'LeatherCo' : 'OutdoorGear',
              category: id === '1' ? 'Tote' : id === '2' ? 'Messenger' : 'Backpack',
              countInStock: id === '1' ? 15 : id === '2' ? 8 : 22,
              description: `This is a high-quality ${id === '1' ? 'tote' : id === '2' ? 'messenger' : 'backpack'} bag, perfect for daily use.`,
              image: '/images/sample.jpg',
              featured: id === '1',
            };
            
            setFormData(mockProduct);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Error fetching product:', error);
          setError('Failed to load product. Please try again.');
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id, isNewProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real application, you would use your API
      // const method = isNewProduct ? 'POST' : 'PUT';
      // const url = isNewProduct ? '/api/products' : `/api/products/${id}`;
      // const response = await fetch(url, {
      //   method,
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin/products');
      }, 1000);
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {isNewProduct ? 'Add New Product' : 'Edit Product'}
        </h2>
        <button
          onClick={() => navigate('/admin/products')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-1" /> Back to Products
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading product data...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="Tote">Tote</option>
                  <option value="Messenger">Messenger</option>
                  <option value="Backpack">Backpack</option>
                  <option value="Clutch">Clutch</option>
                  <option value="Crossbody">Crossbody</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="countInStock" className="block text-sm font-medium text-gray-700">
                  Count in Stock
                </label>
                <input
                  type="number"
                  id="countInStock"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleChange}
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Saving...'
              ) : (
                <>
                  <FaSave className="mr-1" /> {isNewProduct ? 'Create Product' : 'Update Product'}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
};

export default AdminProductEdit; 