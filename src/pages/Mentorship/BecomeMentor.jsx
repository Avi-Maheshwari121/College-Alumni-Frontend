import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mentorshipService } from "../../services/mentorshipService";

export default function BecomeMentor() {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [mentorData, setMentorData] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    expertise: "",
    experience: "",
    linkedinUrl: "",
    maxStudents: 5
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Check registration status on mount
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await mentorshipService.getMyDashboard();
        if (res.success && res.data) {
          setIsRegistered(true);
          setMentorData(res.data);
        }
      } catch (err) {
        // A 404 means they aren't registered yet, which is fine!
        if (err.response?.status !== 404) {
          console.error("Error fetching mentor status:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");

    try {
      await mentorshipService.registerMentor(formData);
      // Reload the page to fetch the new status and switch to the Dashboard view
      window.location.reload(); 
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
      setSubmitLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your profile...</div>;

  // --- STATE 1: ALREADY REGISTERED (Dashboard View) ---
  if (isRegistered && mentorData) {
    const { mentorProfile, enrolledStudents } = mentorData;
    
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8 border-t-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Mentor Dashboard</h1>
            <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-bold">
              ✓ Registered Mentor
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 mb-2">
            <p><strong>Expertise:</strong> {mentorProfile.expertise}</p>
            <p><strong>Experience:</strong> {mentorProfile.experience}</p>
            <p><strong>LinkedIn:</strong> <a href={mentorProfile.linkedinUrl} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer">View Profile</a></p>
            <p><strong>Capacity:</strong> {enrolledStudents.length} / {mentorProfile.maxStudents} Students</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Enrolled Students</h2>
        {enrolledStudents.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded text-center text-gray-500 border border-gray-200">
            You don't have any students enrolled yet. We will notify you when someone signs up!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledStudents.map((student) => (
              <div key={student._id} className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <p className="font-bold text-gray-800">{student.firstName} {student.lastName}</p>
                <p className="text-sm text-gray-600">Batch: {student.batch || 'N/A'}</p>
                <a href={`mailto:${student.email}`} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                  {student.email}
                </a>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link to="/mentorship" className="text-blue-600 hover:underline">← Back to Mentorship Hub</Link>
        </div>
      </div>
    );
  }

  // --- STATE 2: NOT REGISTERED (Form View) ---
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Mentor</h1>
        <p className="text-gray-600 mb-6">Share your industry experience and guide the next generation of students.</p>

        {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Core Expertise (e.g., Frontend, DevOps, Marketing)</label>
            <input
              type="text"
              name="expertise"
              required
              value={formData.expertise}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience / Current Role</label>
            <input
              type="text"
              name="experience"
              required
              placeholder="e.g., 3 Years as SDE at Google"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
            <input
              type="url"
              name="linkedinUrl"
              required
              value={formData.linkedinUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Students to Mentor</label>
            <select
              name="maxStudents"
              value={formData.maxStudents}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="1">1 Student</option>
              <option value="2">2 Students</option>
              <option value="5">5 Students</option>
              <option value="10">10 Students</option>
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-8">
             <Link to="/mentorship" className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
               Cancel
             </Link>
             <button
               type="submit"
               disabled={submitLoading}
               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
             >
               {submitLoading ? "Submitting..." : "Register as Mentor"}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}