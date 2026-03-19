"use client"

import useFontSizeStore from '@/stores/useFontSizeStore';
import useNoteStore from '@/stores/useNoteStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ShortcutManager({children}: { children: React.ReactNode }) {
const { fontSize, increase, decrease } = useFontSizeStore();
const addNote = useNoteStore((state) => state.addNote);
const setIsShowingTrash = useNoteStore((state) => state.setIsShowingTrash);
const router = useRouter();

function handleAddNote() {
    const newNoteId = addNote();
    router.push(`/?id=${newNoteId}`);
    setIsShowingTrash(false);
}

// フォントサイズが変わるたびにhtmlのfont-sizeを更新（remの基準値）
useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
}, [fontSize]);

useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Ctrlキーが押されていない場合は無視
        if (!e.ctrlKey) return; 

        // Ctrl + '+' でフォントサイズを増加
        if (e.code === 'Semicolon') {
            e.preventDefault(); // ブラウザのズームを防止
            increase();
        // Ctrl + '-' でフォントサイズを減少
        } else if (e.code === 'Minus') { 
            e.preventDefault();
            decrease();
        // ctrl + N で新規ノート作成
        } else if (e.code === 'KeyN') {
            e.preventDefault();
            handleAddNote();
        // ctrf + F で検索にフォーカス
        } else if (e.code === 'KeyF') {
            e.preventDefault();
            const searchInput = document.getElementById('input-group-url') as HTMLInputElement | null;
            if (searchInput) {
                searchInput.focus();
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [increase, decrease, handleAddNote]);

  return (
    <>{children}</>
  )
}
