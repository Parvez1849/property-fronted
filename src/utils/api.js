// frontend/src/utils/api.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const api = {
  getProperties: async () => {
    const res = await fetch(`${API_BASE}/properties`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },

  addProperty: async (payload) => {
    const res = await fetch(`${API_BASE}/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to add");
    return res.json();
  },

  updateProperty: async (id, payload) => {
    const res = await fetch(`${API_BASE}/properties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to update");
    return res.json();
  },

  deleteProperty: async (id) => {
    const res = await fetch(`${API_BASE}/properties/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    return true;
  }
};

