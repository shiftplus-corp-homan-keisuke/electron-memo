import TitleBar from "@/components/layout/TitleBar";
export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <TitleBar />
      <main className="flex-1 overflow-hidden bg-gray-50 text-gray-900 dark:bg-black dark:text-gray-100">
        メモ帳
      </main>
    </div>
  );
}
