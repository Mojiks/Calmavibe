// src/components/Navigation.tsx

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
import Juegos from "../pages/Juegos";
import ColorZen from "../pages/ColorZen";
import Burbuja from "../pages/Burbuja";
import Constelacion from "../pages/Constelacion";
import MemoriaCalmavibe from "../pages/MemoriaCalmavibe";
import EncuentraPatron from "../pages/EncuentraPatron";
import TresTresTres from "../pages/TresTresTres";
import Desafio100 from "../pages/Desafio100";
import Fluye from "../pages/Fluye";

interface NavigationProps {
  page: Page;
  setPage: (page: Page) => void;
}

export default function Navigation({
  page,
  setPage,
}: NavigationProps) {
  switch (page) {
    case "inicio":
      return (
        <Inicio
          setPage={setPage}
        />
      );

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

    case "sugerencias":
      return <Sugerencias />;

    case "nomesientobien":
      return <NoMeSientoBien />;

    case "juegos":
      return (
        <Juegos
          setPage={setPage}
        />
      );

    case "colorzen":
      return (
        <ColorZen
          onBack={() =>
            setPage("juegos")
          }
        />
      );

    case "burbuja":
      return (
        <Burbuja
          onBack={() =>
            setPage("juegos")
          }
          onSuggestions={() =>
            setPage("sugerencias")
          }
        />
      );

    case "constelacion":
      return (
        <Constelacion
          onBack={() =>
            setPage("juegos")
          }
        />
      );

    case "memoria":
      return (
        <MemoriaCalmavibe
          onBack={() =>
            setPage("juegos")
          }
        />
      );

    case "patron":
      return (
        <EncuentraPatron
          onBack={() =>
            setPage("juegos")
          }
        />
      );

    case "tres333":
      return (
        <TresTresTres
          onBack={() =>
            setPage("juegos")
          }
        />
      );

      case "desafio100":
  return (
    <Desafio100
      onBack={() =>
        setPage("juegos")
      }
    />
  );

  case "fluye":
  return (
    <Fluye
      onBack={() =>
        setPage("juegos")
      }
    />
  );
    default:
      return null;
  }
}