// frontend/src/App.js
import React, { useEffect, useState } from "react";
import PropertyList from "./components/PropertyList";
import AddPropertyForm from "./components/AddPropertyForm";
import PropertyModal from "./components/PropertyModal";
import { api } from "./utils/api";

export default function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await api.getProperties();
      setProperties(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch properties. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (newProp) => {
    await api.addProperty(newProp);
    await fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this property?")) return;
    try {
      await api.deleteProperty(id);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleEditStart = (prop) => setEditing(prop);

  const handleUpdate = async (updatedProp) => {
    try {
      await api.updateProperty(updatedProp._id || updatedProp.id, updatedProp);
      setEditing(null);
      await fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    }
  };

  const types = ["All", ...Array.from(new Set(properties.map((p) => p.type)))];

  const visible = properties.filter((p) => {
    const matchesType = filterType === "All" || p.type === filterType;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === "" ||
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  });

  return (
    <div className="container">
      <header>
        <h1>Property Listings</h1>
      </header>

      <section className="controls">
        <div>
          <label>Search:</label>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or location" />
        </div>
        <div>
          <label>Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </section>

      <main>
        <div className="left">
          <AddPropertyForm onAdd={handleAdd} editing={editing} onUpdate={handleUpdate} />
        </div>

        <div className="right">
          {loading ? <p>Loading...</p> : (
            <PropertyList properties={visible} onView={(p) => setSelected(p)} onEdit={handleEditStart} onDelete={handleDelete} />
          )}
        </div>
      </main>

      {selected && <PropertyModal property={selected} onClose={() => setSelected(null)} />}

      <footer>Built for testing — React + MongoDB Atlas backend</footer>
    </div>
  );
}
