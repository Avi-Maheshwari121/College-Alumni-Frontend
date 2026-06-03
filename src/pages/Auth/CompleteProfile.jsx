// src/pages/Auth/CompleteProfile.jsx
import React, { useState } from "react";
import api from "../../services/api";
import keycloak from "../../services/keycloak";

const CompleteProfile = () => {
  const [formData, setFormData] = useState({
    role: "student", // Default value
    batch: "",
    company: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/complete-profile", formData);
      window.location.href = "/pending-approval"; // Force direct browser redirect to avoid React Router loops
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to complete profile");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Complete Your Profile</h2>

        {error && <div className="mb-4 text-red-600 bg-red-50 p-3 rounded text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NEW: Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="student">Current Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Batch</label>
            <input
              type="text"
              name="batch"
              required
              placeholder="e.g., 2024"
              value={formData.batch}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {formData.role === 'alumni' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Company</label>
              <input
                type="text"
                name="company"
                required={formData.role === 'alumni'}
                placeholder="Where do you work?"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
            <textarea
              name="bio"
              rows="3"
              placeholder="Tell us a bit about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
            className="text-sm text-gray-500 hover:text-red-600 underline"
          >
            Log Out / Switch Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;