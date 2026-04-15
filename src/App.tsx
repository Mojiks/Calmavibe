import { useState } from "react";
import type { Page } from "./types/navigation";

import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar";

function App() {
  const [page, setPage] = useState<Page>("inicio");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-main">
      <Navigation page={page} />
      <NavBar page={page} setPage={setPage} />
    </div>
  );
}

export default App;