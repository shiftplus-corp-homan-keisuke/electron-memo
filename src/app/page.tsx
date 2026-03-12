import NoteEditor from "@/components/NoteEditor";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NoteEditor />
    </Suspense>
  );
}
