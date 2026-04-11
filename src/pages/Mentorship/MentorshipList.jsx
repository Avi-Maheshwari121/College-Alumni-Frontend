import { useState, useEffect } from 'react';
import { mentorshipService } from '../../services/mentorshipService';
import { Link } from 'react-router-dom'; // Add to imports

export default function MentorshipList() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await mentorshipService.getAllMentors();
        setMentors(res.data || res); 
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading mentorship directory...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alumni Mentorship</h1>
          <p className="text-gray-600 mt-2">Connect with experienced alumni for guidance</p>
        </div>
        <Link to="/mentorship/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
  Become a Mentor
</Link>
      </div>

      {mentors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">No mentors available yet</h3>
          <p className="mt-1 text-gray-500">Be the first to offer your expertise!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600 text-2xl font-bold">
                {/* Fallback avatar using initials if no image exists */}
                {mentor.name ? mentor.name.charAt(0) : 'M'}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{mentor.name || 'Anonymous Mentor'}</h3>
              <p className="text-sm font-medium text-blue-600 mt-1">{mentor.expertise || 'General Career Advice'}</p>
              <p className="text-gray-600 text-sm mt-3 line-clamp-3">
                {mentor.bio || 'Happy to connect and share my professional journey.'}
              </p>
              <button className="mt-6 w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-medium py-2 border border-gray-200 rounded-md transition-colors">
                Request Connection
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}