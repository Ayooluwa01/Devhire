"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import { RootState } from "@/Redux/store";
import { logout, removeToken } from "@/Redux/Tokenslice";
import axios from "axios";
import { Home, Briefcase, FileText, Star, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export function SeekerSidebar() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      document.cookie = "next-auth.session-token=; max-age=0; path=/";
      document.cookie = "role=; max-age=0; path=/";
      await signOut({ redirect: false });
      await axios.post(
        "http://localhost:9000/logout",
        {},
        { withCredentials: true }
      );

      router.push("/login");
      window.location.reload();
      dispatch(logout());
      dispatch(removeToken());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const items = [
    {
      name: "Your Profile",
      link: `/Dashboard/userdetails/${userProfile?.id || "id"}`,
      icon: <Home className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Your Settings",
      link: "/Dashboard/settings",
      icon: <Briefcase className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Saved Jobs",
      link: "/Dashboard/Jobs/saved-jobs",
      icon: <FileText className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Applied Jobs",
      link: "/Dashboard/applied-jobs",
      icon: <Star className="w-5 h-5 inline mr-2" />,
    },
  ];

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <SidebarTrigger className="absolute left-1/2 top-4 transform -translate-x-1/2 flex items-center justify-center md:hidden p-2 bg-white rounded-md shadow-md">
              <Menu className="w-6 h-6" />
            </SidebarTrigger>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-24 flex-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className="py-7 px-4 rounded-lg hover:bg-gray-200 text-gray-700 font-medium flex items-center"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
