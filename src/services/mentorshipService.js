import api from "./api";

export const mentorshipService = {
  /**
   * Get all approved mentors
   */
  getAllMentors: async () => {
    const response =
      await api.get(
        "/mentorship"
      );

    return (
      response.data.data ||
      []
    );
  },

  /**
   * Get mentor by id
   */
  getMentorById: async (
    id
  ) => {
    const response =
      await api.get(
        `/mentorship/${id}`
      );

    return (
      response.data.data
    );
  },

  /**
   * Create mentor profile
   */
  createMentorship:
    async (data) => {
      const response =
        await api.post(
          "/mentorship",
          data
        );

      return (
        response.data
      );
    },

  /**
   * Get my mentor profile
   */
  getMyProfile:
    async () => {
      const response =
        await api.get(
          "/mentorship/me/profile"
        );

      return (
        response.data
      );
    },

  /**
   * Update mentor profile
   */
  updateMentorship:
    async (
      id,
      data
    ) => {
      const response =
        await api.put(
          `/mentorship/${id}`,
          data
        );

      return (
        response.data
      );
    },

  /**
   * Delete mentor profile
   */
  deleteMentorship:
    async (id) => {
      const response =
        await api.delete(
          `/mentorship/${id}`
        );

      return (
        response.data
      );
    },

  /**
   * Admin approve/reject
   */
  updateStatus:
    async (
      id,
      status
    ) => {
      const response =
        await api.patch(
          `/mentorship/${id}/status`,
          { status }
        );

      return (
        response.data
      );
    },
};