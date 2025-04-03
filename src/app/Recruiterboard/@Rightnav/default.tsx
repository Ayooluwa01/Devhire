import React from "react";
import { Bell, MessageCircle, PhoneCall } from "lucide-react";

const applicants = [
  { name: "Rebecca H Haubrich", role: "Product Designer", img: "" },
  { name: "Juliana Yeterian", role: "Full Stack Developer", img: "" },
  { name: "Golf Manor", role: "Team Lead", img: "" },
  { name: "Lake Preston", role: "AngularJS Developer", img: "" },
  { name: "Teresita Ramos", role: "UI Designer", img: "" },
  { name: "Augustine S Jakes", role: "Frontend Developer", img: "" },
  { name: "Claude B Robinson", role: "Product Designer", img: "" },
  { name: "Robert S Luevano", role: "UX Designer", img: "" },
];

export default function DefaultApplicantsList() {
  return (
    <div className="flex bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto relative">
      {/* Left Section: Applicants List */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700">New Applicants</h2>
        <p className="text-gray-500 text-sm">Today</p>
        <div className="mt-4 space-y-4">
          {applicants.map((applicant, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-2 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={applicant.img || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{applicant.name}</p>
                <p className="text-sm text-gray-500">
                  Applied for {applicant.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Actions (Fixed to Right Side) */}
      <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md overflow-hidden fixed right-16 top-1/2 transform -translate-y-1/2">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mb-3">
          <MessageCircle className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mb-3">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <PhoneCall className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
