"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import IconArea from "./IconArea";
import { ArchiveRestore, Pin, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useNoteStore from "@/stores/useNoteStore";
import { formatDate } from "@/utils/utils";



export default function AppSidebar() {
  const notes = useNoteStore((state) => state.notes);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const restoreNote = useNoteStore((state) => state.restoreNote);

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isShowingTrash, setIsShowingTrash] = useState(false);

  const activeNodes = notes.filter((note) => isShowingTrash ? note.deletedAt !== '' : note.deletedAt === '');

  const pathname = usePathname();

  const normalizePath = (path: string) =>
    path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const currentPath = normalizePath(pathname);

  function handleDeleteNote(id: string) {
    deleteNote(id);
  }

  function handleTogglePinNote(id: string) {
    console.log("toggle pin note with id:", id);
  }

  function handleRestoreNote(id: string) {
    restoreNote(id);
  }

  return (
    <Sidebar className="top-8">
      <SidebarHeader />
      <SidebarContent>
        <IconArea setIsShowingTrash={setIsShowingTrash} />
        <SidebarGroupLabel>{isShowingTrash ? 'Trash' : 'Note List'}</SidebarGroupLabel>
        <SidebarMenu>
          {activeNodes.map((note) => {
            const noteHref = `/detail/${note.id}`;
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
                      <span className="text-lg">{note.content.substring(0, 10) || 'タイトルなし'}</span>
                      <span
                        className={
                          isActive
                            ? "text-xs text-sidebar-accent-foreground/80"
                            : "text-xs text-muted-foreground"
                        }
                      >
                        {formatDate(note.updatedAt)}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
                {hoverId === note.id && (
                  <>
                    {isShowingTrash ? (
                      <SidebarMenuAction
                        className="top-5!"
                        onClick={() => handleRestoreNote(note.id)}
                      >
                        <ArchiveRestore /> <span className="sr-only">Restore Note</span>

                      </SidebarMenuAction>
                    ) : (
                      <SidebarMenuAction
                        className="top-5!"
                        onClick={() => handleTogglePinNote(note.id)}
                      >
                        <Trash2 /> <span className="sr-only">Delete Note</span>
                      </SidebarMenuAction>
                    )}
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
