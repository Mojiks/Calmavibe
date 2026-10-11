import { useMemo, useState } from "react";
import Layout from "../components/Layout";

type CategoryId =
  | "calma"
  | "ansiedad"
  | "perdida"
  | "reconstruccion"
  | "autocompasion"
  | "dinero"
  | "reflexion";

type Book = {
  id: string;
  title: string;
  author: string;
  categories: CategoryId[];
  moment: string;
  synopsis: string;
  whyCalmavibe: string;
  sensitive?: string;
};

type Category = {
  id: CategoryId;
  label: string;
  description: string;
};

const categories: Category[] = [
  {
    id: "calma",
    label: "Necesito calmar mi mente",
    description:
      "Lecturas para detener el ruido, observar lo que ocurre y recuperar perspectiva.",
  },
  {
    id: "ansiedad",
    label: "Quiero entender mis pensamientos",
    description:
      "Obras sobre preocupación, ansiedad, estado de ánimo y la relación con nuestros pensamientos.",
  },
  {
    id: "perdida",
    label: "Estoy atravesando una pérdida",
    description:
      "Lecturas para acompañar momentos de duelo, cambios y ausencias importantes.",
  },
  {
    id: "reconstruccion",
    label: "Necesito volver a empezar",
    description:
      "Historias e ideas sobre adversidad, resiliencia, hábitos y reconstrucción.",
  },
  {
    id: "autocompasion",
    label: "Quiero tratarme con más amabilidad",
    description:
      "Lecturas sobre autocrítica, perfeccionismo, autoestima y aceptación personal.",
  },
  {
    id: "dinero",
    label: "Me preocupa el dinero o el trabajo",
    description:
      "Obras que ayudan a reflexionar sobre dinero, trabajo, decisiones y cambios profesionales.",
  },
  {
    id: "reflexion",
    label: "Solo quiero reflexionar",
    description:
      "Filosofía, literatura y poesía para leer despacio y mirar la vida desde otra perspectiva.",
  },
];

