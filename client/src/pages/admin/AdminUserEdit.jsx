import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminUserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isAdmin: false,
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // In a real application, fetch from your API
        // const response = await fetch(`/api/users/${id}`);
        // const data = await response.json();
        
        // For demo purposes, using sample data
        setTimeout(() => {
          // Mock user data based on ID
          const mockUser = {
            _id: id,
            name: id === '1' ? 'Admin User' : id === '2' ? 'John Doe' : 'Jane Smith',
            email: id === '1' ? 'admin@example.com' : id === '2' ? 'john@example.com' : 'jane@example.com',
            isAdmin: id === '1', // Only the first user is admin
            password: '',
          };
          
          setFormData(mockUser);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user. Please try again.');
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real application, you would use your API
      // const response = await fetch(`/api/users/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin/users');
      }, 1000);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Edit User</h2>
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-1" /> Back to Users
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">Loading user data...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Leave blank if you don't want to change the password
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAdmin"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isAdmin" className="ml-2 block text-sm font-medium text-gray-700">
                Admin User
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
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
              {isSubmitting ? 'Saving...' : <><FaSave className="mr-1" /> Update User</>}
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
};

export default AdminUserEdit; 