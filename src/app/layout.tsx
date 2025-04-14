// This line must come FIRST
"use client";

// import { metadata } from "./metadata"; // ✅ You can still export it here
// export { metadata }; // Re-export so Next.js can find it

import { Provider } from "react-redux";
import { store, persistor } from "../Redux/store";
import { Poppins, Karla } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { PersistGate } from "redux-persist/integration/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
