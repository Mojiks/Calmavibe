import type { Page } from "../types/navigation";

import Inicio from "../pages/Inicio";
import Ayuda from "../pages/Ayuda";
import Books from "../pages/Books";
import Zen from "../pages/Zen";
import Diario from "../pages/Diario";
import Videos from "../pages/Videos";
import Reflexiones from "../pages/Reflexiones";
import Sugerencias from "../pages/Sugerencias";
import NoMeSientoBien from "../pages/NoMeSientoBien";

export default function Navigation({ page }: { page: Page }) {

  if (page === "inicio") return <Inicio />;

  if (page === "nomesientobien") {
    return <NoMeSientoBien />;
  }

  if (page === "ayuda") return <Ayuda />;

  if (page === "books") return <Books />;

  if (page === "zen") return <Zen />;

  if (page === "diario") return <Diario />;

  if (page === "videos") return <Videos />;

  if (page === "reflexiones") return <Reflexiones />;

  if (page === "sugerencias") return <Sugerencias />;

  return null;
}