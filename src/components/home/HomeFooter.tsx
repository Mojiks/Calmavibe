import {
  Leaf,
  Lock,
  Heart,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: Leaf,
    title: "100% gratuito",
    text: "Siempre.",
  },
  {
    icon: Lock,
    title: "Sin registro",
    text: "Tu privacidad es primero.",
  },
  {
    icon: Heart,
    title: "Hecho con intención",
    text: "Para acompañarte cada día.",
  },
  {
    icon: ShieldCheck,
    title: "Recursos verificados",
    text: "Contenido seleccionado con cuidado.",
  },
];

export default function HomeFooter() {
  return (
    <footer
      className="
        mt-8
        border-t
        border-white/10
        bg-black/25
        backdrop-blur-3xl
        lg:mt-10
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                flex
                items-center
                gap-4
                border-b
                border-white/10
                px-5
                py-5
                last:border-b-0
                md:px-6
                md:[&:nth-child(odd)]:border-r
                lg:border-b-0
                lg:border-r
                lg:px-8
                lg:py-5
                lg:last:border-r-0
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white/5
                "
              >
                <Icon
                  size={18}
                  className="text-white/80"
                />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-[14px]
                    font-medium
                    text-white
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1
                    text-[12px]
                    leading-5
                    text-white/55
                  "
                >
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
}
