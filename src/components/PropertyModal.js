// frontend/src/components/PropertyModal.js
import React from "react";

export default function PropertyModal({ property, onClose }) {
  if (!property) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <img src={property.image || "https://via.placeholder.com/800x450.png?text=No+Image"} alt={property.name} />
        <h2>{property.name} — ₹{Number(property.price).toLocaleString()}</h2>
        <p><strong>{property.type}</strong> • {property.location}</p>
        <p>{property.description}</p>

        {property.coords && property.coords.lat && (
          <div style={{ marginTop: 10 }}>
            <iframe
              title="map"
              width="100%"
              height="250"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${property.coords.lat},${property.coords.lng}&z=15&output=embed`}
            />
          </div>
        )}

        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

