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
import Search from "./Search";



export default function AppSidebar() {
  const notes = useNoteStore((state) => state.notes);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const restoreNote = useNoteStore((state) => state.restoreNote);
  const togglePinNote = useNoteStore((state) => state.togglePinNote);

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [isShowingTrash, setIsShowingTrash] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeNodes = notes.filter((note) => {
    // 検索はゴミ箱を見ているときは削除済みから検索、そうじゃないときは通常から検索
    if (searchQuery) {
      return isShowingTrash ?
        note.deletedAt !== '' && note.content.toLowerCase().includes(searchQuery.toLowerCase()) :
        note.deletedAt === '' && note.content.toLowerCase().includes(searchQuery.toLowerCase())
    } else {
      return isShowingTrash ? note.deletedAt !== '' : note.deletedAt === ''
    }
  });

  const pathname = usePathname();

  const normalizePath = (path: string) =>
    path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  const currentPath = normalizePath(pathname);

  function handleDeleteNote(id: string) {
    deleteNote(id);
  }

  function handleTogglePinNote(id: string) {
    togglePinNote(id);
  }

  function handleRestoreNote(id: string) {
    restoreNote(id);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
  }

  return (
    <Sidebar className="top-8">
      <SidebarHeader />
      <SidebarContent>
        <IconArea isShowingTrash={isShowingTrash} setIsShowingTrash={setIsShowingTrash} />
        <Search handleSearch={handleSearch} />
        <SidebarGroupLabel>{isShowingTrash ? 'Trash' : 'Note List'} {searchQuery ? ` + Search` : ""}</SidebarGroupLabel>
        <SidebarMenu>
          {activeNodes.length === 0 && (
            <SidebarMenuItem>
              <span className="text-sm p-2">ノートがありません</span>
            </SidebarMenuItem>
          )}
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
                {(note.isPinned || hoverId === note.id) && (
                  <SidebarMenuAction
                    className="top-5!"
                    onClick={() => handleTogglePinNote(note.id)}
                  >
                    <Pin stroke={note.isPinned ? '#cc0000' : 'currentColor'} /> <span className="sr-only">Add Pin</span>
                  </SidebarMenuAction>
                )}
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
                        className="right-8 top-5!"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 /> <span className="sr-only">Delete Note</span>
                      </SidebarMenuAction>
                    )}

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
