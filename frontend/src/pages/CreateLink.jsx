import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const createShortLink = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/links", { originalUrl: url });

      const generated = `${import.meta.env.VITE_API_URL}/${res.data.shortCode}`;
      toast.success("Short link created!");
      toast.success("Copied to clipboard!");
      navigator.clipboard.writeText(generated);

      window.location.href = "/dashboard";
    } catch (err) {
      toast.error("Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create a New Short Link</h1>

        <form onSubmit={createShortLink} className="bg-white p-5 rounded-xl shadow">
          <input
            type="text"
            placeholder="Enter long URL here"
            onChange={(e) => setUrl(e.target.value)}
            className="border w-full p-3 rounded mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </div>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
