"use client";

import useNoteStore from '@/stores/useNoteStore';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
  const { id } = useParams();
  // idに一致するノートを取得
  const note = useNoteStore((state) => 
    state.notes.find((note) => note.id === id)
  );

  if (!note) {
    return(
        <div>ノートが見つかりません</div>
    )
  }
  return (
    <textarea defaultValue={note.content}></textarea>
  )
}
