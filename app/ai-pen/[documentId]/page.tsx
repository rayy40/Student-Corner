import Sidebar from "@/components/Sidebar/Sidebar";
import Editor from "@/components/Editor/Editor";

export default function Document() {
  return (
    <div className="relative flex">
      <div className="h-screen bg-input-background sticky top-0 bottom-0 shadow-[0_0_6px_1px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>
      <div className="p-10 overflow-x-auto mt-12 mx-auto max-w-[800px] w-[800px]">
        <Editor />
      </div>
    </div>
  );
}
