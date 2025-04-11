"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { storeToken } from "@/Redux/Tokenslice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const apiUrls = {
  //   local: "http://localhost:9000",
  //   phone: "http://192.168.208.198:9000",
  //   ngrok: "https://your-ngrok-url.ngrok.io",
  //   production: "https://devhire-backend-production.up.railway.app",
  // };

  // const API_URL = apiUrls.production;
  useEffect(() => {
    const checkAuth = async () => {
      if (status === "authenticated") {
        try {
          const formData = {
            email: session?.user?.email,
            name: session?.user?.name,
            // Add other necessary form data fields here
          };

          const res = await axios.post(
            `https://devhire-backend.onrender.com/auth`,
            formData,
            {
              withCredentials: true, // Allows cookies to be sent
            }
          );

          if (res.status === 200) {
            // Redirect to Dashboard if login is successful
            dispatch(storeToken(res.data));
            router.push("/Dashboard");
          } else {
            // Handle error if necessary
          }
        } catch (error) {}
      }
    };

    checkAuth();
  }, [status, session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formData.email || !formData.password) {
        setError(true as any);
      } else {
        const res = await axios.post(
          `https://devhire-backend.onrender.com/login`,
          formData,
          {
            withCredentials: true, // Allows cookies to be sent
          }
        );

        if (res.status === 200) {
          dispatch(storeToken(res.data));
          router.push("/Dashboard");
          setError(false as any);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className=" shadow-lg rounded-lg grid md:flex max-w-4xl w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 bg-red-500 p-8 text-white flex flex-col justify-center md:hidden items-center "
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
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 bg-white p-8  flex flex-col justify-center items-center "
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            Log into Your Account
          </h2>
          <p className="text-sm text-gray-500 mb-4"></p>

          <div className="flex space-x-2">
            <button
              className="flex-1 py-2 px-4 border-gray-500 border-2 rounded-lg text-gray-600 cursor-pointer"
              onClick={() => signIn("google")}
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
              className="flex-1 py-2 px-4 border rounded-md text-gray-600 cursor-pointer"
              onClick={() => signIn("github")}
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
          <form onSubmit={handleSubmit} className="gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-b-2 mb-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 8 chars)"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border-b-2 mb-2"
            />

            {error && (
              <p className="text-center text-red-500 font-semibold my-3">
                Check Your Username or Password!
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Don't have an account?
            <a href="/Signup" className="text-blue-600">
              Sign up
            </a>
          </p>

          <p className="text-sm text-blue-600 mt-4 text-center">
            Return to &nbsp;
            <a href="/" className="text-blue-600">
              Homepage
            </a>
          </p>
        </motion.div>
        {/* Right Section */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="md:w-1/2 bg-red-500 p-8 text-white md:flex flex-col justify-center items-center hidden "
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
      </div>
    </div>
  );
};

export default Login;
