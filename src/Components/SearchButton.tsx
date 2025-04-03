import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchButton() {
  return (
    <button className="flex items-center gap-2 px-5 py-2 bg-blue-950 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300">
      <MagnifyingGlassIcon className="w-5 h-5" />
      <span className="font-medium">Search For a Job</span>
    </button>
  );
}
