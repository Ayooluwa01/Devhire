"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

const EmployerSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    companyName: "",
    location: "",
    website: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Debugging alert - shows the form data in a readable format.
    alert(JSON.stringify(formData, null, 2));

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.companyName ||
      !formData.location ||
      !formData.password ||
      formData.confirmpassword !== formData.password
    ) {
      setError("Please fill in all required fields correctly.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://devhire-backend.onrender.com/Employersignup",
        formData
      );
      if (res.status === 200 || res.status === 201) {
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="shadow-lg rounded-lg grid md:flex max-w-4xl w-full overflow-hidden">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 bg-blue-600 p-8 text-white flex flex-col justify-center items-center"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Welcome to DevHire
          </h2>
          <p className="text-sm text-center">
            Sign up to hire top talent for your company!
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 p-8 bg-white"
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            <span className="text-red-500">Employer</span>
            <span className="text-blue-600"> Sign Up</span>
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Create an account to post jobs and hire top talent.
          </p>

          <form className="gap-16" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Company Name */}
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.companyName}
              onChange={handleChange}
              required
            />

            {/* Location */}
            <input
              type="text"
              name="location"
              placeholder="Company Location"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.location}
              onChange={handleChange}
              required
            />

            {/* Website */}
            <input
              type="url"
              name="website"
              placeholder="Company Website"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.website}
              onChange={handleChange}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 mt-2 text-sm text-center">{error}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EmployerSignUp;
