import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      toast.error("Invalid email or password"|| "Login failed" || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={loginUser} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 w-full rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-sm mt-3 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
