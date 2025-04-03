"use client";
import { usePathname } from "next/navigation";
import DashboardNavbar from "@/Components/Dashboardnav";
import { Poppins, Karla } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/Components/ui/Footer";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { AppSidebar } from "@/Components/app-sidebar";
import { useState } from "react";

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

export default function DashboardLayout({
  children,
  Homepage,
  Rightnav,
  Sidenav,
}: {
  children: React.ReactNode;
  Homepage: React.ReactNode;
  Rightnav: React.ReactNode;
  Sidenav: React.ReactNode;
  joblistings: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ Get current route

  // Show joblistings only on `/Dashboard/jobdetails/`
  const showJobListing = pathname.startsWith("/Dashboard/jobdetails/");

  // Routes where nothing should be displayed in the sidebar
  const hideSidebar =
    pathname === "/Dashboard/profile" ||
    pathname.startsWith("/Dashboard/userdetails/") ||
    pathname === "/Dashboard/Jobs/saved-jobs";

  // Show Filters for all other `/Dashboard` pages
  const showFilters =
    pathname.startsWith("/Dashboard") && !showJobListing && !hideSidebar;
  const [isvisible, setVisible] = useState(true);

  const visible = () => {
    setVisible(!isvisible);
  };
  return (
    <SessionProvider>
      <div className={`${poppins.variable} ${karla.variable}`}>
        <DashboardNavbar />

        <div className="flex flex-col md:flex-row h-screen">
          {/* Sidebar - Profile (Hidden on small screens) */}
          <SidebarProvider className="md:hidden absolute ">
            <AppSidebar />

            <SidebarTrigger
              className="md:hidden absolute right-0 top-0 z-40"
              onClick={visible}
            />
          </SidebarProvider>
          <aside className="hidden md:block bg-white p-4 shadow relative h-screen md:w-1/4">
            {Sidenav}
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 flex flex-col h-screen">
            <div className="mb-4">{children}</div>

            <div className="grid grid-cols-1 md:grid-cols-3 flex-1 overflow-hidden">
              {/* Jobs Section - Adjust width dynamically */}
              <section
                className={`overflow-y-scroll h-full scrollbar-none ${
                  hideSidebar ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                {Homepage}
              </section>

              {/* Sidebar Logic - Visible only on larger screens */}
              <aside className="hidden md:block md:col-span-1 h-full overflow-auto">
                {/* {showJobListing ? joblistings : showFilters ? Filters : null} */}
                {Rightnav}
              </aside>
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
