import { useState } from "react";
import type { Page } from "./types/navigation";

import Background from "./components/Background";
import BottomNavigation from "./components/layout/BottomNavigation";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Navigation from "./components/Navigation";
import HomeFooter from "./components/home/HomeFooter";

function App() {
  const [page, setPage] = useState<Page>("inicio");

  return (
    <>
      <Background />

      {/* ================= DESKTOP ================= */}

      <div
        className="
          hidden
          min-h-screen
          lg:grid
          lg:grid-cols-[270px_minmax(0,1fr)]
          lg:grid-rows-[minmax(0,1fr)_auto]
        "
      >
        <div
          className="
            row-start-1
            col-start-1
            min-h-0
          "
        >
          <Sidebar
            page={page}
            setPage={setPage}
          />
        </div>

        <main
          className="
            relative
            row-start-1
            col-start-2
            min-h-0
            min-w-0
            overflow-x-hidden
            overflow-y-auto
          "
        >
          <Navigation
            page={page}
            setPage={setPage}
          />
        </main>

        {page === "inicio" && (
          <div
            className="
              col-span-2
              row-start-2
              min-w-0
            "
          >
            <HomeFooter />
          </div>
        )}
      </div>

      {/* ================= MOBILE + TABLET ================= */}

      <div
        className="
          min-h-screen
          pb-24
          lg:hidden
        "
      >
        <Navigation
          page={page}
          setPage={setPage}
        />

        <BottomNavigation
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
}

export default App;