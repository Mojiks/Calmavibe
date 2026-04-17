import { useState } from "react";
import type { Page } from "./types/navigation";

import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar";
import Disclaimer from "./components/Disclaimer";

function App() {
  const [page, setPage] = useState<Page>("inicio");

  return (
    <div className="min-h-screen w-full bg-main">

      <Disclaimer />

      <Navigation page={page} />

      <NavBar page={page} setPage={setPage} />

    </div>
  );
}

export default App;