import { useState, useEffect } from 'react';
import { FaUsers, FaBoxes, FaClipboardList, FaRupeeSign } from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';

const DashboardCard = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch('/api/products/stats');
        
        if (!statsResponse.ok) {
          throw new Error(`HTTP error! Status: ${statsResponse.status}`);
        }
        
        const statsData = await statsResponse.json();
        setStats(statsData);
        
        // Fetch recent orders
        const ordersResponse = await fetch('/api/order/recent');
        
        if (!ordersResponse.ok) {
          throw new Error(`HTTP error! Status: ${ordersResponse.status}`);
        }
        
        const ordersData = await ordersResponse.json();
        setRecentOrders(ordersData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Fallback to placeholder data if API fails
        setStats({
          users: 45,
          products: 68,
          orders: 24,
          revenue: 4850,
        });
        setRecentOrders([
          {
            _id: '1234',
            user: { name: 'John Doe' },
            totalAmount: 250.00,
            status: 'Delivered',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '1235',
            user: { name: 'Jane Smith' },
            totalAmount: 120.00,
            status: 'Processing',
            createdAt: new Date().toISOString(),
          }
        ]);
        setError('Could not fetch live data. Showing sample data instead.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      
      {loading ? (
        <div className="text-center py-4">Loading dashboard data...</div>
      ) : (
        <>
          {error && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-md mb-6">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DashboardCard
              title="Total Users"
              value={stats.users}
              icon={<FaUsers />}
              bgColor="bg-blue-600"
            />
            <DashboardCard
              title="Total Products"
              value={stats.products}
              icon={<FaBoxes />}
              bgColor="bg-green-600"
            />
            <DashboardCard
              title="Total Orders"
              value={stats.orders}
              icon={<FaClipboardList />}
              bgColor="bg-purple-600"
            />
            <DashboardCard
              title="Revenue"
              value={`₹${stats.revenue.toLocaleString()}`}
              icon={<FaRupeeSign />}
              bgColor="bg-orange-600"
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard; 