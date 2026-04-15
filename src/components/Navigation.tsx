import type { Page } from "../types/navigation";

import Inicio from "../pages/Inicio";
import Ayuda from "../pages/Ayuda";
import Books from "../pages/Books";
import Zen from "../pages/Zen";
import Diario from "../pages/Diario";
import Reflexiones from "../pages/Reflexiones";
import Videos from "../pages/Videos";

type Props = {
  page: Page;
};

export default function Navigation({ page }: Props) {
  switch (page) {
    case "inicio":
      return <Inicio />;

    case "ayuda":
      return <Ayuda />;

    case "books":
      return <Books />;

    case "zen":
      return <Zen />;

    case "diario":
      return <Diario />;

    case "videos":
      return <Videos />;

    case "reflexiones":
      return <Reflexiones />;

    default:
      return <Inicio />;
  }
}