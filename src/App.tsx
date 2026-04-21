import { useState } from "react";
import type { Page } from "./types/navigation";

import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

function App() {
  const [page, setPage] = useState<Page>("inicio");

  return (
    <div className="min-h-screen w-full bg-main overflow-hidden">

      {/* 🖥️ SIDEBAR (solo desktop) */}
      <Sidebar page={page} setPage={setPage} />

      {/* 📄 CONTENIDO PRINCIPAL */}
      <div className="md:ml-16 h-screen overflow-y-auto">
        <Navigation page={page} />
      </div>

      {/* 📱 NAVBAR (solo móvil) */}
      <div className="md:hidden">
        <NavBar page={page} setPage={setPage} />
      </div>

    </div>
  );
}

export default App;