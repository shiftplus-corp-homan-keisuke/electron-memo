import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import IconArea from "./IconArea";

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <IconArea />
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}
