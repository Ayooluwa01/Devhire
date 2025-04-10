"use client";

import { Profilepicture } from "@/app/Dashboard/@profile/default";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import socket from "@/lib/socket";
import { RootState } from "@/Redux/store";
import { logout, removeToken } from "@/Redux/Tokenslice";
import axios from "axios";
import { Home, Briefcase, FileText, Star, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function AppSidebar() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  let userpics = useSelector((state: RootState) => state.Token.userprofile);
  const dispatch = useDispatch();
  const router = useRouter();

  const [profile, setProfile] = useState(userpics.Profilepicture);
  useEffect(() => {
    socket.on("ppics", (ppics) => {
      setProfile(ppics);
    });

    // socket.on("Profile", (data) => {
    //   dispatch(storeprofile(data));
    // });

    return () => {
      socket.off("ppics");
      socket.off("Profile");
    };
  }, [socket, dispatch, userProfile.user_id]);

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
      name: "Dashboard",
      link: "/Recruiterboard",
      icon: <Home className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Jobs",
      link: "/Recruiterboard/Alljobs",
      icon: <Briefcase className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Applications",
      link: "/Recruiterboard/Applicants",
      icon: <FileText className="w-5 h-5 inline mr-2" />,
    },
    {
      name: "Saved Talents",
      link: "/Dashboard/applied-jobs",
      icon: <Star className="w-5 h-5 inline mr-2" />,
    },
  ];

  return (
    <Sidebar className="relative">
      <SidebarContent>
        {/*  */}

        <SidebarGroup>
          <SidebarGroupContent>
            <div className="text-center">
              <img
                src={profile}
                alt="User"
                className="w-20 h-20 rounded-full mx-auto shadow-md"
              />

              <Profilepicture userid={userProfile.user_id} />
              <h2 className="text-xl font-semibold mt-4">
                {userProfile?.name || "User Name"}
              </h2>
              <p className="text-gray-500 text-sm">
                {userProfile?.email || "user@email.com"}
              </p>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/*  */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-0 flex-1 text-center">
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
        {/*  */}
        <SidebarHeader className="flex flex-row items-center justify-center">
          <SidebarTrigger className=" left-1/2 top-4 transform flex items-center justify-center md:hidden p-2 bg-white rounded-md shadow-md"></SidebarTrigger>
        </SidebarHeader>
      </SidebarContent>
    </Sidebar>
  );
}
