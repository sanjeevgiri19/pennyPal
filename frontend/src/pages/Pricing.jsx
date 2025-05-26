import React from "react";
import Navbar from "../components/things/Navbar";

const Pricing = () => {
  return (
    <>
      <title>PennyPal | Pricing</title>
      <Navbar />
      <div className="bg-gray-100 py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <svg
            className="absolute bottom-0 left-0 w-full h-1/3 opacity-20"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#166534"
              fillOpacity="0.5"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,160C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
          <svg
            className="absolute top-0 left-0 w-full h-1/2 opacity-10"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#1e3a8a"
              fillOpacity="0.4"
              d="M0,32L48,53.3C96,75,192,117,288,138.7C384,160,480,160,576,138.7C672,117,768,75,864,58.7C960,43,1056,53,1152,80C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Pricing Plans
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Explore Nepal-inspired plans tailored to your financial journey
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-green-600 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center text-green-700">
                Koshi River Free
              </h3>
              <p className="text-center text-gray-500 mt-2">
                Flow through your finances like Nepal’s mighty rivers
              </p>
              <div className="text-center my-6">
                <span className="text-4xl font-bold text-gray-800">Rs. 0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span> Basic
                  Transaction Tracking
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span> Forest-Inspired
                  Budget Views
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span> 5
                  Transactions/Month
                </li>
                <li className="flex items-center">
                  <span className="text-gray-400 mr-2">✗</span> Advanced
                  Analytics
                </li>
              </ul>
              <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-colors">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-700 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-4">
                <svg
                  className="w-12 h-12 text-blue-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 19l7-7 7 7M12 5v7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center text-blue-800">
                Everest Peak Pro
              </h3>
              <p className="text-center text-gray-500 mt-2">
                Rise above with the power of Nepal’s Himalayan peaks
              </p>
              <div className="text-center my-6">
                <span className="text-4xl font-bold text-gray-800">
                  Rs. 499
                </span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span> Unlimited
                  Transactions
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span> Mountain-Top
                  Analytics
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span> Custom Budget
                  Categories
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span> Priority Support
                </li>
              </ul>
              <button className="mt-6 w-full bg-blue-700 text-white py-2 rounded-full hover:bg-blue-800 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
