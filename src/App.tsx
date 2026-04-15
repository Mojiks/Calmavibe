import { useState } from "react";
import type { Page } from "./types/navigation";

import Navigation from "./components/Navigation";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";

function App() {
  const [page, setPage] = useState<Page>("inicio");

  return (
<div className="bg-main w-full h-screen">
          <Logo />
      <Navigation page={page} />
      <NavBar page={page} setPage={setPage} />
    </div>
  );
}

export default App;