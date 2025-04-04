import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import socket from "@/lib/socket";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    socket.emit("Search", searchTerm as any);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-2 bg-blue-950 text-white rounded-full shadow-lg border border-gray-300"
    >
      <input
        type="text"
        placeholder="Search for a job"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 w-full outline-none rounded-full"
      />
      <button
        type="submit"
        className="p-2 bg-white text-white rounded-full hover:bg-blue-700  cursor-pointer   transition-all duration-300"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-blue-800" />
      </button>
    </form>
  );
}
