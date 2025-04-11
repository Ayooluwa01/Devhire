"use client";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const apiUrls = {
    local: "http://localhost:9000",
    phone: "http://192.168.122.198:9000",
    ngrok: "https://your-ngrok-url.ngrok.io",
    production: "https://api.yourdomain.com",
  };

  const API_URL = apiUrls.local;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.email ||
        !formData.password ||
        !formData.name ||
        formData.confirmpassword != formData.password
      ) {
        console.log("error");
        setError(true as any);
      } else {
        const res = await axios.post(`${API_URL}/signup`, formData);
        if (res) {
          router.push("/login");
        }

        setError(false as any);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const route = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="shadow-lg rounded-lg grid md:flex max-w-4xl w-full overflow-hidden">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 bg-blue-600 p-8 text-white flex flex-col justify-center items-center "
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Welcome to DevHire
          </h2>
          <p className="text-sm text-center">
            Sign up for something amazing! It could be a volunteer event or a
            service.
          </p>
          <div className="mt-6">
            {/* Profile icons */}
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white rounded-full"></div>
              <div className="w-10 h-10 bg-white rounded-full"></div>
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
          </div>
        </motion.div>
        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2  p-8 bg-white   "
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Let's get started with a 30-day free trial
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => signIn("google")}
              className="flex-1 py-2 px-4 border-gray-500 border-2 cursor-pointer rounded-lg text-gray-600"
            >
              <span>
                <img
                  src="https://icon2.cleanpng.com/20240216/ikb/transparent-google-logo-google-logo-with-multicolored-g-and-1710875587855.webp"
                  className="w-16 h-16 rounded-full mx-auto"
                  alt="Google"
                />
              </span>
              Continue with Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="flex-1 py-2 px-4 border rounded-md cursor-pointer text-gray-600"
            >
              <span>
                <img
                  src="https://banner2.cleanpng.com/20190523/juu/kisspng-github-software-repository-computer-icons-email-5ce6e863973725.5475298415586366436194.jpg"
                  className="w-16 h-16 rounded-full mx-auto"
                  alt="Github"
                />
              </span>
              Continue with Github
            </button>
          </div>

          <div className="text-center my-4 text-gray-400">or</div>

          <form className="gap-16" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border-b-2 mb-2"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              className="w-full p-2 border-b-2  mb-2"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              className="w-full p-2 border-b-2  mb-2"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              className="w-full p-2 border-b-2  mb-2"
              value={formData.confirmpassword}
              onChange={handleChange}
            />

            <div className="flex items-center text-sm mb-4">
              <input type="checkbox" className="mr-2 " />
              <span>
                I agree to the
                <a href="#" className="text-blue-600">
                  Terms & Conditions
                </a>
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer">
              {loading ? "Signning up..." : "Sign up"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?
            <a href="/login" className="text-blue-600">
              Log in
            </a>
          </p>

          <p className="text-sm text-blue-600 mt-4 text-center">
            Return to &nbsp;
            <a href="/" className="text-blue-600">
              Homepage
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
