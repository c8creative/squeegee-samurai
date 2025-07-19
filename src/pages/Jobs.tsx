import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, Phone, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Mock jobs data - in production this would come from a database
    const mockJobs = [
      {
        id: 1,
        customerName: 'John Smith',
        address: '123 Main St, Ashburn, VA 20147',
        phone: '540-555-0123',
        scheduledDate: '2024-01-20',
        timeSlot: '9:00 AM - 11:00 AM',
        serviceType: 'Residential - Standard',
        paneCount: 15,
        total: 150.00,
        status: 'Scheduled',
        notes: 'Customer prefers morning appointments'
      },
      {
        id: 2,
        customerName: 'Sarah Johnson',
        address: '456 Oak Ave, Leesburg, VA 20175',
        phone: '540-555-0456',
        scheduledDate: '2024-01-21',
        timeSlot: '1:00 PM - 3:00 PM',
        serviceType: 'Residential - Premium',
        paneCount: 28,
        total: 280.00,
        status: 'In Progress',
        notes: 'Include screen cleaning'
      },
      {
        id: 3,
        customerName: 'Mike Wilson',
        address: '789 Pine St, Sterling, VA 20164',
        phone: '540-555-0789',
        scheduledDate: '2024-01-19',
        timeSlot: '10:00 AM - 12:00 PM',
        serviceType: 'Residential - Basic',
        paneCount: 12,
        total: 95.00,
        status: 'Completed',
        notes: 'Exterior only'
      }
    ];
    setJobs(mockJobs);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const updateJobStatus = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-accent-100 text-accent-800';
      case 'In Progress':
        return 'bg-primary-100 text-primary-800';
      case 'Scheduled':
        return 'bg-gold-100 text-gold-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Job Management</h1>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-gold-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Scheduled</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {jobs.filter(j => j.status === 'Scheduled').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">In Progress</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {jobs.filter(j => j.status === 'In Progress').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Briefcase className="w-8 h-8 text-accent-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Completed</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {jobs.filter(j => j.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">{job.customerName}</h3>
                  <div className="flex items-center text-neutral-600 mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.address}</span>
                  </div>
                  <div className="flex items-center text-neutral-600 mt-1">
                    <Phone className="w-4 h-4 mr-1" />
                    <span className="text-sm">{job.phone}</span>
                  </div>
                </div>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-neutral-700">Date & Time</p>
                  <p className="text-sm text-neutral-600">{job.scheduledDate}</p>
                  <p className="text-sm text-neutral-600">{job.timeSlot}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Service Type</p>
                  <p className="text-sm text-neutral-600">{job.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Pane Count</p>
                  <p className="text-sm text-neutral-600">{job.paneCount} panes</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Total</p>
                  <p className="text-sm font-semibold text-neutral-900">${job.total.toFixed(2)}</p>
                </div>
              </div>

              {job.notes && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-700">Notes</p>
                  <p className="text-sm text-neutral-600">{job.notes}</p>
                </div>
              )}

              <div className="flex space-x-3">
                {job.status === 'Scheduled' && (
                  <button
                    onClick={() => updateJobStatus(job.id, 'In Progress')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    Start Job
                  </button>
                )}
                {job.status === 'In Progress' && (
                  <button
                    onClick={() => updateJobStatus(job.id, 'Completed')}
                    className="bg-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-700 transition-colors"
                  >
                    Mark Complete
                  </button>
                )}
                <button className="bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;