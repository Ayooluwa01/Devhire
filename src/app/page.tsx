"use client";
import { motion } from "framer-motion";
import SearchButton from "@/Components/SearchButton";
import Image from "next/image";
import Man from "../Images/how-different.png";
import lady from "../Images/banner.png";
import Link from "next/link";
import { Footer } from "@/Components/ui/Footer";
import {
  CheckCircleIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Navbar from "@/Components/Navbar";
import JobListings from "@/Components/Joblisting";
import Head from "next/head";

export function EmployersCandidates() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex justify-center items-center bg-blue-200 py-10"
    >
      <div className="flex flex-row gap-6 items-center justify-center p-6 rounded-2xl shadow-lg ">
        {/* For Employers */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="bg-orange-100 rounded-xl p-6 flex flex-col items-center text-center w-[30%]  shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 auth-role">
            For Employers
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Find professionals from around the world across all skills.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 transition-all"
          >
            Sign in as a Recruiter
          </motion.button>
        </motion.div>

        {/* For Candidates */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="bg-green-100 rounded-xl p-6 flex flex-col items-center text-center w-[30%] shadow-md"
        >
          {/* <Image src={img} className="min-w-full h-full mb-3" alt="img" /> */}
          {/* <video className="w-screen" autoPlay muted loop>
            <source src="/videos/vid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}

          <h3 className="text-lg font-semibold text-gray-800">
            For Candidates
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Build your professional profile, find new job opportunities.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-3 bg-green-600 text-white px-4 py-2 text-sm rounded-md hover:bg-green-700 transition-all"
          >
            <Link href="/login">Sign in as a Jobseeker</Link>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Whydevhire() {
  return (
    <div className="flex justify-center items-center min-h-screen  mt-8">
      <div className="text-center  px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Why Dev <span className="text-red-500"> Hire ? </span>
        </h2>
        {/* <div className="w-16 h-1 bg-red-500 mx-auto "></div> */}

        <div className=" flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Left Side - Features */}
          <div className="md:w-1/2 text-left space-y-6 bg-gray-50  shadow-lg  py-10 px-9">
            <div className="flex items-start space-x-3 space-y-8">
              <CheckCircleIcon className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">
                  Higher Quality Listings
                </h3>
                <p className="text-gray-700 text-sm">
                  Only verified job posts. No scams, no ads—just real
                  opportunities.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-y-8">
              <CheckCircleIcon className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">
                  Unlimited Job Search Resources
                </h3>
                <p className="text-gray-700 text-sm">
                  Get access to job listings, career resources, and webinars to
                  boost your career.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-y-8">
              <CheckCircleIcon className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="font-semibold text-lg">Save Time</h3>
                <p className="text-gray-700 text-sm">
                  Apply directly to jobs without jumping between job boards.
                </p>
              </div>
            </div>

            {/* Get Started Button */}
            <div className="mt-6">
              <button className="bg-red-600 text-white w-full px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition justify-center items-center self-center">
                Get Started
              </button>
            </div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className=" flex justify-center"
          >
            <Image
              src={Man}
              width={500}
              height={400}
              alt="Job seeker"
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Roles() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-12 px-6">
      {/* Left Side - Text & Image */}
      <div className="text-center lg:text-left max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-gray-900">
            Find Your <span className="text-red-500">Dream Job</span> or
            <span className="text-blue-500">Hire the Best Talent</span>
          </h2>
          <p className="text-gray-600 mt-3">
            DevHire makes it easy to connect job seekers with top employers.
            Sign up today and take your career or business to the next level.
          </p>
        </motion.div>
        {/* <div className="mt-6 flex justify-center lg:justify-start">
          <Image
            src={jobImage}
            width={400}
            height={300}
            alt="Job seeker working"
            className="rounded-lg shadow-lg"
          />
        </div> */}
      </div>

      {/* Right Side - Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          {
            title: "Sign Up as a Jobseeker",
            description: "Discover top job opportunities tailored for you.",
            buttonText: "Sign up",
            icon: <UserIcon className="h-8 w-8 text-blue-600" />,
            bgColor: "bg-blue-500",
            link: "/Signup",
            value: 1,
          },
          {
            title: "Sign Up as an Employer",
            description: "Find skilled professionals for your company.",
            buttonText: "Sign up",
            icon: <BriefcaseIcon className="h-8 w-8 text-red-600" />,
            bgColor: "bg-red-500",
            link: "/Employersignup",
          },
        ].map((role, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <div className="bg-white shadow-xl rounded-xl p-6 w-80 text-center border border-gray-200 hover:shadow-2xl transition">
              <div className="flex justify-center">{role.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mt-2">
                {role.title}
              </h3>
              <p className="text-gray-500 mt-2">{role.description}</p>
              <button
                className={`${role.bgColor} text-white px-5 py-2 rounded-lg mt-4 hover:scale-105 transition-transform`}
              >
                <Link href={`${role.link}`}> {role.buttonText}</Link>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        {/* Page-level metadata */}
        <meta
          name="description"
          content="This is the description of my video page."
        />
        <meta name="keywords" content="video, web development, coding" />
        <meta name="author" content="John Doe" />
        <meta property="og:title" content="My Custom Video Page Title" />
        <meta
          property="og:description"
          content="Detailed description for the video page."
        />
        <meta property="og:image" content="/images/video-thumbnail.jpg" />
        <meta property="og:url" content="https://example.com/video-page" />
        <meta property="og:type" content="website" />
        {/* Other metadata */}
        <title>My Video Page Title</title>
      </Head>
      <Navbar />

      {/* <video controls className="w-screen">
        <source src="/videos/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex items-center justify-center px-8 my-4"
      >
        <div className="grid grid-cols-1   md:grid-cols-2 items-center text-center md:text-left gap-10 ">
          {/* Left Section: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center md:items-start"
          >
            <div style={{ fontFamily: "var(--font-primary)", fontWeight: 700 }}>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl md:text-6xl"
              >
                Job Seeking made
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                // animate={{ opacity: 1, y: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl md:text-4xl py-2 text-gray-700"
              >
                Easy..........
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              // animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-md mt-4 text-gray-600 text-lg"
            >
              The #1 Job Site to Find Remote Jobs. No Ads, Scams, or Junk Find
              your next flexible, hybrid, or work from home job.
            </motion.p>

            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="max-w-md mt-2 text-gray-600"
            >
            
            </motion.p> */}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-5"
            >
              <SearchButton />
            </motion.div>
          </motion.div>

          {/* Right Section: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            // animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex justify-center "
          >
            <Image
              src={lady}
              width={600}
              height={800}
              alt="Job seeker"
              className="rounded-lg"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Employers & Candidates Section */}
      {/* <EmployersCandidates /> */}

      {/* Job Listings Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <JobListings />
        {/*  */}

        <div className="text-center mt-8 ">
          <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold">
            Find Your Desired Job With Ease
          </div>
          <Roles />
        </div>
      </motion.div>

      {/*  */}

      <Footer />
    </>
  );
}
