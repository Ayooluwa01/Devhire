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
import { Home, Briefcase, FileText, Star, Menu } from "lucide-react";

// Sidebar menu items.
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

export function AppSidebar() {
  return (
    <Sidebar variant="floating">
      {/* Sidebar Trigger - Replaced with Menu Icon */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <SidebarTrigger className="absolute left-1/2 top-4 transform -translate-x-1/2 flex items-center justify-center md:hidden p-2 bg-white rounded-md shadow-md" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-24 flex-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.link}
                      className="py-7 px-4 rounded-lg hover:bg-gray-200 text-gray-700 font-medium flex items-center "
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
