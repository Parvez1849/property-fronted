// frontend/src/components/AddPropertyForm.js
import React, { useEffect, useState } from "react";

const empty = { id: null, name: "", type: "Apartment", price: "", location: "", description: "", image: "", coords: { lat: null, lng: null } };

export default function AddPropertyForm({ onAdd, editing, onUpdate }) {
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editing) {
      // backend uses _id; ensure id present for update
      setForm({
        id: editing._id || editing.id || null,
        name: editing.name || "",
        type: editing.type || "Apartment",
        price: editing.price || "",
        location: editing.location || "",
        description: editing.description || "",
        image: editing.image || "",
        coords: editing.coords || { lat: null, lng: null }
      });
    } else {
      setForm(empty);
    }
  }, [editing]);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.location || form.price === "") {
      alert("Please provide name, location and price.");
      return;
    }

    const payload = {
      name: form.name,
      type: form.type,
      price: Number(form.price),
      location: form.location,
      description: form.description,
      image: form.image,
      coords: form.coords
    };

    setSubmitting(true);
    try {
      if (editing) {
        await onUpdate({ ...payload, id: form.id, _id: form.id });
      } else {
        await onAdd(payload);
      }
      setForm(empty);
    } catch (err) {
      console.error(err);
      alert(`Failed to ${editing ? "update" : "add"} property.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h3>{editing ? "Edit Property" : "Add Property"}</h3>
      <form onSubmit={submit}>
        <div className="field">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Commercial</option>
            <option>Plot</option>
          </select>
        </div>

        <div className="field">
          <label>Price (INR)</label>
          <input name="price" value={form.price} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />
        </div>

        <div className="field">
          <label>Image URL (optional)</label>
          <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="field">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
        </div>

        <div>
          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? (editing ? "Updating..." : "Adding...") : (editing ? "Update Property" : "Add Property")}
          </button>
        </div>
      </form>
    </div>
  );
}

