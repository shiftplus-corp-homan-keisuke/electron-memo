"use client"

import useFontSizeStore from '@/stores/useFontSizeStore';
import { useEffect } from 'react';

export default function FontSizeManager({children}: { children: React.ReactNode }) {
const { fontSize, increase, decrease } = useFontSizeStore();

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
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, [increase, decrease]);

  return (
    <>{children}</>
  )
}
