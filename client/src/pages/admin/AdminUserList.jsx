import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // In a real application, fetch from your API
        // const response = await fetch('/api/users');
        // const data = await response.json();
        
        // For demo purposes, using sample data
        setTimeout(() => {
          const sampleUsers = [
            {
              _id: '1',
              name: 'Admin User',
              email: 'admin@example.com',
              isAdmin: true,
              createdAt: '2023-01-05T12:00:00Z',
            },
            {
              _id: '2',
              name: 'John Doe',
              email: 'john@example.com',
              isAdmin: false,
              createdAt: '2023-02-15T09:30:00Z',
            },
            {
              _id: '3',
              name: 'Jane Smith',
              email: 'jane@example.com',
              isAdmin: false,
              createdAt: '2023-03-22T14:45:00Z',
            },
          ];
          setUsers(sampleUsers);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // In a real application, delete through your API
        // await fetch(`/api/users/${id}`, { method: 'DELETE' });
        
        // For demo purposes, just remove from local state
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Users</h2>

      {loading ? (
        <div className="text-center py-4">Loading users...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-600" />
                      ) : (
                        <FaTimes className="text-red-600" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/admin/users/${user._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-600 hover:text-red-900"
                          disabled={user.isAdmin}
                          title={user.isAdmin ? "Can't delete admin user" : "Delete user"}
                        >
                          <FaTrash className={user.isAdmin ? "opacity-50 cursor-not-allowed" : ""} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminUserList; 