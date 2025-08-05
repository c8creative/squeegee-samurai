import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ShieldX className="mx-auto h-24 w-24 text-red-500" />
          <h1 className="mt-6 text-3xl font-bold text-neutral-900">Access Denied</h1>
          <p className="mt-2 text-lg text-neutral-600">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-neutral-600 mb-6">
            This page requires specific permissions that your account doesn't have. 
            Please contact an administrator if you believe this is an error.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
            
            <Link
              to="/login"
              className="w-full bg-neutral-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-700 transition-colors inline-block"
            >
              Login with Different Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;