const books: Book[] = [
  {
    id: "meditaciones",
    title: "Meditaciones",
    author: "Marco Aurelio",
    categories: ["calma", "reflexion", "reconstruccion"],
    moment: "Cuando necesitas recuperar perspectiva.",
    synopsis:
      "Hay momentos en los que la mente intenta resolverlo todo al mismo tiempo: lo que ocurrió, lo que podría ocurrir y aquello que simplemente no depende de nosotros. Escritas como reflexiones personales, estas páginas acompañan a un hombre que se pregunta una y otra vez cómo vivir con mayor claridad frente a las dificultades, las pérdidas, las responsabilidades y las cosas que escapan a su control. No encontrarás una fórmula rápida para que los problemas desaparezcan. Encontrarás, más bien, una invitación a detenerte y separar aquello que puedes cambiar de aquello que necesitas aprender a aceptar.",
    whyCalmavibe:
      "La elegimos porque puede abrir un espacio de perspectiva cuando una preocupación ocupa demasiado lugar. Es una lectura para volver a las preguntas esenciales: qué depende de mí, qué no, cómo quiero actuar y qué merece realmente mi atención.",
  },
  {
    id: "tao-te-ching",
    title: "Tao Te Ching",
    author: "Lao Tse",
    categories: ["calma", "reflexion"],
    moment: "Cuando sientes que estás intentando controlar demasiado.",
    synopsis:
      "A veces el cansancio no proviene solamente de lo que ocurre, sino de la lucha constante por conseguir que todo ocurra como queremos. A través de breves capítulos, esta obra propone detenerse ante esa necesidad de controlar, apresurar y forzar. Sus reflexiones giran alrededor de la sencillez, el equilibrio, la naturaleza y una manera diferente de relacionarnos con lo que cambia. Es un libro para leer lentamente, regresar a una misma página y dejar que una idea permanezca antes de buscar inmediatamente otra respuesta.",
    whyCalmavibe:
      "La recomendamos como una lectura contemplativa. Puede acompañar momentos en los que no necesitas más información, sino un poco de espacio para observar las cosas desde otra perspectiva.",
  },
  {
    id: "el-profeta",
    title: "El Profeta",
    author: "Kahlil Gibran",
    categories: ["reflexion", "calma", "perdida"],
    moment: "Cuando necesitas detenerte y mirar tu vida desde otra perspectiva.",
    synopsis:
      "Después de años esperando el momento de regresar a casa, un hombre está a punto de abandonar la ciudad en la que ha vivido. Antes de partir, quienes lo rodean se acercan para hacerle preguntas sobre aquello que todos conocemos de alguna manera: el amor, la alegría, el dolor, la libertad, el trabajo, la amistad y la pérdida. Lo que sigue no es una historia convencional, sino una colección de reflexiones que convierte una despedida en un recorrido por algunas de las preguntas más profundas de la vida.",
    whyCalmavibe:
      "La elegimos porque puede acompañar momentos de introspección sin convertirse en un manual. Es literatura para leer con calma, detenerse en una frase y descubrir qué significado tiene para la propia vida.",
  },
  {
    id: "cartas-a-lucilio",
    title: "Cartas a Lucilio",
    author: "Séneca",
    categories: ["calma", "reflexion", "reconstruccion"],
    moment: "Cuando necesitas pensar en el tiempo y en tus prioridades.",
    synopsis:
      "Imagina recibir una carta de alguien que lleva siglos preguntándose por las mismas cosas que todavía nos preocupan: cuánto tiempo tenemos, qué hacemos con él, qué significa perder, cómo enfrentamos el miedo, qué lugar ocupan los bienes materiales y qué clase de persona queremos llegar a ser. A través de sus cartas, Séneca convierte esas preguntas en conversaciones sobre la vida cotidiana, la amistad, la tranquilidad y la manera de enfrentar aquello que no podemos controlar.",
    whyCalmavibe:
      "Es una lectura para quien busca profundidad y perspectiva. No intenta convertir la vida en algo sencillo; propone observarla con mayor claridad.",
  },
  {
    id: "mindful-way-through-anxiety",
    title: "The Mindful Way through Anxiety",
    author: "Susan M. Orsillo y Lizabeth Roemer",
    categories: ["ansiedad", "calma"],
    moment: "Cuando la preocupación parece no encontrar un punto de descanso.",
    synopsis:
      "La preocupación puede convertirse en una habitación de la que parece difícil salir: una pregunta lleva a otra, una posibilidad abre otra posibilidad y la mente continúa buscando certezas que quizá nunca llegan. Esta obra explora una relación diferente con la ansiedad y la preocupación, basada en atención plena y aceptación. En lugar de plantear una batalla contra cada pensamiento, propone aprender a observar lo que ocurre y responder de una manera más consciente.",
    whyCalmavibe:
      "La incluimos como una lectura especializada para quienes quieren conocer enfoques basados en mindfulness y aceptación frente a la preocupación y la ansiedad.",
    sensitive:
      "Lectura especializada relacionada con ansiedad y salud mental. No sustituye una evaluación ni atención profesional.",
  },
  {
    id: "the-happiness-trap",
    title: "The Happiness Trap",
    author: "Russ Harris",
    categories: ["ansiedad", "autocompasion", "reconstruccion"],
    moment: "Cuando perseguir sentirte bien se ha convertido en otra fuente de presión.",
    synopsis:
      "Nos han enseñado que una vida buena debería sentirse bien la mayor parte del tiempo. Pero ¿qué sucede cuando intentar eliminar cada pensamiento incómodo, cada miedo o cada emoción difícil termina ocupando toda nuestra energía? Esta obra propone mirar de otra manera nuestra relación con pensamientos y emociones difíciles, y explorar qué ocurre cuando dejamos de medir nuestra vida únicamente por cómo nos sentimos en un momento determinado.",
    whyCalmavibe:
      "La recomendamos porque introduce una idea especialmente valiosa: una vida significativa no tiene que estar libre de emociones difíciles. Puede existir espacio para ellas sin permitir que definan toda nuestra experiencia.",
  },
  {
    id: "anxiety-and-phobia-workbook",
    title: "The Anxiety and Phobia Workbook",
    author: "Edmund J. Bourne",
    categories: ["ansiedad"],
    moment: "Cuando quieres conocer mejor la ansiedad y diferentes estrategias para afrontarla.",
    synopsis:
      "La ansiedad puede sentirse de muchas maneras: preocupación constante, miedo, tensión, evitación, inquietud o una sensación de que algo malo está a punto de suceder. Este libro presenta un enfoque estructurado para comprender diferentes manifestaciones de ansiedad y trabajar con herramientas relacionadas con pensamientos, exposición, relajación, respiración, atención plena y afrontamiento de la incertidumbre.",
    whyCalmavibe:
      "Está incluido como referencia especializada. No lo presentamos como una solución inmediata, sino como un recurso para quien quiere profundizar y conocer diferentes herramientas de afrontamiento.",
    sensitive:
      "Lectura especializada sobre ansiedad y fobias. No sustituye atención profesional.",
  },
  {
    id: "upward-spiral",
    title: "The Upward Spiral",
    author: "Alex Korb",
    categories: ["ansiedad", "reconstruccion"],
    moment: "Cuando necesitas entender cómo pequeños cambios pueden influir en tu estado de ánimo.",
    synopsis:
      "Cuando una persona lleva tiempo sintiéndose mal, puede parecer que todo está conectado: menos energía lleva a menos actividad, menos actividad lleva a mayor aislamiento y ese aislamiento puede hacer que comenzar algo nuevo parezca todavía más difícil. Esta obra explora desde la neurociencia las relaciones entre cerebro, comportamiento, hábitos y estado de ánimo, y plantea cómo pequeños cambios pueden contribuir a modificar determinados patrones.",
    whyCalmavibe:
      "La recomendamos porque conecta conocimiento científico con una idea sencilla: cuando todo parece demasiado grande, comenzar con un pequeño movimiento puede ser más realista que intentar cambiarlo todo de una vez.",
    sensitive:
      "Lectura relacionada con depresión y estado de ánimo. No sustituye atención profesional.",
  },
  {
    id: "camino-consciente-depresion",
    title: "El camino consciente a través de la depresión",
    author:
      "Mark Williams, John Teasdale, Zindel Segal y Jon Kabat-Zinn",
    categories: ["ansiedad", "calma"],
    moment: "Cuando quieres comprender la relación entre ánimo, pensamientos y atención.",
    synopsis:
      "Hay momentos en los que la mente parece regresar una y otra vez a los mismos lugares: errores pasados, preocupaciones futuras, culpa o pensamientos que se vuelven cada vez más familiares. Esta obra presenta un enfoque basado en mindfulness para observar esos patrones de una manera diferente y desarrollar una relación más consciente con la experiencia presente.",
    whyCalmavibe:
      "Es una de las lecturas especializadas de la colección. La incluimos para quienes quieren profundizar en un enfoque basado en mindfulness y comprender mejor los patrones asociados con la depresión.",
    sensitive:
      "Lectura especializada relacionada con depresión. No sustituye evaluación ni atención profesional.",
  },
  {
    id: "feeling-good",
    title: "Feeling Good",
    author: "David D. Burns",
    categories: ["ansiedad", "autocompasion"],
    moment: "Cuando quieres observar la manera en que tus pensamientos influyen en cómo te sientes.",
    synopsis:
      "A veces una situación difícil no termina cuando el acontecimiento pasa. La mente puede continuar reconstruyéndolo, interpretándolo y encontrando nuevas razones para sentirse culpable, incapaz o sin esperanza. Esta obra, vinculada al enfoque de la terapia cognitiva, explora patrones de pensamiento negativos y propone maneras de reconocerlos y cuestionarlos.",
    whyCalmavibe:
      "La incluimos como referencia de psicología aplicada para quienes quieren aprender más sobre la relación entre pensamientos, emociones y comportamiento.",
    sensitive:
      "Lectura de orientación psicológica. No sustituye tratamiento ni atención profesional.",
  },
  {
    id: "autocompasion",
    title: "La autocompasión",
    author: "Kristin Neff",
    categories: ["autocompasion", "calma"],
    moment: "Cuando eres mucho más duro contigo de lo que serías con otra persona.",
    synopsis:
      "Existe una voz interior que puede acompañarnos durante todo el día y que, en algunos momentos, parece no estar de nuestro lado. Cada error se convierte en una prueba de que no somos suficientes; cada dificultad, en otra razón para exigirnos más. Esta obra propone mirar la autocrítica desde otro lugar y explorar qué significa tratarnos con la misma comprensión que ofreceríamos a alguien querido que está atravesando un momento difícil.",
    whyCalmavibe:
      "La elegimos porque el bienestar no consiste solamente en aprender a relajarse. También implica aprender a relacionarnos con nosotros mismos sin convertir cada error en un juicio.",
  },
  {
    id: "dones-de-la-imperfeccion",
    title: "Los dones de la imperfección",
    author: "Brené Brown",
    categories: ["autocompasion", "reconstruccion"],
    moment: "Cuando sientes que tienes que ser perfecto para sentir que vales.",
    synopsis:
      "Vivimos rodeados de mensajes que nos dicen que todavía podemos ser mejores: más productivos, más exitosos, más seguros, más atractivos y más capaces. Pero cuando la exigencia se convierte en una forma de vida, incluso los logros pueden sentirse insuficientes. Esta obra explora la posibilidad de vivir con mayor autenticidad y aceptar la propia humanidad sin esperar a convertirnos en una versión perfecta de nosotros mismos.",
    whyCalmavibe:
      "La recomendamos porque recuerda algo que fácilmente olvidamos: mejorar no significa tener que despreciar quién eres hoy.",
  },
  {
    id: "why-has-nobody-told-me-this-before",
    title: "Why Has Nobody Told Me This Before?",
    author: "Julie Smith",
    categories: ["ansiedad", "autocompasion", "reconstruccion"],
    moment: "Cuando quieres entender mejor algunas dificultades emocionales de la vida cotidiana.",
    synopsis:
      "Hay días en los que una emoción difícil aparece sin pedir permiso: ansiedad, tristeza, falta de confianza, agotamiento o la sensación de que no estamos manejando las cosas tan bien como quisiéramos. Escrito por una psicóloga clínica, este libro reúne explicaciones y herramientas sobre diferentes dificultades emocionales de la vida cotidiana, presentándolas de una manera accesible y directa.",
    whyCalmavibe:
      "La incluimos porque puede servir como una puerta de entrada para quien quiere aprender más sobre bienestar psicológico sin comenzar necesariamente con un texto académico.",
    sensitive:
      "Recurso de orientación psicológica. No sustituye atención profesional.",
  },
  {
    id: "confidence-gap",
    title: "The Confidence Gap",
    author: "Russ Harris",
    categories: ["autocompasion", "ansiedad", "reconstruccion"],
    moment: "Cuando sabes lo que quieres hacer, pero el miedo te detiene.",
    synopsis:
      "La confianza suele parecer un requisito para actuar: primero tengo que sentirme seguro y después podré dar el paso. Pero ¿qué ocurre si esperamos a sentirnos preparados antes de hacer algo importante? Esta obra explora una perspectiva diferente: aprender a relacionarnos con el miedo y la inseguridad sin esperar a que desaparezcan por completo para comenzar a movernos hacia aquello que realmente importa.",
    whyCalmavibe:
      "La recomendamos especialmente para momentos de cambio, decisiones difíciles o etapas en las que el miedo está ocupando demasiado espacio.",
  },
  {
    id: "opcion-b",
    title: "Opción B",
    author: "Sheryl Sandberg y Adam Grant",
    categories: ["perdida", "reconstruccion", "dinero"],
    moment: "Cuando la vida que conocías cambió de repente.",
    synopsis:
      "Hay pérdidas que nadie planea: la muerte de alguien querido, una enfermedad, un despido, un cambio inesperado o una situación que transforma por completo la vida cotidiana. Cuando el futuro que imaginabas deja de existir, la pregunta no siempre es cómo recuperar exactamente lo que tenías, sino cómo empezar a construir algo diferente. Esta obra nace de una experiencia personal de pérdida y reúne reflexiones sobre duelo, resiliencia, apoyo y reconstrucción.",
    whyCalmavibe:
      "Es una de las obras centrales de nuestra biblioteca porque habla de una situación que puede adoptar muchas formas: perder a una persona, un trabajo, una estabilidad o una parte importante de la vida que conocíamos.",
    sensitive:
      "Contiene reflexiones sobre duelo, pérdida y experiencias personales de dolor.",
  },
  {
    id: "ano-pensamiento-magico",
    title: "El año del pensamiento mágico",
    author: "Joan Didion",
    categories: ["perdida", "reflexion"],
    moment: "Cuando estás intentando comprender una pérdida importante.",
    synopsis:
      "Después de la muerte repentina de su esposo, Joan Didion intenta continuar con una vida que, de un día para otro, ha dejado de parecerse a la que conocía. Entre recuerdos, objetos, preguntas y momentos cotidianos, la autora observa el desconcierto del duelo y la extraña manera en que la mente intenta comprender una ausencia que todavía parece imposible. Es una obra íntima sobre memoria, amor, pérdida y el lento proceso de aprender a vivir con una realidad diferente.",
    whyCalmavibe:
      "La recomendamos para acompañar, desde la literatura, una de las experiencias humanas más difíciles: perder a alguien que forma parte esencial de nuestra vida.",
    sensitive:
      "Contenido sensible relacionado con duelo y pérdida familiar.",
  },
  {
    id: "other-side-of-sadness",
    title: "The Other Side of Sadness",
    author: "George A. Bonanno",
    categories: ["perdida", "reconstruccion"],
    moment: "Cuando quieres comprender que el duelo no tiene una única forma.",
    synopsis:
      "Durante mucho tiempo se ha hablado del duelo como si todas las personas tuvieran que atravesar exactamente las mismas etapas. La investigación sobre la pérdida cuenta una historia mucho más compleja. Esta obra explora las diferentes formas en que las personas responden al duelo y la capacidad humana de adaptarse después de experiencias profundamente dolorosas.",
    whyCalmavibe:
      "La incluimos porque ofrece una perspectiva especialmente valiosa: no existe una única manera correcta de vivir una pérdida, y la adaptación puede tomar caminos muy diferentes.",
    sensitive:
      "Lectura especializada sobre duelo y adaptación a la pérdida.",
  },
  {
    id: "grief-isnt-something-to-get-over",
    title: "Grief Isn't Something to Get Over",
    author: "Mary C. Lamia",
    categories: ["perdida", "autocompasion"],
    moment: "Cuando alguien te dice que ya deberías haberlo superado.",
    synopsis:
      "Algunas pérdidas cambian nuestra relación con el tiempo. Hay días en los que parece posible continuar y otros en los que una canción, una fotografía o un recuerdo devuelve una ausencia con toda su fuerza. Esta obra parte de una idea sencilla pero profunda: el duelo no necesariamente consiste en olvidar o dejar atrás a quien perdimos. Se trata de comprender las emociones, recuerdos y cambios que aparecen mientras aprendemos a vivir con esa ausencia.",
    whyCalmavibe:
      "La elegimos porque nuestra Biblioteca no quiere decirle a nadie que debe superar rápidamente una pérdida. Quiere ofrecer lecturas que permitan sentirse acompañado mientras cada persona encuentra su propio camino.",
    sensitive:
      "Contenido sensible relacionado con duelo y pérdida.",
  },
  {
    id: "hombre-busca-sentido",
    title: "El hombre en busca de sentido",
    author: "Viktor E. Frankl",
    categories: ["perdida", "reconstruccion", "reflexion"],
    moment: "Cuando necesitas encontrar una dirección en medio de una adversidad profunda.",
    synopsis:
      "Hay circunstancias que pueden cambiar completamente la idea que una persona tenía sobre el futuro. Viktor Frankl escribió desde una experiencia extrema de sufrimiento y pérdida, y convirtió esa experiencia en una reflexión sobre la búsqueda de sentido. La obra no ofrece una fórmula sencilla para enfrentar el dolor. Plantea una pregunta mucho más profunda: incluso cuando no podemos elegir las circunstancias, ¿qué significado podemos encontrar en la manera en que respondemos ante ellas?",
    whyCalmavibe:
      "Es una de las lecturas más profundas de la colección. La incluimos para quienes atraviesan una etapa de preguntas sobre propósito, sufrimiento y dirección.",
    sensitive:
      "Contenido sensible y experiencias relacionadas con persecución, violencia, campos de concentración y sufrimiento extremo.",
  },
  {
    id: "cuando-todo-se-derrumba",
    title: "Cuando todo se derrumba",
    author: "Pema Chödrön",
    categories: ["calma", "ansiedad", "reconstruccion"],
    moment: "Cuando sientes que las cosas ya no están bajo control.",
    synopsis:
      "Hay momentos en los que aquello que parecía estable deja de serlo. Una relación cambia, un trabajo desaparece, aparece una pérdida o simplemente sentimos que ya no sabemos hacia dónde avanzar. Esta obra parte de esos momentos de incertidumbre y propone observar el miedo, el dolor y la vulnerabilidad sin convertirlos inmediatamente en algo que debemos eliminar. Es una invitación a permanecer presentes incluso cuando la vida no está siguiendo el plan que habíamos imaginado.",
    whyCalmavibe:
      "Su enfoque encaja especialmente bien con la idea de Modo Refugio: no siempre necesitamos resolver lo que sentimos inmediatamente. A veces necesitamos aprender a permanecer un momento junto a ello.",
  },
  {
    id: "resilient",
    title: "Resilient",
    author: "Rick Hanson",
    categories: ["reconstruccion", "calma", "autocompasion"],
    moment: "Cuando quieres fortalecer recursos internos para afrontar momentos difíciles.",
    synopsis:
      "La resiliencia suele imaginarse como una fuerza que algunas personas poseen y otras no. Esta obra plantea una mirada diferente: determinadas capacidades internas pueden cultivarse a través de experiencias y prácticas cotidianas. Fortaleza, paciencia, compasión, confianza y equilibrio aparecen como habilidades que pueden desarrollarse gradualmente.",
    whyCalmavibe:
      "La recomendamos porque pone el foco no solamente en sobrevivir a una dificultad, sino también en reconocer y fortalecer los recursos internos que pueden ayudarnos a afrontar los cambios.",
  },
  {
    id: "obstaculo-es-el-camino",
    title: "El obstáculo es el camino",
    author: "Ryan Holiday",
    categories: ["reconstruccion", "reflexion"],
    moment: "Cuando un obstáculo parece haber detenido tu vida.",
    synopsis:
      "Un plan se rompe. Una oportunidad desaparece. Algo que parecía seguro deja de existir. Frente a un obstáculo, la primera reacción puede ser preguntarnos por qué tuvo que suceder precisamente a nosotros. Esta obra recupera ideas del estoicismo para plantear una pregunta diferente: ¿qué podemos hacer con aquello que tenemos delante? El obstáculo deja de ser únicamente una barrera y se convierte en el punto desde el que comienza una nueva forma de actuar.",
    whyCalmavibe:
      "La incluimos para momentos de frustración, fracaso y cambio. No porque todo obstáculo tenga una razón positiva, sino porque nuestras acciones posteriores todavía pueden estar en nuestras manos.",
  },
  {
    id: "habitos-atomicos",
    title: "Hábitos atómicos",
    author: "James Clear",
    categories: ["reconstruccion"],
    moment: "Cuando quieres volver a empezar, pero no sabes por dónde.",
    synopsis:
      "Después de una etapa difícil, la idea de cambiar toda una vida puede sentirse imposible. Tal vez el problema no sea la falta de voluntad, sino el tamaño de la transformación que estamos exigiendo. Esta obra propone mirar los cambios desde otra escala: pequeños comportamientos repetidos, sistemas que facilitan determinadas acciones y decisiones cotidianas que, con el tiempo, pueden construir una dirección diferente.",
    whyCalmavibe:
      "La recomendamos para quienes necesitan recuperar movimiento sin exigirse una transformación inmediata. A veces volver a empezar puede significar solamente elegir una cosa pequeña y repetirla mañana.",
  },
  {
    id: "psicologia-del-dinero",
    title: "La psicología del dinero",
    author: "Morgan Housel",
    categories: ["dinero", "reflexion"],
    moment: "Cuando el dinero se ha convertido en una fuente constante de preocupación.",
    synopsis:
      "El dinero parece una cuestión de números, pero nuestras decisiones financieras rara vez son completamente racionales. Las experiencias que vivimos, la familia en la que crecimos, el miedo, la comparación y nuestras propias expectativas pueden influir profundamente en cómo gastamos, ahorramos y pensamos sobre el futuro. Esta obra utiliza historias y situaciones cotidianas para explorar la relación humana con el dinero.",
    whyCalmavibe:
      "La incluimos porque las preocupaciones económicas también pueden ocupar una enorme cantidad de espacio mental. No es un manual para hacerse rico; es una invitación a comprender mejor nuestra relación con el dinero y las decisiones que tomamos alrededor de él.",
  },
];

