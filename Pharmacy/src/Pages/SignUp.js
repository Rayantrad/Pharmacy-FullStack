import React, { useState } from "react";
import { useAuth } from "../Contexts/UserContext";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const success = await signup(form.username, form.email, form.password);
    if (success) {
      setMessage("✅ Signup successful! You can login now.");
      setError("");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      // Optionally redirect to login
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError("❌ Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-[120vh] bg-blue-50">
      {/* Top bar with Go Back */}
      <div className="container mx-auto p-3 md:py-3">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center cursor-pointer gap-2 text-sm font-semibold text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-full transition-all duration-300"
        >
          <FaArrowLeft className="text-xs" />
          Go Back
        </button>
      </div>

      {/* Centered content */}
      <div className="flex justify-center flex-col items-center gap-5 px-4 sm:px-6 md:px-8 lg:px-10">
        <div>
          <h1 className="text-center text-2xl sm:text-3xl md:text-4xl pb-6 font-bold text-blue-900 leading-snug">
            Welcome to CarePharma <br />
            <span className="text-blue-600">
              Sign up to explore our categories
            </span>
          </h1>
        </div>

        {/* Signup card */}
        <div className="border rounded-lg shadow-md px-4 py-6 w-full max-w-md bg-white">
          <h3 className="text-center text-xl font-semibold text-blue-700 mb-4">
            Signup
          </h3>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="border rounded w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-600 text-sm">{message}</p>}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cursor-pointer rounded transition mt-2 font-medium"
            >
              Signup
            </button>
          </form>
        </div>

        {/* Link to login */}
        <div className="text-sm text-gray-700">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;