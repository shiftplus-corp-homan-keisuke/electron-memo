import {create} from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  isPinned: boolean;
}

interface NoteStore {
  notes: Note [];
  addNote: () => string;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
}


const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  addNote: () => {
    const note: Note = {
        id: uuidv4(),
        content: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: '',
        isPinned: false,
    }

    set((state) => ({
        notes: [
            ...state.notes,
            note,
        ],
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
                }
            }
            // idが違う場合はそのまま返す
            return note; 
        })
    }))

  },    
　deleteNote: (id: string) => { 
    set((state) => ({
        notes: state.notes.map((note) => {
            // idが一致するノートを削除
            if (note.id === id) {
                return {
                    ...note,
                    deletedAt: new Date().toISOString(), 
                }
            }
            // idが違う場合はそのまま返す
            return note; 
        })
    }))
},
}));

export default useNoteStore;