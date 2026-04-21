import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mentorshipService } from "../../services/mentorshipService";

export default function BecomeMentor() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      field: "",
      bio: "",
      headline: "",
      company: "",
      designation: "",
      availability: "flexible",
      sessionMode: "online",
      city: "",
    });

  const [profileId, setProfileId] =
    useState(null);

  const [isEditMode, setIsEditMode] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /**
   * Load existing profile
   */
  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          const res =
            await mentorshipService.getMyProfile();

          if (res?.data?.data) {
            const mentor =
              res.data.data;

            setProfileId(
              mentor._id
            );

            setIsEditMode(
              true
            );

            setFormData({
              field:
                mentor.field ||
                "",
              bio:
                mentor.bio ||
                "",
              headline:
                mentor.headline ||
                "",
              company:
                mentor.company ||
                "",
              designation:
                mentor.designation ||
                "",
              availability:
                mentor.availability ||
                "flexible",
              sessionMode:
                mentor.sessionMode ||
                "online",
              city:
                mentor.city ||
                "",
            });
          }
        } catch (err) {
          /**
           * no profile found
           */
        } finally {
          setPageLoading(
            false
          );
        }
      };

    fetchProfile();
  }, []);

  /**
   * Handle input
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  /**
   * Submit
   */
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);
      setError("");

      try {
        if (isEditMode) {
          await mentorshipService.updateMentorship(
            profileId,
            formData
          );
        } else {
          await mentorshipService.createMentorship(
            formData
          );
        }

        navigate(
          "/mentorship"
        );
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Failed to save mentor profile."
        );
      } finally {
        setLoading(false);
      }
    };

  if (pageLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isEditMode
            ? "Edit Mentor Profile"
            : "Offer Mentorship"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Area of Expertise
            </label>

            <input
              type="text"
              name="field"
              required
              value={
                formData.field
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Cloud, Android, Backend..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Headline
            </label>

            <input
              type="text"
              name="headline"
              value={
                formData.headline
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Helping students crack interviews"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>

            <input
              type="text"
              name="company"
              value={
                formData.company
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={
                formData.designation
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>

            <input
              type="text"
              name="city"
              value={
                formData.city
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Availability
            </label>

            <select
              name="availability"
              value={
                formData.availability
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="flexible">
                Flexible
              </option>
              <option value="weekdays">
                Weekdays
              </option>
              <option value="weekends">
                Weekends
              </option>
              <option value="evenings">
                Evenings
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Session Mode
            </label>

            <select
              name="sessionMode"
              value={
                formData.sessionMode
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="online">
                Online
              </option>
              <option value="offline">
                Offline
              </option>
              <option value="hybrid">
                Hybrid
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>

            <textarea
              rows="4"
              name="bio"
              required
              value={
                formData.bio
              }
              onChange={
                handleChange
              }
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="I help with resumes, interviews, roadmap..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/mentorship"
                )
              }
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Profile"
                : "Join as Mentor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}