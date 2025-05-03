"use client";
import { usePathname } from "next/navigation";
import DashboardNavbar from "@/Components/Dashboardnav";
import { Poppins, Karla } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { SeekerSidebar } from "@/Components/Seekersidebar";

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
  Filters,
  jobsplatform,
  profile,
  joblistings,
}: {
  children: React.ReactNode;
  Filters: React.ReactNode;
  jobsplatform: React.ReactNode;
  profile: React.ReactNode;
  joblistings: React.ReactNode;
}) {
  const pathname = usePathname();

  const showJobListing = pathname.startsWith("/Dashboard/jobdetails/");
  const hideSidebar =
    pathname === "/Dashboard/profile" ||
    pathname.startsWith("/Dashboard/userdetails/") ||
    pathname === "/Dashboard/Jobs/saved-jobs" ||
    pathname === "/Dashboard/Jobs/applied-jobs" ||
    pathname === "/Dashboard/jobdetails" ||
    pathname.startsWith("/Dashboard/chatpage");

  const showFilters =
    pathname.startsWith("/Dashboard") && !showJobListing && !hideSidebar;

  return (
    <SessionProvider>
      <div className={`${poppins.variable} ${karla.variable}`}>
        <DashboardNavbar />
        <SidebarProvider className="md:hidden absolute">
          <SeekerSidebar />
          <SidebarTrigger className="md:hidden absolute right-0 top-0 " />
        </SidebarProvider>

        <div className="flex flex-col md:flex-row min-h-screen">
          <aside className="hidden md:block bg-white p-4 shadow relative md:w-1/4">
            {profile}
          </aside>

          <main className="flex-1 p-6 flex flex-col h-screen pt-16">
            <div className="mb-4">{children}</div>

            <div className="grid grid-cols-1 md:grid-cols-3 flex-1">
              <section
                className={`overflow-y-scroll h-full scrollbar-none ${
                  hideSidebar ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                {jobsplatform}
              </section>

              {!hideSidebar && (
                <aside className="hidden md:block md:col-span-1 overflow-auto">
                  {showJobListing ? joblistings : showFilters ? Filters : null}
                </aside>
              )}
            </div>
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
