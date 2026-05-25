import api from "./api";

export const adminService = {
  getPendingUsers: () => api.get("/admin/users/pending"),
  getAllUsers: () => api.get("/admin/users/all"), // We need this to get all statuses!
  approveUser: (id) => api.patch(`/admin/users/${id}/approve`),
  rejectUser: (id) => api.patch(`/admin/users/${id}/reject`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`), // The new delete route
};