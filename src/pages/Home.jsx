import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Welcome to <span className="text-blue-600">JECRConnect</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            Your bridge to the college network. Discover exclusive career opportunities, attend networking events, and find mentors to guide your professional journey.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
              Join the Network
            </Link>
            <Link to="/login" className="px-8 py-3 bg-white text-gray-700 font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Events Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-6">
              📅
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Campus Events</h3>
            <p className="text-gray-600 mb-6">
              Stay updated with reunions, tech talks, and networking mixers happening on campus and virtually.
            </p>
            <Link to="/events" className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
              Browse Events →
            </Link>
          </div>

          {/* Jobs Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-6">
              💼
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Job Board</h3>
            <p className="text-gray-600 mb-6">
              Explore job openings and referrals posted directly by alumni working at top companies.
            </p>
            <Link to="/jobs" className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
              Find Opportunities →
            </Link>
          </div>

          {/* Mentorship Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-6">
              🤝
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Mentorship</h3>
            <p className="text-gray-600 mb-6">
              Connect with experienced graduates for resume reviews, mock interviews, and career advice.
            </p>
            <Link to="/mentorship" className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1">
              Find a Mentor →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}