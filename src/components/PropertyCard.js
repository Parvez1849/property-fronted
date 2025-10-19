// frontend/src/components/PropertyCard.js
import React from "react";

export default function PropertyCard({ property, onView, onEdit, onDelete }) {
  return (
    <div className="card">
      <img src={property.image || "https://via.placeholder.com/600x400.png?text=No+Image"} alt={property.name} />
      <div className="meta">
        <h3>{property.name} — ₹{Number(property.price).toLocaleString()}</h3>
        <p><strong>{property.type}</strong> • {property.location}</p>
        <p>{property.description?.length > 120 ? property.description.slice(0,120) + "..." : property.description}</p>
        <div className="actions">
          <button className="btn-primary" onClick={onView}>View</button>
          <button className="btn-secondary" onClick={onEdit}>Edit</button>
          <button className="btn-danger" onClick={onDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}






