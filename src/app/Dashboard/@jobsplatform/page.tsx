"use client";
import JobCard from "@/Components/JobCard";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import socket from "@/lib/socket";
import { showError, storeprofile } from "@/Redux/Tokenslice";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  level: string;
  imglink: string;
}

export default function JobListings() {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const userprofile = useSelector((state: RootState) => state.Token.userbio);
  useEffect(() => {
    if (socket) {
      // Emit event to get all jobs when there is no query
      if (!query) {
        socket.emit("alljobs");
      }

      // Listen for events once the socket is available
      socket.on("all jobs", (jobs) => {
        setJobs(jobs);
        setError(""); // Clear error when jobs are found
      });
      socket.emit("Getprofile", userprofile.user_id);

      socket.on("Profile", (data) => {
        dispatch(storeprofile(data));
      });
      socket.on("ProfileError", (error) => {
        // Handle the error (e.g., show an error message to the user)
        console.error(error.message);
        // Optionally, you can dispatch an action to show an error message
        dispatch(showError(error.message));
      });
      socket.on("newJobPosted", (jobs) => {
        setJobs((prevJobs) => [...prevJobs, jobs.job]);
      });

      socket.on("searchResults", (jobs) => {
        setJobs(jobs);
        setError(""); // Clear error on successful search
      });

      socket.on("searchError", (err) => {
        setError(err);
        setJobs([]); // Clear jobs if an error occurs
      });

      // Cleanup on component unmount or socket disconnection
      return () => {
        socket.off("all jobs");
        socket.off("searchResults");
        socket.off("searchError");
        socket.off("newJobPosted");
        socket.off("Getprofile");
      };
    }
  }, [socket, query]); // Listen for socket and query changes

  const search = () => {
    if (query.trim()) {
      socket.emit("Search", query);
    } else {
      socket.emit("alljobs");
    }
  };

  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        effect={"fade"}
        autoplay={{ delay: 3500, disableOnInteraction: true }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
      >
        {/* Search card */}
        <SwiperSlide>
          <div className="p-6 sticky">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold">Find your dream job here!</h1>
              <p className="mt-2 text-sm">
                Looking for jobs? Browse our latest job openings to view & apply
                to the best jobs today!
              </p>

              <div className="mt-4">
                {/* Search input */}
                <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-full max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Search job..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-3 py-2 border-none outline-none text-black"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/*  */}
        <SwiperSlide>
          <div className="p-6 sticky">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
              <h1 className="text-2xl font-bold">{userprofile.name}</h1>
              <p className="mt-2 text-sm">
                Looking for jobs? Browse our latest job openings to view & apply
                to the best jobs today!
              </p>

              <div className="mt-4">
                {/* Search input */}
                <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-full max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Search job..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-3 py-2 border-none outline-none text-black"
                  />
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
                    onClick={search}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      ;{/* Show error only when no jobs are available */}
      {jobs.length === 0 && error && (
        <p className="text-center text-red-500 py-4">{error}</p>
      )}
      {/* Job Listings */}
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job.id} job={job} />)
      ) : (
        <p className="text-center text-xl py-8">No jobs found</p>
      )}
    </div>
  );
}
