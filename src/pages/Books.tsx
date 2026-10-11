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
  const [activeCategory, setActiveCategory] = useState<CategoryId | null>(null);

  const visibleBooks = useMemo(() => {
    if (!activeCategory) return books;
    return books.filter((book) => book.categories.includes(activeCategory));
  }, [activeCategory]);

  const selectedCategory = activeCategory ? categoryMap.get(activeCategory) : null;

  return (
    <Layout>
      <div
        className="min-h-screen px-4 py-7 pb-24 text-white sm:px-6 sm:py-10 lg:px-8"
        style={{
          backgroundImage: "url('/images/backgrounds/fondo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!selected ? (
          <div className="mx-auto max-w-7xl">
            <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
              <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.34em] text-amber-200/80 sm:text-xs">
                CALMAVIBE · ESPACIO DE LECTURA
              </p>
              <h1 className="font-serif text-4xl font-normal tracking-[0.015em] text-white drop-shadow-sm sm:text-5xl md:text-6xl">
                Biblioteca
              </h1>
              <div className="mx-auto my-5 flex items-center justify-center gap-3" aria-hidden="true">
                <span className="h-px w-10 bg-amber-200/35" />
                <span className="text-sm text-amber-200/80">✧</span>
                <span className="h-px w-10 bg-amber-200/35" />
              </div>
              <p className="mx-auto max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                Algunas lecturas no buscan darte respuestas inmediatas. Abren un espacio para detenerte, mirar desde otra perspectiva y descubrir nuevas preguntas.
              </p>
              <p className="mt-4 text-xs tracking-wide text-white/50">
                {books.length} lecturas seleccionadas · Sin archivos ni portadas reproducidas
              </p>
            </header>

            <section
              aria-labelledby="reading-intention"
              className="mb-10 overflow-hidden rounded-3xl border border-amber-100/15 bg-[#171513]/55 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl sm:mb-12 sm:p-7 lg:p-8"
            >
              <div className="mx-auto mb-6 max-w-2xl text-center">
                <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">Elige sin prisa</p>
                <h2 id="reading-intention" className="font-serif text-2xl font-normal sm:text-3xl">
                  ¿Qué necesitas hoy?
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  Puedes empezar por lo que más se acerque a tu momento. No necesitas tenerlo todo claro.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveCategory(null)}
                  aria-pressed={activeCategory === null}
                  className={`rounded-full border px-4 py-2.5 text-xs transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:text-sm ${
                    activeCategory === null
                      ? "border-amber-100/80 bg-amber-100 text-[#29221b] shadow-[0_4px_18px_rgba(226,196,139,0.12)]"
                      : "border-white/15 bg-white/[0.035] text-white/75 hover:border-amber-100/35 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  Ver todas <span className="ml-1 opacity-65">({books.length})</span>
                </button>
                {categories.map((category) => {
                  const count = books.filter((book) => book.categories.includes(category.id)).length;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-4 py-2.5 text-xs transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:text-sm ${
                        isActive
                          ? "border-amber-100/80 bg-amber-100 text-[#29221b]"
                          : "border-white/15 bg-white/[0.035] text-white/75 hover:border-amber-100/35 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      {category.label} <span className="ml-1 opacity-55">{count}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section aria-labelledby="books-list-heading">
              <div className="mb-5 flex flex-col gap-3 border-b border-white/15 pb-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-amber-100/65">Una colección para volver a ella</p>
                  <h2 id="books-list-heading" className="font-serif text-2xl font-normal sm:text-3xl">
                    {selectedCategory ? selectedCategory.label : "Lecturas para distintos momentos"}
                  </h2>
                  {selectedCategory && <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">{selectedCategory.description}</p>}
                </div>
                <p className="shrink-0 text-xs tracking-wide text-white/50">
                  {visibleBooks.length} {visibleBooks.length === 1 ? "lectura" : "lecturas"}
                </p>
              </div>

              {visibleBooks.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleBooks.map((book, index) => (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => setSelected(book)}
                      aria-label={`Leer información de ${book.title}, de ${book.author}`}
                      className="group relative flex min-h-[228px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#171513]/55 p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-amber-100/35 hover:bg-[#201c17]/75 hover:shadow-[0_18px_42px_rgba(0,0,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70 sm:min-h-[250px] sm:p-6"
                    >
                      <span className="pointer-events-none absolute right-4 top-3 font-serif text-5xl font-light text-amber-100/[0.08] transition duration-300 group-hover:text-amber-100/[0.16]" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mb-5 flex items-center gap-2 text-[9px] uppercase tracking-[0.22em] text-amber-100/70">
                        <span className="h-px w-5 bg-amber-200/60" />
                        Lectura recomendada
                      </span>
                      <span className="relative block font-serif text-xl font-normal leading-snug text-white transition-colors group-hover:text-amber-50 sm:text-[1.35rem]">
                        {book.title}
                      </span>
                      <span className="mt-2 block text-sm leading-5 text-white/55">{book.author}</span>
                      <span className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                        <span className="text-[10px] leading-4 text-white/45">
                          {book.categories.slice(0, 2).map((id) => categoryMap.get(id)?.label.replace("Necesito ", "").replace("Quiero ", "").replace("Estoy ", "").replace("Me preocupa ", "").replace("Solo ", "")).join(" · ")}
                        </span>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-100/20 text-amber-100/75 transition duration-300 group-hover:border-amber-100/55 group-hover:bg-amber-100/10 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/25 px-6 py-14 text-center text-sm text-white/65">
                  No encontramos lecturas para esta selección.
                </div>
              )}
            </section>

            <aside className="mx-auto mt-12 max-w-4xl rounded-3xl border border-amber-100/15 bg-[#171513]/50 px-5 py-7 backdrop-blur-xl sm:mt-16 sm:px-8 sm:py-9">
              <div className="mb-5 text-center">
                <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">Criterio y transparencia</p>
                <h2 className="font-serif text-2xl font-normal">Sobre esta selección</h2>
              </div>
              <div className="space-y-4 text-sm leading-7 text-white/65">
                <p>
                  Las lecturas de Calmavibe se presentan como recursos de reflexión, bienestar y conocimiento. La colección reúne obras de filosofía, literatura y divulgación psicológica; su presencia aquí no significa que Calmavibe, la APA o la ADAA las respalden como tratamiento o recomendación clínica.
                </p>
                <p>
                  Las descripciones de esta página están redactadas para Calmavibe y buscan presentar cada obra de forma general, sin reproducir sus textos. Los títulos y nombres de autor se muestran para identificar las publicaciones; los derechos correspondientes pertenecen a sus respectivos titulares.
                </p>
                <p className="border-t border-white/10 pt-4 text-white/50">
                  Calmavibe no aloja ni distribuye los libros. La lectura puede aportar información y reflexión, pero no sustituye una evaluación ni la atención de un profesional de la salud.
                </p>
              </div>
            </aside>
          </div>
        ) : (
          <article className="mx-auto max-w-6xl">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#171513]/55 px-4 py-2.5 text-sm text-white/80 backdrop-blur-lg transition hover:border-amber-100/35 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200/70"
            >
              <span aria-hidden="true">←</span> Volver a la biblioteca
            </button>

            <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-7">
              <aside className="relative overflow-hidden rounded-3xl border border-amber-100/20 bg-[#171513]/65 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8 lg:sticky lg:top-8">
                <span className="absolute -right-3 -top-8 font-serif text-[150px] font-light leading-none text-amber-100/[0.06]" aria-hidden="true">✧</span>
                <p className="relative mb-7 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">Biblioteca Calmavibe</p>
                <div className="relative flex min-h-[250px] flex-col justify-between border-y border-amber-100/20 py-7 sm:min-h-[300px] sm:py-9">
                  <span className="text-sm text-amber-100/70" aria-hidden="true">✧ ✧ ✧</span>
                  <div>
                    <h1 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl">{selected.title}</h1>
                    <p className="mt-4 text-sm leading-6 text-white/60">{selected.author}</p>
                  </div>
                  <p className="mt-8 text-[9px] uppercase tracking-[0.23em] text-white/40">Una recomendación de lectura</p>
                </div>
                <p className="mt-6 text-sm leading-7 text-amber-50/75">{selected.moment}</p>
              </aside>

              <div className="rounded-3xl border border-white/10 bg-[#171513]/65 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8 lg:p-10">
                <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-amber-100/65">Una lectura para descubrir</p>
                <div className="mb-8 h-px w-16 bg-amber-200/50" />
                <section className="mb-8 sm:mb-10">
                  <h2 className="mb-3 font-serif text-2xl font-normal sm:text-3xl">La historia detrás de la obra</h2>
                  <p className="text-sm leading-7 text-white/75 sm:text-base sm:leading-8">{selected.synopsis}</p>
                </section>
                <section className="mb-8 rounded-2xl border border-amber-100/15 bg-amber-100/[0.045] p-5 sm:mb-10 sm:p-6">
                  <p className="mb-2 text-[10px] uppercase tracking-[0.24em] text-amber-100/65">Por qué la elegimos</p>
                  <h2 className="mb-3 font-serif text-xl font-normal sm:text-2xl">¿Por qué está en Calmavibe?</h2>
                  <p className="text-sm leading-7 text-white/75 sm:text-base sm:leading-8">{selected.whyCalmavibe}</p>
                </section>
                {selected.sensitive && (
                  <section className="mb-8 rounded-2xl border border-amber-100/15 bg-black/20 p-5 sm:p-6" aria-label="Aviso de contenido sensible">
                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100/80">Contenido sensible</h2>
                    <p className="text-sm leading-6 text-white/65">{selected.sensitive}</p>
                  </section>
                )}
                <footer className="border-t border-white/10 pt-5 text-xs leading-6 text-white/50">
                  Calmavibe no almacena ni distribuye esta obra. Puedes buscar una edición en una biblioteca o librería de tu elección. Los derechos de la publicación corresponden a sus titulares; su mención no implica patrocinio ni afiliación.
                </footer>
              </div>
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
}
