import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { get, set as setIDB, del } from "idb-keyval";

// IndexedDBを使ったカスタムストレージ
const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await setIDB(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isPinned: boolean;
}

interface NoteStore {
  notes: Note[];
  addNote: () => string;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  restoreNote: (id: string) => void;
  togglePinNote: (id: string) => void;
  isShowingTrash: boolean;
  setIsShowingTrash: (val: boolean | ((prevState: boolean) => boolean)) => void;
}

const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      isShowingTrash: false,
      setIsShowingTrash: (val) =>
        set((state) => ({
          isShowingTrash:
            typeof val === "function" ? val(state.isShowingTrash) : val,
        })),
      addNote: () => {
        const note: Note = {
          id: uuidv4(),
          content: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: "",
          isPinned: false,
        };

        set((state) => ({
          notes: [...state.notes, note],
        }));

        return note.id;
      },
      updateNote: (id: string, content: string) => {
        set((state) => ({
          notes: state.notes.map((note) => {
            // idが一致するノートを更新
            if (note.id === id) {
              return {
                ...note,
                content: content,
                updatedAt: new Date().toISOString(),
              };
            }
            // idが違う場合はそのまま返す
            return note;
          }),
        }));
      },
      deleteNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) => {
            // idが一致するノートを削除
            if (note.id === id) {
              return {
                ...note,
                deletedAt: new Date().toISOString(),
              };
            }
            // idが違う場合はそのまま返す
            return note;
          }),
        }));
      },
      restoreNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) => {
            // idが一致するノートを復元
            if (note.id === id) {
              return {
                ...note,
                deletedAt: "",
              };
            }
            // idが違う場合はそのまま返す
            return note;
          }),
        }));
      },
      togglePinNote: (id: string) => {
        set((state) => ({
          notes: state.notes.map((note) => {
            // idが一致するノートをピン留め
            if (note.id === id) {
              return {
                ...note,
                isPinned: !note.isPinned,
              };
            }
            // idが違う場合はそのまま返す
            return note;
          }),
        }));
      },
    }),
    {
      name: "note-storage", // IndexedDBのキー名
      storage: createJSONStorage(() => storage),
    },
  ),
);

export default useNoteStore;
