import React from 'react';

const TransactionSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-8 text-center bg-white rounded-lg shadow-lg">
        <div className="inline-block w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-xl font-semibold text-gray-700">Processing Transaction</div>
        <div className="mt-2 text-sm text-gray-500">Please wait while we confirm your booking...</div>
        <div className="mt-4">
          <div className="w-48 h-2 mx-auto overflow-hidden bg-gray-200 rounded-full">
            <div className="w-full h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSpinner;