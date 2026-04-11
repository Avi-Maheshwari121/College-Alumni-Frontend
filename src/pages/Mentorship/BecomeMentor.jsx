import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mentorshipService } from '../../services/mentorshipService';

export default function BecomeMentor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    expertise: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await mentorshipService.createMentorship(formData);
      navigate('/mentorship'); // Redirect back to mentorship directory
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register as a mentor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Offer Mentorship</h2>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="e.g. Jane Doe" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Area of Expertise</label>
            <input type="text" name="expertise" required value={formData.expertise} onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="e.g. Cloud Architecture, Product Management" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short Bio / What you can help with</label>
            <textarea name="bio" rows="4" required value={formData.bio} onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="I can help review resumes, prepare for system design interviews..."></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => navigate('/mentorship')} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Submitting...' : 'Join as Mentor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}