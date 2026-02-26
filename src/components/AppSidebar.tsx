"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import IconArea from "./IconArea";
import { Pin, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const notes = [
  {
    id: "id01",
    content: "note01",
    isPined: true,
    updatedAt: "2025-01-01 12:00:00",
  },
  {
    id: "id02",
    content: "note02",
    isPined: true,
    updatedAt: "2025-01-02 12:00:00",
  },
];

export default function AppSidebar() {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const pathname = usePathname();

  const normalizePath = (path: string) =>
    path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const currentPath = normalizePath(pathname);

  function handleDeleteNote(id: string) {
    console.log("delete note with id:", id);
  }

  function handleTogglePinNote(id: string) {
    console.log("toggle pin note with id:", id);
  }

  return (
    <Sidebar className="top-8">
      <SidebarHeader />
      <SidebarContent>
        <IconArea />
        <SidebarGroupLabel>Note List</SidebarGroupLabel>
        <SidebarMenu>
          {notes.map((note) => {
            const noteHref = `/notes/${note.id}`;
            const isActive = currentPath === normalizePath(noteHref);

            return (
              <SidebarMenuItem
                key={note.id}
                className="group/menu-item"
                onMouseEnter={() => setHoverId(note.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="h-14 group-hover/menu-item:bg-sidebar-accent group-hover/menu-item:text-sidebar-accent-foreground"
                >
                  <Link href={noteHref} className="w-full h-full">
                    <div className="flex flex-col gap-0">
                      <span className="text-lg">{note.content}</span>
                      <span
                        className={
                          isActive
                            ? "text-xs text-sidebar-accent-foreground/80"
                            : "text-xs text-muted-foreground"
                        }
                      >
                        {note.updatedAt}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
                {hoverId === note.id && (
                  <>
                    <SidebarMenuAction
                      className="top-5!"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 /> <span className="sr-only">Delete Note</span>
                    </SidebarMenuAction>
                    <SidebarMenuAction
                      className="right-8 top-5!"
                      onClick={() => handleTogglePinNote(note.id)}
                    >
                      <Pin /> <span className="sr-only">Add Pin</span>
                    </SidebarMenuAction>
                  </>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
