import { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';
import { Link } from 'react-router-dom';


export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Adjust depending on if your backend sends { data: [...] } or just [...]
        const res = await jobService.getAllJobs();
        setJobs(res.data || res); 
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch job postings');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading opportunities...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career Board</h1>
          <p className="text-gray-600 mt-2">Opportunities shared by fellow alumni</p>
        </div>
        <Link to="/jobs/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
  Post a Job
</Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">No jobs posted yet</h3>
          <p className="mt-1 text-gray-500">Check back later or be the first to post an opportunity!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{job.company}</span>
                  <span className="flex items-center">📍 {job.location}</span>
                  <span className="flex items-center">💼 {job.type || 'Full-time'}</span>
                </div>
                {job.description && (
                  <p className="mt-3 text-gray-600 line-clamp-2 text-sm">{job.description}</p>
                )}
              </div>

              <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <span className="text-xs text-gray-400">
                  Posted {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                </span>
                <button className="text-blue-600 font-medium hover:text-blue-800 text-sm border border-blue-200 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors">
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}