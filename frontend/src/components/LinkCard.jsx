import { useState } from "react";
import API from "../api/axios";

export default function LinkCard({ link, onDelete }) {
  const shortUrl = `${import.meta.env.VITE_API_URL}/${link.shortCode}`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const deleteLink = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this link?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/api/links/${link._id}`);
      onDelete(link._id); // Notify parent to remove it
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      {/* Original URL */}
      <p className="font-semibold text-gray-800 break-all">{link.originalUrl}</p>

      {/* Short Link + Buttons */}
      <div className="flex items-center justify-between mt-3">
        <a
          href={shortUrl}
          target="_blank"
          className="text-blue-600 underline break-all"
        >
          {shortUrl}
        </a>

        <div className="flex gap-2">
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className={`text-sm px-3 py-1 rounded transition ${
              copied ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

          {/* Delete button */}
          <button
            onClick={deleteLink}
            className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Click Count */}
      <p className="text-sm text-gray-500 mt-2">
        Clicks: <span className="font-bold">{link.clickCount}</span>
      </p>
    </div>
  );
}
