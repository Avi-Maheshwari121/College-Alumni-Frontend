import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { mentorshipService } from "../../services/mentorshipService";

export default function MentorshipList() {
  const [mentors, setMentors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /**
   * Fetch mentors
   */
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        /**
         * Service already returns array
         * return response.data.data
         */
        const data = await mentorshipService.getAllMentors();

        setMentors(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch mentors");
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  /**
   * Loading
   */
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">Loading mentors...</div>
    );
  }

  /**
   * Error
   */
  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Alumni Mentorship
          </h1>

          <p className="text-gray-600 mt-2">
            Connect with experienced alumni for career guidance
          </p>
        </div>

        <Link
          to="/mentorship/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-colors"
        >
          Become a Mentor
        </Link>
      </div>

      {/* Empty State */}
      {mentors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            No approved mentors available
          </h3>

          <p className="mt-2 text-gray-500">
            New mentor applications may be pending admin approval.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition"
            >
              {/* Avatar */}
              <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold mb-4">
                {mentor.mentorName?.charAt(0)?.toUpperCase() || "M"}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900">
                {mentor.mentorName}
              </h3>

              {/* Headline */}
              <p className="text-sm text-blue-600 mt-1 font-medium">
                {mentor.headline || mentor.field}
              </p>

              {/* Company */}
              {(mentor.company || mentor.designation) && (
                <p className="text-sm text-gray-500 mt-2">
                  {mentor.designation}
                  {mentor.designation && mentor.company ? " • " : ""}
                  {mentor.company}
                </p>
              )}

              {/* Bio */}
              <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {mentor.bio || "Available for mentorship guidance."}
              </p>

              {/* Meta */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {mentor.field && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {mentor.field}
                  </span>
                )}

                {mentor.sessionMode && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {mentor.sessionMode}
                  </span>
                )}

                {mentor.availability && (
                  <span className="px-2 py-1 bg-gray-100 rounded">
                    {mentor.availability}
                  </span>
                )}
              </div>

              {/* CTA */}
              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition">
                Request Guidance
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
