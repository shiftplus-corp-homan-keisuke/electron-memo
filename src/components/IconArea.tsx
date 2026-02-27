'use client'

import { Button } from './ui/button'
import { Trash2, Settings, Plus } from 'lucide-react'
import useNoteStore from '../stores/useNoteStore' // useNoteStoreをインポートする
import { useRouter } from 'next/navigation'

export default function IconArea() {
    const addNote = useNoteStore((state) => state.addNote);
    const router = useRouter();

    function handleSettings() {
        console.log('Settings')
    }

    function handleDelete() {
        console.log('Delete')
    }

    function handleAddNote() {
        const newNoteId = addNote();
        router.push(`/detail/${newNoteId}`);
    }

    return (
        <div className="flex gap-2">
            <Button size="icon-sm" aria-label="Delete" variant="ghost" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="icon-sm" aria-label="Settings" variant="ghost" onClick={handleSettings}>
                <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon-sm" aria-label="Add" variant="ghost" onClick={handleAddNote}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}
