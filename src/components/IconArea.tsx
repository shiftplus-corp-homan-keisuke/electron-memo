'use client'

import { Button } from './ui/button'
import { Trash2, Settings, Plus } from 'lucide-react'

export default function IconArea() {

    // TODO: 各ボタンのイベントハンドラを実装する
    function handleAdd() {
        console.log('Add')
    }

    function handleSettings() {
        console.log('Settings')
    }

    function handleDelete() {
        console.log('Delete')
    }

    return (
        <div className="flex gap-2">
            <Button size="icon-sm" aria-label="Delete" variant="ghost" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="icon-sm" aria-label="Settings" variant="ghost" onClick={handleSettings}>
                <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon-sm" aria-label="Add" variant="ghost" onClick={handleAdd}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}
