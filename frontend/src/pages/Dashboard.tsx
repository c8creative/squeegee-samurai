import React, { useState, useEffect } from 'react';
import { BarChart3, Users, DollarSign, Calendar, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Mock quotes data - in production this would come from a database
    const mockQuotes = [
      {
        id: 1,
        fullName: 'John Smith',
        email: 'john@example.com',
        date: '2024-01-15',
        total: 150.00,
        tier: 'Standard',
        paneCount: 15,
        frequency: 'Quarterly',
        status: 'Pending'
      },
      {
        id: 2,
        fullName: 'Sarah Johnson',
        email: 'sarah@example.com',
        date: '2024-01-14',
        total: 280.00,
        tier: 'Premium',
        paneCount: 28,
        frequency: 'Monthly',
        status: 'Approved'
      },
      {
        id: 3,
        fullName: 'Mike Wilson',
        email: 'mike@example.com',
        date: '2024-01-13',
        total: 95.00,
        tier: 'Basic',
        paneCount: 12,
        frequency: 'One-time',
        status: 'Completed'
      }
    ];
    setQuotes(mockQuotes);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = {
    totalQuotes: quotes.length,
    totalRevenue: quotes.reduce((sum, quote) => sum + quote.total, 0),
    pendingQuotes: quotes.filter(q => q.status === 'Pending').length,
    completedJobs: quotes.filter(q => q.status === 'Completed').length
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Admin Dashboard</h1>
              <p className="text-neutral-600">Welcome back, {user?.fullName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center bg-neutral-600 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total Quotes</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.totalQuotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-accent-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-gold-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Pending Quotes</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.pendingQuotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Completed Jobs</p>
                <p className="text-2xl font-bold text-neutral-900">{stats.completedJobs}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quotes Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h2 className="text-xl font-semibold text-neutral-900">All Submitted Quotes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Panes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Frequency
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">{quote.fullName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">{quote.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">{quote.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-neutral-900">${quote.total.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">{quote.tier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">{quote.paneCount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-600">{quote.frequency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        quote.status === 'Completed' ? 'bg-accent-100 text-accent-800' :
                        quote.status === 'Approved' ? 'bg-primary-100 text-primary-800' :
                        'bg-gold-100 text-gold-800'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;