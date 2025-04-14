import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Devhire",
  description:
    "Devhire is a powerful job platform designed to connect tech talent with top companies. Whether you're hiring developers or looking for your next remote or on-site opportunity, Devhire streamlines the recruitment process with intelligent matching and a seamless experience.",
  icons: {
    icon: "/logo.png", // Place this in your /public folder
    shortcut: "/logo.png",
    // apple: "/apple-touch-icon.png", // Optional for Apple devices
    // other: {
    //   rel: "mask-icon",
    //   url: "/safari-pinned-tab.svg",
    //   color: "#5bbad5",
    // },
  },
};
("use client");
import { Provider } from "react-redux";
import { store, persistor } from "../Redux/store";
import { Poppins, Karla } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { PersistGate } from "redux-persist/integration/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Choose the weights you need
  variable: "--font-poppins",
});

const karla = Karla({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-karla",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${karla.variable}`}>
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider>{children}</SessionProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
