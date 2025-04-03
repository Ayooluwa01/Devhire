import { RootState } from "@/Redux/store";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { useSelector } from "react-redux";

interface Experience {
  company: string;
  role: string;
  duration: string;
}

export default function WorkExperienceCard() {
  const userBio = useSelector((state: RootState) => state.Token.userprofile);
  let experiences;
  if (userBio.experience) {
    try {
      // Only parse if experience is a non-empty string
      experiences = JSON.parse(userBio.experience);
    } catch (error) {
      console.error("Error parsing experience data:", error);
      // Optionally handle the error (set experiences to an empty array or null)
      experiences = [];
    }
  }

  return (
    <div className="py-4">
      {experiences ? (
        <ul className="mt-2 space-y-2">
          {experiences.map(
            (
              exp: {
                company:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                role:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
                duration:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              },
              index: Key | null | undefined
            ) => (
              <li
                key={index}
                className="p-3 border border-gray-300 rounded-lg shadow-md bg-white"
              >
                <p className="text-lg font-semibold">{exp.company}</p>
                <p className="text-gray-600">{exp.role}</p>
                <p className="text-gray-400">{exp.duration}</p>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-gray-500">No work experience available</p>
      )}
    </div>
  );
}
