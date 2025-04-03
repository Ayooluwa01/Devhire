import { motion } from "framer-motion";

export default function JobListings() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 5, ease: "easeOut" }}
    >
      <section className="max-w-6xl mx-auto px-6 py-10 relative remote">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Featuring <span className="text-red-600 underline">100k+</span>
            Remote & Flexible Jobs
          </h2>
        </div>

        {/* Job Listings */}
        <div className="relative mt-8 ">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            ◀
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Director, Product Marketing",
                location: "US National",
                remoteType: "100% Remote Work",
                jobType: "Full-Time",
              },
              {
                title: "Chemist IV",
                location: "Milton, WI",
                remoteType: "Option for Remote Work",
                jobType: "Full-Time",
              },
              {
                title: "Global Product Line Director",
                location: "US National",
                remoteType: "100% Remote Work",
                jobType: "Full-Time",
              },
              {
                title: "Accounts Payable Supervisor",
                location: "El Segundo, CA",
                remoteType: "Hybrid Remote Work",
                jobType: "Full-Time",
              },
              {
                title: "Senior Category Manager - Commodity Lumber",
                location: "US National",
                remoteType: "100% Remote Work",
                jobType: "Full-Time",
              },
              {
                title: "Assistant Accountant",
                location: "Clayton, MO",
                remoteType: "Hybrid Remote Work",
                jobType: "Full-Time",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 text-center transition duration-300"
              >
                <p className="text-gray-500 text-sm">
                  Today <span className="text-red-500 font-bold">New!</span>
                </p>
                <h3 className="text-lg font-bold text-gray-900 mt-2">
                  {job.title}
                </h3>
                <div className="mt-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {job.remoteType}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm ml-2">
                    {job.jobType}
                  </span>
                </div>
                <p className="text-gray-600 mt-3">📍 {job.location}</p>
              </div>
            ))}
          </div>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full">
            ▶
          </button>
        </div>
      </section>
    </motion.div>
  );
}
