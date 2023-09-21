import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

export default function AiPenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex">
      <div className="h-screen bg-input-background sticky top-0 bottom-0 shadow-[0_0_6px_1px_rgba(0,0,0,0.1)]">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
