// src/components/layout/sidebar/SidebarMenu.tsx

import {
  BookOpen,
  Home,
  Mail,
  MessageCircle,
  Video,
} from "lucide-react";

import type { Page } from "../../../types/navigation";

interface SidebarMenuProps {
  page: Page;
  setPage: (page: Page) => void;
}

const items = [
  { id: "inicio" as Page, label: "Inicio", icon: Home },
  { id: "books" as Page, label: "Libros", icon: BookOpen },
  { id: "videos" as Page, label: "Videos", icon: Video },
  { id: "ayuda" as Page, label: "Ayuda", icon: MessageCircle },
  {
    id: "sugerencias" as Page,
    label: "Sugerencias",
    icon: Mail,
  },
];

export default function SidebarMenu({
  page,
  setPage,
}: SidebarMenuProps) {
  return (
    <nav className="flex flex-col gap-1 px-0">
      {items.map((item) => {
        const Icon = item.icon;
        const active = page === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setPage(item.id)}
            className={`
              group
              relative
              flex
              h-[38px]
              w-full
              items-center
              gap-3
              rounded-[12px]
              border
              px-[18px]
              transition-all
              duration-200
              ${
                active
                  ? `
                    border-[#A9B982]/20
                    bg-gradient-to-r
                    from-[#7B8F5E]
                    to-[#718354]
                    text-white
                    shadow-[0_6px_18px_rgba(75,95,55,0.18)]
                  `
                  : `
                    border-transparent
                    text-white/75
                    hover:border-white/[0.06]
                    hover:bg-white/[0.045]
                    hover:text-white
                  `
              }
            `}
          >
            <Icon
              size={16}
              strokeWidth={active ? 1.9 : 1.7}
              className={`
                transition-all
                duration-200
                ${
                  active
                    ? "text-[#F2E2AE]"
                    : "text-white/65 group-hover:text-white/90"
                }
              `}
            />

            <span
              className={`
                text-[14px]
                transition-colors
                duration-200
                ${
                  active
                    ? "font-medium text-white"
                    : "text-[#F2F2F2]/90"
                }
              `}
            >
              {item.label}
            </span>

            {active && (
              <span
                className="
                  absolute
                  right-3
                  h-1
                  w-1
                  rounded-full
                  bg-[#F2E2AE]
                  shadow-[0_0_8px_rgba(242,226,174,0.55)]
                "
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}