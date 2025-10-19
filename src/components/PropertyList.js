// frontend/src/components/PropertyList.js
import React from "react";
import PropertyCard from "./PropertyCard";

export default function PropertyList({ properties, onView, onEdit, onDelete }) {
  if (!properties.length) return <p>No properties found.</p>;
  return (
    <div>
      {properties.map((p) => (
        <PropertyCard
          key={p._id || p.id}
          property={p}
          onView={() => onView(p)}
          onEdit={() => onEdit(p)}
          onDelete={() => onDelete(p._id || p.id)}
        />
      ))}
    </div>
  );
}
















// mongodb+srv://barikkhan387_db_user:F04OgnRe2eiVRmqE@cluster0.a01rxzt.mongodb.net/