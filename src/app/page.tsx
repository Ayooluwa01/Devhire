// src/app/metadata.ts
import { Metadata } from "next";
import Homepage from "./Mainpage/page"; // Ensure the correct path

export const metadata: Metadata = {
  title: "Devhire",
  description:
    "Devhire was created by a passionate individual with years of experience in the tech industry. With a vision to bridge the gap between talented tech professionals and forward-thinking companies, Devhire simplifies the recruitment process. The platform leverages intelligent matching to connect developers with the right opportunities and helps companies discover the best talent. Whether you're a developer seeking your next challenge or a company in need of skilled professionals, Devhire makes recruitment faster, smarter, and more effective. It is designed to create lasting, meaningful connections in the tech world, revolutionizing how we hire and get hired.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
  },
  // Open Graph metadata
  openGraph: {
    title: "Devhire 🚀 - Finding Talents 🌟",
    description:
      "Devhire is more than just a job platform. We connect developers with meaningful opportunities and help companies find the right talent through smart matching and a seamless user experience.",
    // url: "https://www.devhire.com", // Replace with your actual URL
    siteName: "Devhire",
    images: [
      {
        url: "https://www.imghippo.com/i/sED3011Iw.png", // Replace with your OG image path
        width: 1200,
        height: 630,
        alt: "Devhire Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return (
    <div>
      <Homepage />
    </div>
  );
}
