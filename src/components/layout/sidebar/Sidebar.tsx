// src/components/layout/sidebar/Sidebar.tsx

import type { Page } from "../../../types/navigation";

import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import SidebarRefuge from "./SidebarRefuge";
import SidebarPlayer from "./SidebarPlayer";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Sidebar({
  page,
  setPage,
}: SidebarProps) {
  return (
    <aside
      className="
        relative
        z-50
        flex
        h-screen
        w-[270px]
        min-w-[270px]
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-white/10
        bg-[#0D0E0C]/95
      "
    >
      <SidebarLogo />

      <div className="px-0">
        <SidebarMenu
          page={page}
          setPage={setPage}
        />
      </div>

      <div className="mt-7 px-[18px]">
        <SidebarRefuge />
      </div>

      <div className="mt-5 px-[18px]">
        <SidebarPlayer />
      </div>

      <div className="mt-auto">
        <SidebarFooter />
      </div>
    </aside>
  );
}