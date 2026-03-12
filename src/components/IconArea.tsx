'use client'

import { Button } from './ui/button'
import { Trash2, Settings, Plus, NotebookIcon } from 'lucide-react'
import useNoteStore from '../stores/useNoteStore' // useNoteStoreをインポートする
import { useRouter } from 'next/navigation'

interface IconAreaProps {
    isShowingTrash: boolean;
    setIsShowingTrash: (setIsShowingTrash: (state: boolean) => boolean) => void;
}

export default function IconArea({ isShowingTrash, setIsShowingTrash }: IconAreaProps) {
    const addNote = useNoteStore((state) => state.addNote);
    const router = useRouter();


    function handleToggleDelete() {
        setIsShowingTrash((state) => !state);
    }

    function handleAddNote() {
        const newNoteId = addNote();
        router.push(`/detail/${newNoteId}`);
    }

    return (
        <div className="flex gap-2">
            <Button size="icon-sm" aria-label="Delete" variant="ghost" onClick={handleToggleDelete}>
                {isShowingTrash ? <Trash2 className="h-4 w-4" /> : <NotebookIcon className="h-4 w-4" />}
            </Button>
            <Button size="icon-sm" aria-label="Add" variant="ghost" onClick={handleAddNote}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}
