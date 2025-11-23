import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import LinkCard from "../components/LinkCard";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const res = await API.get("/api/links");
      setLinks(res.data);
    } catch (err) {
      console.log("Error fetching links:", err);
    }
  };

  const handleDelete = (id) => {
    setLinks((prev) => prev.filter((l) => l._id !== id));
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Shortened Links</h1>

        <a
          href="/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-700"
        >
          + Create New Link
        </a>

        <div className="space-y-4">
          {links.length === 0 ? (
            <p className="text-gray-600">No links created yet.</p>
          ) : (
            links.map((link) => (
              <LinkCard key={link._id} link={link} onDelete={handleDelete} />
            ))
          )}
        </div>
      </div>
    </>
  );
}