const categoryMap = new Map(categories.map((category) => [category.id, category]));

export default function Books() {
  const [selected, setSelected] = useState<Book | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(
    null,
  );

  const visibleBooks = useMemo(() => {
    if (!activeCategory) {
      return books;
    }

    return books.filter((book) => book.categories.includes(activeCategory));
  }, [activeCategory]);

  const selectedCategory = activeCategory
    ? categoryMap.get(activeCategory)
    : null;

  return (
    <Layout>
      <div
        className="min-h-screen text-white p-4 sm:p-6 pb-20"
        style={{
          backgroundImage: "url('/images/backgrounds/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!selected ? (
          <>
            <div className="max-w-5xl mx-auto mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold mb-3">
                Biblioteca
              </h1>

              <p className="text-white/75 max-w-3xl mx-auto leading-relaxed">
                Algunas lecturas no buscan darte respuestas inmediatas.
                Simplemente abren un espacio para detenerte, mirar desde otra
                perspectiva y descubrir nuevas preguntas.
              </p>
            </div>

            <div className="max-w-5xl mx-auto mb-10">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6">
                <div className="text-center mb-5">
                  <h2 className="text-xl font-semibold mb-2">
                    ¿Qué necesitas hoy?
                  </h2>

                  <p className="text-sm text-white/60">
                    Elige un momento que se parezca a lo que estás viviendo.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm transition ${
                      activeCategory === null
                        ? "bg-white text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    Ver todas
                  </button>

                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        activeCategory === category.id
                          ? "bg-white text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedCategory && (
              <div className="max-w-5xl mx-auto mb-6">
                <p className="text-center text-sm text-white/65">
                  {selectedCategory.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
              {visibleBooks.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => setSelected(book)}
                  className="group text-left rounded-2xl overflow-hidden bg-black/35 backdrop-blur-md border border-white/10 shadow-lg transition duration-300 hover:bg-black/50 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/60"
                  aria-label={`Ver información de ${book.title}`}
                >
                  <div className="aspect-[2/3] flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-white/10 via-black/10 to-white/5 p-4 text-center">
                    <span aria-hidden="true" className="text-3xl text-white/75 transition-transform duration-300 group-hover:scale-110">
                      ◈
                    </span>
                    <span className="text-sm sm:text-base font-semibold leading-snug text-white">
                      {book.title}
                    </span>
                    <span className="text-xs leading-relaxed text-white/60">
                      {book.author}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                      Recomendación de lectura
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {visibleBooks.length === 0 && (
              <div className="max-w-xl mx-auto text-center py-12 text-white/70">
                No encontramos lecturas para esta selección.
              </div>
            )}

            <div className="max-w-4xl mx-auto mt-12">
              <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Sobre esta selección
                </h2>

                <p className="text-sm text-white/70 leading-7">
                  Las lecturas de Calmavibe fueron seleccionadas como recursos
                  de reflexión, bienestar y conocimiento. Para construir esta
                  colección se tomaron como referencia recursos profesionales
                  de psicología y salud mental, incluyendo materiales de la
                  American Psychological Association (APA) y de la Anxiety &
                  Depression Association of America (ADAA), además de obras de
                  autores clínicos, investigadores y especialistas.
                </p>

                <p className="text-sm text-white/55 leading-7 mt-4">
                  La presencia de una obra en esta biblioteca no significa que
                  Calmavibe, la APA o la ADAA la estén presentando como
                  tratamiento o recomendación clínica. Las lecturas pueden
                  aportar información y reflexión, pero no sustituyen una
                  evaluación ni la atención de un profesional de la salud.
                </p>

                <p className="text-sm text-white/55 leading-7 mt-4">
                  Para respetar los derechos sobre las imágenes editoriales, Calmavibe no reproduce portadas en esta biblioteca. Los títulos y nombres de autor se muestran únicamente para identificar las obras recomendadas; los derechos correspondientes pertenecen a sus respectivos titulares. La inclusión de una obra no implica patrocinio ni afiliación con su autor o editorial.
                </p>
              </div>
            </div>
          </>
        ) : (
          <article className="max-w-5xl mx-auto">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-6 bg-white/90 text-black px-4 py-2 rounded-lg hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-white"
            >
              ← Volver a la biblioteca
            </button>

            <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start">
              <div className="w-full max-w-[280px] mx-auto">
                <div className="aspect-[2/3] flex flex-col items-center justify-center gap-5 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 via-black/20 to-white/5 p-6 text-center shadow-2xl">
                  <span aria-hidden="true" className="text-5xl text-white/75">◈</span>
                  <h2 className="text-xl font-semibold leading-snug">{selected.title}</h2>
                  <p className="text-sm text-white/60">{selected.author}</p>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">Recomendación de lectura</span>
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55 mb-2">
                  Una lectura para descubrir
                </p>

                <h1 className="text-3xl md:text-4xl font-semibold mb-2">
                  {selected.title}
                </h1>

                <p className="text-white/65 mb-4">{selected.author}</p>

                <p className="text-sm text-white/55 italic mb-8">
                  {selected.moment}
                </p>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Sinopsis</h2>

                  <p className="text-white/80 leading-8">
                    {selected.synopsis}
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    ¿Por qué está en Calmavibe?
                  </h2>

                  <p className="text-white/80 leading-8">
                    {selected.whyCalmavibe}
                  </p>
                </section>

                {selected.sensitive && (
                  <section className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4">
                    <h2 className="text-base font-semibold mb-2">
                      Contenido sensible
                    </h2>

                    <p className="text-sm text-white/65 leading-6">
                      {selected.sensitive}
                    </p>
                  </section>
                )}

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm text-white/55 leading-6">
                    Calmavibe recomienda esta obra como referencia de lectura.
                    No almacenamos ni distribuimos el libro desde esta
                    plataforma. Puedes buscar la edición que prefieras en una
                    biblioteca, librería o fuente que consideres adecuada.
                  </p>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
}