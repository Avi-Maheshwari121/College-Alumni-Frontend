import api from "./api";

export const adminService = {
  getPendingUsers: async () => {
    const res = await api.get("/admin/users/pending");
    return res.data;
  },

  approveUser: async (id) => {
    const res = await api.patch(`/admin/users/${id}/approve`);
    return res.data;
  },

  rejectUser: async (id) => {
    const res = await api.patch(`/admin/users/${id}/reject`);
    return res.data;
  },
};