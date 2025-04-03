import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import {
  FaceSmileIcon,
  ChatBubbleLeftIcon,
  CodeBracketSquareIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <>
      <div className=" mt-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31710.56814055282!2d3.211662697524201!3d6.544271630700665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s23%20Alhaji%20Kazeem%20Street%2C%20Lagos!5e0!3m2!1sen!2sng!4v1742972815218!5m2!1sen!2sng"
          className="w-full"
          loading="lazy"
        ></iframe>
      </div>
      <footer className="bg-gray-600 text-white py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
            {/* Company Info */}
            <div>
              <h2 className="text-2xl font-bold">DevHire</h2>
              <p className="text-gray-300 mt-2">
                Connecting developers with the best job opportunities.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold">Contact Us</h3>
              <ul className="mt-3 space-y-2 text-gray-300">
                <li className="flex items-center justify-center md:justify-start">
                  <EnvelopeIcon className="h-5 w-5 text-red-500 mr-2" />
                  <a
                    href="mailto:olusegunstephen222@gmail.com"
                    className="hover:text-red-400"
                  >
                    olusegunstephen222@gmail.com
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <PhoneIcon className="h-5 w-5 text-red-500 mr-2" />
                  <a href="tel:+2347040552466" className="hover:text-red-400">
                    07040552466
                  </a>
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <MapPinIcon className="h-5 w-5 text-red-500 mr-2" />
                  <span>23, Alhaji Kazeem Street, Igando, Lagos</span>
                </li>
              </ul>
            </div>

            {/* Sign-in Section */}
            <div>
              <h3 className="text-lg font-semibold">Sign In</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#" className="hover:text-red-400">
                    As Employer
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-red-400">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/Signup" className="hover:text-red-400">
                    Signup
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media (Using Heroicons) */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex justify-center md:justify-start mt-3 space-x-4">
                <a href="#" className="hover:text-red-400">
                  <FaceSmileIcon className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-red-400">
                  <ChatBubbleLeftIcon className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-red-400">
                  <CodeBracketSquareIcon className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-red-400">
                  <BriefcaseIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center border-t border-gray-600 mt-8 pt-6 text-gray-400 text-sm">
            © {new Date().getFullYear()} DevHire. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
