// src/App.tsx

import { useState } from "react";
import type { Page } from "./types/navigation";
import Background from "./components/Background";
import BottomNavigation from "./components/layout/BottomNavigation";
import Sidebar from "./components/layout/sidebar/Sidebar";
import Navigation from "./components/Navigation";

function App() {
  const [page, setPage] = useState<Page>("inicio");

  return (
    <>

    <Background />
    
      {/* ================= DESKTOP ================= */}

      <div className="hidden min-h-screen lg:flex">
        <Sidebar
          page={page}
          setPage={setPage}
        />

        <main
          className="
            relative
            min-h-screen
            min-w-0
            flex-1
            overflow-x-hidden
          "
        >
          <Navigation
            page={page}
            setPage={setPage}
          />
        </main>
      </div>

      {/* ================= MOBILE ================= */}

      <div className="min-h-screen lg:hidden">
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