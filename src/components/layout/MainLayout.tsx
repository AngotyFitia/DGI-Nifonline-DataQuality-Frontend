import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">

      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)}/>
      )}

      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex flex-1 flex-col lg:ml-[260px]">
        <Topbar onMenu={() => setOpen(true)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}