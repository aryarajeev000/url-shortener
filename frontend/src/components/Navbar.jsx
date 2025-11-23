import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Left Logo */}
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        URL Shortener
      </Link>

      {/* Right Menu */}
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Create Link
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
