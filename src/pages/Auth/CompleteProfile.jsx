import { useState } from "react";
import keycloak from "../../services/keycloak";
import api from "../../services/api";

export default function CompleteProfile() {
  const [formData, setFormData] = useState({
    role: "alumni",
    batch: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Grab the secure identity data directly from Keycloak's token
      const { given_name, family_name, preferred_username, email, sub } = keycloak.tokenParsed;

      // 2. Combine it with the form data and send to your backend
      await api.post("/auth/register", {
        firstName: given_name || "",
        lastName: family_name || "",
        username: preferred_username || email.split("@")[0],
        email: email,
        keycloakSub: sub,
        role: formData.role,
        batch: formData.batch,
        company: formData.company,
      });

      // 3. Reload the app to trigger the App.jsx routing logic (moves them to Pending)
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to complete registration.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-2">Complete Your Profile</h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Welcome, {keycloak.tokenParsed?.given_name}! We just need a few more details to set up your account.
        </p>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">I am a...</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            >
              <option value="alumni">Alumni</option>
              <option value="student">Current Student</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Graduation Batch (Year)</label>
            <input
              type="number"
              required
              value={formData.batch}
              onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Company (Optional)</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Submit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}