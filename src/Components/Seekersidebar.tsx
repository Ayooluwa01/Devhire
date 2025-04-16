"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import socket from "@/lib/socket";
import { RootState } from "@/Redux/store";
// import { logout, removeToken } from "@/Redux/Tokenslice";
import { Home, Briefcase, FileText, Star } from "lucide-react";
// import { signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USerProfilepicture } from "./Userprofile/userprofilepicture";

export function SeekerSidebar() {
  const userProfile = useSelector((state: RootState) => state.Token.userbio);
  let userpics = useSelector((state: RootState) => state.Token.userprofile);
  const dispatch = useDispatch();
  // const router = useRouter();

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
  }, [socket, dispatch, userProfile?.user_id]);

  // const handleLogout = async () => {
  //   try {
  //     document.cookie = "next-auth.session-token=; max-age=0; path=/";
  //     document.cookie = "role=; max-age=0; path=/";
  //     await signOut({ redirect: false });
  //     await axios.post(
  //       "https://devhire-backend.onrender.com/logout",
  //       {},
  //       { withCredentials: true }
  //     );

  //     router.push("/login");
  //     dispatch(logout());
  //     dispatch(removeToken());
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

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
      link: "/Dashboard/Jobs/applied-jobs",
      icon: <Star className="w-5 h-5 inline mr-2" />,
    },
  ];

  return (
    <Sidebar variant="floating">
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

              <USerProfilepicture userid={userProfile?.user_id} />
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
