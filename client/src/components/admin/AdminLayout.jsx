import { Link, useLocation } from 'react-router';
import { FaUsers, FaBoxes, FaClipboardList, FaTachometerAlt } from 'react-icons/fa';
import useStore from '../../store/useStore';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { logout } = useStore();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">
          <Link to="/" className="text-white hover:text-gray-300">
            BagsTopia Admin
          </Link>
        </div>
        <nav className="mt-8">
          <Link
            to="/admin"
            className={`flex items-center py-3 px-6 ${
              location.pathname === '/admin' ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaTachometerAlt className="mr-3" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center py-3 px-6 ${
              location.pathname.includes('/admin/products') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaBoxes className="mr-3" />
            <span>Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center py-3 px-6 ${
              location.pathname.includes('/admin/orders') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaClipboardList className="mr-3" />
            <span>Orders</span>
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center py-3 px-6 ${
              location.pathname.includes('/admin/users') ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <FaUsers className="mr-3" />
            <span>Users</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center py-3 px-6 w-full text-left hover:bg-gray-700"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Admin Panel</h1>
          <div>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              Back to Store
            </Link>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout; 