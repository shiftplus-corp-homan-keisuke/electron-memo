"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import useNoteStore from '@/stores/useNoteStore';
import { useParams } from 'next/navigation';
import React from 'react';

export default function NoteEditor() {
  const { id } = useParams();
  // idに一致するノートを取得
  const note = useNoteStore((state) =>
    state.notes.find((note) => note.id === id)
  );

  const updateNote = useNoteStore((state) => state.updateNote)

  if (!note) {
    return (
      <div>ノートが見つかりません</div>
    )
  }
  return (
    <ScrollArea className='w-full h-[calc(100vh-2rem)]'>
      <Textarea
        className='w-full min-h-[calc(100vh-2rem)] p-4 focus-visible:ring-0 border-none resize-none'
        defaultValue={note.content}
        onChange={(e) => updateNote(note.id, e.target.value)}
      />
    </ScrollArea>
  )
}
