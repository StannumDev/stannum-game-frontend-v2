import { Program } from "@/interfaces";
import tia_logo from '@/assets/programs/trenno_ia_logo.webp';
import tia_summer_logo from '@/assets/programs/trenno_ia_summer_logo.webp';
import tmd_logo from '@/assets/programs/trenno_mark_digital_logo.webp';
import background_tia from '@/assets/background/stannum_game_trophy.webp';
import background_tmd from '@/assets/background/stannum_game_trophy.webp';
import background_tia_summer from '@/assets/background/background_tia_summer.webp';

const muxPlaybackIds: Record<string, string> = JSON.parse(process.env.NEXT_PUBLIC_MUX_IDS || "{}");

export const TIA_PROGRAM: Program = {
    id: "tia",
    name: "TRENNO IA",
    price: 50,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfK4Wp2c27wa-xxfgd4Bw9AhY7cuUHsLL4Rk4_YXAbuz2zL4Q/viewform?usp=sharing&ouid=118137140539958374058",
    categories: ["main"],
    description: "Programa intensivo especializado en el entrenamiento en inteligencia artificial para líderes de empresas y sus equipos.",
    logo: tia_logo,
    background: background_tia,
    sections: [
        {
            id: "preseason",
            name: "Pretemporada",
            modules: [
                {
                    id: "TIAM01",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a dominar y redactar PROMPTs como un profesional.",
                    lessons: [
                        { id: "TIAM01L01", title: "El Mapa Definitivo para Dominar la Inteligencia Artificial y Multiplicar tu Productividad", longTitle: "El Mapa Definitivo para Dominar la Inteligencia Artificial y Multiplicar tu Productividad - Dominio de PROMPTS | TRENNO IA", description: "<p>¿Sientes que solo estás \"jugando\" con la Inteligencia Artificial en lugar de usarla para obtener resultados reales? En esta lección fundamental del programa <strong>TRENNO iA</strong>, te mostramos cómo pasar de ser un simple usuario a convertirte en un \"piloto de Fórmula 1\" de la IA, capaz de dominar la máquina para facilitar tu trabajo, tomar decisiones más rápidas y hacer que tu equipo sea exponencialmente más productivo.</p><h3>En este video descubrirás la hoja de ruta esencial: Los 5 Dominios de la IA</h3><p>Dominar la inteligencia artificial no es un concepto abstracto, sino un camino estructurado. Te guiamos a través de las 5 áreas clave que necesitas controlar:</p><ol><li><strong>Ser Diseñador de Prompts:</strong> Aprende la habilidad número uno del mercado laboral actual. No se trata solo de preguntar, sino de dar instrucciones precisas para obtener resultados poderosos.</li><li><strong>Saber Personalizar:</strong> Descubre cómo alimentar a la IA con tus propios datos para adaptar un chat, un GPT o un proyecto completo a las necesidades de tu negocio, procesos o clientes.</li><li><strong>Funciones Avanzadas:</strong> Ve más allá del chat básico y aprovecha las herramientas avanzadas que ofrecen los grandes modelos de lenguaje como ChatGPT para simplificar tareas complejas.</li><li><strong>Ser Entrenador de GPTs:</strong> Conviértete en un creador. Te enseñamos a entrenar tus propias versiones personalizadas de IA para que actúen como asistentes expertos en diferentes áreas de tu vida y trabajo.</li><li><strong>Automatización con IA:</strong> El nivel máximo de dominio. Aprende a utilizar la IA para crear automatizaciones que multipliquen tu capacidad operativa y la de tu equipo, liberando tiempo para lo que realmente importa.</li></ol><h3>Objetivos para una implementación exitosa</h3><p>Además, establecemos los objetivos prácticos que guiarán tu viaje en la implementación de la inteligencia artificial en tu día a día:</p><ul><li>Naturalizar la utilización de la IA en tu trabajo diario.</li><li>Desarrollar un criterio personal fuerte para el desarrollo de PROMPTs.</li><li>Iterar en la interacción con la IA hasta conseguir el resultado deseado.</li><li>Aprender a EXTRAER y CURAR las respuestas para ser utilizadas en la vida real.</li></ul><p>Este video es tu punto de partida para entender la máquina y, finalmente, dominarla. Prepárate para iniciar tu entrenamiento en STANNUM Game.</p>", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TIAM01L02", title: "El \"Motor\" de la IA al Descubierto: Domina los 5 Conceptos que te Harán un Experto", longTitle: "El \"Motor\" de la IA al Descubierto: Domina los 5 Conceptos que te Harán un Experto - Dominio de PROMPTS | TRENNO IA", description: "<p>Para dominar la Inteligencia Artificial, primero debes entender cómo funciona su 'motor'. Al igual que un piloto de Fórmula 1 conoce cada componente de su vehículo para llevarlo al límite, en esta lección del programa <strong>TRENNO iA</strong> desglosamos la tecnología que impulsa a herramientas como ChatGPT. Deja de usar la IA a ciegas y empieza a controlarla con conocimiento.</p><h3>¿Qué aprenderás en esta lección clave?</h3><p>Te explicamos de manera sencilla y directa los 5 conceptos fundamentales que forman la base de la inteligencia artificial moderna. Entenderlos es el primer paso para dejar de ser un aficionado y convertirte en un profesional.</p><ul><li><strong>Deep Learning (Aprendizaje Profundo):</strong> Descubre cómo la IA imita el aprendizaje del cerebro humano a través de \"capas profundas\" de procesamiento para reconocer patrones complejos.</li><li><strong>GPT (Transformador Generativo Preentrenado):</strong> Desglosamos el acrónimo que define a ChatGPT. Entenderás qué significa que sea 'Generativo', por qué su 'Preentrenamiento' es clave y cómo la arquitectura 'Transformer' revolucionó el campo.</li><li><strong>RNA (Redes Neuronales Artificiales):</strong> Visualiza las estructuras inspiradas en las neuronas de nuestro cerebro que permiten a la IA procesar información y aprender.</li><li><strong>LLM (Gran Modelo de Lenguaje):</strong> Comprende qué es exactamente un 'Large Language Model' y por qué modelos como ChatGPT o Gemini pertenecen a esta categoría de gigantes tecnológicos.</li><li><strong>NLP (Procesamiento del Lenguaje Natural):</strong> Conoce el campo de la IA que permite a las máquinas entender, interpretar y responder a nuestro lenguaje, haciendo posible la interacción que hoy experimentas.</li></ul><h3>De la teoría a la práctica</h3><p>A través de analogías claras, como la diferencia entre un atleta amateur (ChatGPT 3.5) y un atleta olímpico con todo un equipo de soporte (ChatGPT 4o), te ayudamos a visualizar por qué el 'entrenamiento' y la 'arquitectura' de un modelo son tan importantes.</p><p>Esta lección es esencial en tu camino para dominar la Inteligencia Artificial. ¡Prepárate para encender el motor y tomar el control en STANNUM Game!</p>", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TIAM01L03", title: "El Volante de la IA: Cómo Diseñar Prompts para Obtener Resultados Perfectos", longTitle: "El Volante de la IA: Cómo Diseñar Prompts para Obtener Resultados Perfectos - Dominio de PROMPTS | TRENNO IA", description: "<p>¿Sientes que tus conversaciones con la IA son superficiales y no obtienes la respuesta que buscas? La mayoría de las personas usan ChatGPT como un simple buscador, pero su verdadero poder se desata cuando aprendes a darle <strong>instrucciones precisas</strong>. En esta lección del programa <strong>TRENNO iA</strong>, te enseñamos a tomar el control del \"volante\" de la inteligencia artificial.</p><h3>¿Qué es el Diseño de Prompts y por qué es la habilidad clave?</h3><p>El diseño de prompts (o <em>Prompt Engineering</em>) es el arte y la ciencia de crear las instrucciones perfectas para guiar a la IA. Es el primer dominio que debes conquistar para dominar la tecnología.</p>    <h3>En este video aprenderás a:</h3><ul><li><strong>Entender qué es un Prompt:</strong> Mucho más que una pregunta, es la instrucción que define el éxito o el fracaso de tu interacción.</li><li><strong>Identificar los 4 factores que influyen en la respuesta de la IA:</strong> Descubre cómo la forma en que escribes, el historial de la conversación, la memoria de la IA y las instrucciones personalizadas condicionan cada resultado.</li><li><strong>Aplicar la técnica de asignación de roles:</strong> A través de un ejercicio práctico, verás cómo un simple cambio en el prompt (como pedirle a la IA que \"actúe como un profesor de primaria\") transforma una respuesta técnica en una explicación clara y didáctica.</li><li><strong>Distinguir entre el sustantivo y el verbo de tu prompt:</strong> Aprende a estructurar tus peticiones dividiéndolas en el tema central (parte A) y la acción que deseas (parte B) para lograr una comunicación efectiva.</li></ul><p>Deja de usar la IA como si fuera Google. Después de esta lección, sabrás cómo dirigirla para que trabaje para ti con la precisión de un experto. ¡Es hora de empezar a diseñar en STANNUM Game!</p>", duration: 555, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TIAM01L04", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Ya conoces la máquina y entiendes su potencial. Ahora, es momento de tomar el volante. Un monoplaza de Fórmula 1 puede ser el más rápido, pero sin un piloto que sepa exactamente cómo, cuándo y dónde dar cada instrucción, nunca cruzará la línea de meta en primer lugar. El Diseño de Prompts es tu volante, tu acelerador y tus frenos: es el arte de comunicarte con la IA con la precisión de un campeón. <br/> Este video se enfoca en el Dominio #1, la habilidad más crucial para convertirte en un verdadero experto. Aquí es donde separas a los espectadores de los pilotos de élite. No se trata solo de hacer preguntas, se trata de dar órdenes, de diseñar la instrucción perfecta para obtener el resultado exacto que necesitas.<br/> En esta sesión de entrenamiento práctico, aprenderás a:<br/> Definir el Prompt Perfecto: Descubre qué es realmente un prompt y por qué es la herramienta más poderosa para dirigir la IA.<br/> Las 4 Claves del Mando: Entenderás las cuatro influencias fundamentales que condicionan cada respuesta de la IA, desde la forma en que escribes hasta el uso de roles e historial.<br/> De la Petición a la Orden: Te mostraremos en vivo cómo transformar una pregunta simple en un comando estratégico que te entregue resultados superiores, más rápidos y más precisos.<br/> Evitar los Errores de Novato: Aprende a identificar por qué la IA no te da lo que quieres y cómo refinar tus instrucciones para que te entienda a la perfección.<br/> El prompt es el puente entre tu intención y el poder de la máquina. Un buen piloto no solo pisa el acelerador, lo domina.<br/> Prepárate para afinar tus habilidades de comunicación con la máquina y dar las órdenes que te llevarán directo a la victoria.<br/>", duration: 497, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
                        { id: "TIAM01L05", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "¡Eleva tu juego con la ingeniería de prompts y domina la cancha de la inteligencia artificial! En este video, te convertirás en un verdadero estratega de la IA. Aprenderás a diseñar PROMPTs o instrucciones tan precisas y potentes que transformarán por completo tus resultados. Descubre la fórmula secreta para comunicarte con la inteligencia artificial como un auténtico profesional y llevar tus proyectos al siguiente nivel.<br/> En esta sesión de entrenamiento intensivo, aprenderás a dominar los 6 elementos clave para crear el prompt perfecto:<br/> Sustantivo Clave / Tema (A): Define el campo de juego. Aprenderás a establecer el núcleo de tu solicitud para que la IA se enfoque en lo que realmente importa.<br/> Verbo / Intención (B): Marca la jugada. Descubrirás cómo usar verbos de acción para dirigir a la IA con una intención clara y obtener exactamente lo que necesitas.<br/> Rol (C): Asigna la posición. Aprende a darle a la IA un rol específico para que actúe como un experto en cualquier campo que imagines, desde un profesor de primaria hasta un estratega de marketing.<br/> Forma / Salida / Respuesta (D): Diseña la victoria. Define el formato en el que quieres recibir la información, ya sea un cuento, un correo electrónico, un análisis detallado o cualquier otra cosa que necesites para ganar.<br/> Contexto Infinito (E): Controla el balón. Descubre cómo proporcionar el contexto necesario para que la IA entienda la situación completa y te ofrezca respuestas más ricas y relevantes.<br/> Adjetivo (F): Añade tu estilo. Aprende a usar adjetivos para darle a la respuesta de la IA el tono y la personalidad que desees, desde creativo y mágico hasta profesional y directo.<br/> ¡Prepárate para desatar todo tu potencial! Con estas técnicas, dejarás de ser un espectador y te convertirás en un jugador clave en el mundo de la inteligencia artificial. ¡Es hora de jugar para ganar", duration: 585, muxPlaybackId: muxPlaybackIds["TIAM01L05"] ?? "" },
                        { id: "TIAM01L06", title: "Comprender la INTERFAZ de ChatGPT", longTitle: "Comprender la INTERFAZ de ChatGPT - Dominio de PROMPTS | TRENNO IA", description: "Sin descripción.", duration: 434, muxPlaybackId: muxPlaybackIds["TIAM01L06"] ?? "" },
                        { id: "TIAM01L07", title: "Ejercicio: \"UN LIBRO\"", longTitle: "Ejercicio: \"UN LIBRO\" - Dominio de PROMPTS | TRENNO IA", description: "¡Prepárate para llevar tus interacciones con la IA al siguiente nivel! Este video es tu campo de entrenamiento para convertirte en un verdadero maestro del Prompt Engineering con ChatGPT.<br/> ¿Listo para una sesión intensiva? Aquí aprenderás a construir prompts que no solo obtengan respuestas, sino que te brinden soluciones accionables y personalizadas, como si tuvieras un equipo de expertos dedicados.<br/> Descubre cómo optimizar tu juego:<br/> Define tu Sustantivo Clave/Tema: La base de tu estrategia. ¿Sobre qué quieres que la IA se concentre?<br/> Marca tu Verbo/Intención: No es solo preguntar, es dirigir la acción. ¿Qué acción específica quieres que realice la IA?<br/> Asigna un Rol: Transforma la IA en un experto aliado. ¿Quieres que actúe como un especialista en marketing digital, un autor o incluso un amigo?<br/> Perfecciona la Forma/Salida/Respuesta: Diseña la presentación. Desde rankings detallados hasta resúmenes por capítulos, la forma de la respuesta es clave para su utilidad.<br/> Añade Contexto Infinito: La profundidad es poder. Cuantos más detalles y matices le des, más relevante y adaptada será la respuesta a tus necesidades específicas (por ejemplo, cómo implementar una estrategia de marketing en tu propia empresa).<br/> Incluye Adjetivos: Dale el toque final. ¿Qué tan creativo, práctico o directo quieres que sea el resultado?<br/> Observa la evolución en acción: Desde una búsqueda básica hasta un plan de implementación detallado de 3 semanas, con roles, tareas diarias y consejos específicos para tu equipo. Este video demuestra cómo cada capa de un prompt bien diseñado te acerca a la perfección en la productividad y la estrategia.<br/> ¡Es hora de entrenar a tu IA como un campeón! Aplica estas técnicas y transforma la forma en que trabajas.<br/>", duration: 582, muxPlaybackId: muxPlaybackIds["TIAM01L07"] ?? "" },
                    ],
                    instructions: [
                        // {
                        //     id: "TIAM01I01",
                        //     title: "Organiza tu carpeta principal",
                        //     shortDescription: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
                        //     description: "Hola",
                        //     difficulty: "LOW",
                        //     rewardXP: 200,
                        //     acceptedFormats: [".jpg", ".jpeg", ".png"],
                        //     maxFileSizeMB: 15,
                        //     deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive.",
                        //     resources: [],
                        // }
                    ]
                },
                {
                    id: "TIAM02",
                    name: "Personalización de ChatGPT",
                    description: "Conviertete en un experto en la personalización de ChatGPT.",
                    lessons: [
                        { id: "TIAM02L01", title: "Preparando el contexto para empezar a PERSONALIZAR", longTitle: "Preparando el contexto para empezar a PERSONALIZAR - Personalización de ChatGPT | TRENNO IA", description: "¡Entrena a tu IA, Conquista tus Metas!<br/> ¡Prepárate para llevar tu juego al siguiente nivel! En esta sesión, nos sumergimos de lleno en el Dominio 2: Saber Personalizar. Ya no se trata solo de usar la inteligencia artificial, sino de convertirla en tu aliada estratégica más poderosa.<br/> Descubre cómo transformar a tu asistente de IA en un verdadero copiloto de alto rendimiento, un experto que conoce tu visión, tu misión y tus objetivos tan bien como tú. Aprenderás a alimentar el chat con la información clave de tu negocio, desde tu propuesta de valor hasta el perfil de tu cliente ideal, para que cada respuesta sea un paso más hacia la victoria.<br/> Este no es un entrenamiento cualquiera; es el comienzo de tu camino para convertirte en un verdadero entrenador de IA. Si estás listo para dejar de ser un simple usuario y empezar a liderar con tecnología, ¡dale al play y comencemos a construir tu legado<br/>", duration: 437, muxPlaybackId: muxPlaybackIds["TIAM02L01"] ?? "" },
                        { id: "TIAM02L02", title: "Cómo personalizar a ChatGPT Parte 1", longTitle: "Cómo personalizar a ChatGPT Parte 1 - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 420, muxPlaybackId: muxPlaybackIds["TIAM02L02"] ?? "" },
                        { id: "TIAM02L03", title: "Cómo personalizar a ChatGPT Parte 2", longTitle: "Cómo personalizar a ChatGPT Parte 2 - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 584, muxPlaybackId: muxPlaybackIds["TIAM02L03"] ?? "" },
                        { id: "TIAM02L04", title: "Ejercicio: \"Desarrollar información clave del negocio con IA\"", longTitle: "Ejercicio: \"Desarrollar información clave del negocio con IA\" - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 413, muxPlaybackId: muxPlaybackIds["TIAM02L04"] ?? "" },
                        { id: "TIAM02L05", title: "Instrucciones PERSONALIZADAS de ChatGPT", longTitle: "Instrucciones PERSONALIZADAS de ChatGPT - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 597, muxPlaybackId: muxPlaybackIds["TIAM02L05"] ?? "" },
                        { id: "TIAM02L06", title: "Estructura básica de generación de prompts: Fórmula RACS", longTitle: "Estructura básica de generación de prompts: Fórmula RACS - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 576, muxPlaybackId: muxPlaybackIds["TIAM02L06"] ?? "" },
                        { id: "TIAM02L07", title: "Personalización de áreas del negocio: Área Marketing", longTitle: "Personalización de áreas del negocio: Área Marketing - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 554, muxPlaybackId: muxPlaybackIds["TIAM02L07"] ?? "" },
                        { id: "TIAM02L08", title: "Personalización de áreas del negocio: Área Ventas", longTitle: "Personalización de áreas del negocio: Área Ventas - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 546, muxPlaybackId: muxPlaybackIds["TIAM02L08"] ?? "" },
                        { id: "TIAM02L09", title: "Roles en el área de ventas", longTitle: "Roles en el área de ventas - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 545, muxPlaybackId: muxPlaybackIds["TIAM02L09"] ?? "" },
                        { id: "TIAM02L10", title: "Exploración de ROLES: El principio de los Asistentes virtuales", longTitle: "Exploración de ROLES: El principio de los Asistentes virtuales - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 499, muxPlaybackId: muxPlaybackIds["TIAM02L10"] ?? "" },
                        { id: "TIAM02L11", title: "Tipologías de PROMPTs", longTitle: "Tipologías de PROMPTs - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 571, muxPlaybackId: muxPlaybackIds["TIAM02L11"] ?? "" },
                        { id: "TIAM02L12", title: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO", longTitle: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 229, muxPlaybackId: muxPlaybackIds["TIAM02L12"] ?? "" },
                        { id: "TIAM02L13", title: "Cómo DELEGAR: Fórmula RODOIR", longTitle: "Cómo DELEGAR: Fórmula RODOIR - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 572, muxPlaybackId: muxPlaybackIds["TIAM02L13"] ?? "" },
                        { id: "TIAM02L14", title: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs", longTitle: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 580, muxPlaybackId: muxPlaybackIds["TIAM02L14"] ?? "" },
                    ],
                    instructions: []
                },
            ],
        },
        {
            id: "resources",
            name: "Recursos",
            resources: [
                {
                    title: "La esencia del negocio",
                    description: "Presentación",
                    link: "https://docs.google.com/presentation/d/1dxt94sAG4Xmu3lHXseigHr2okfjP0SEeUvrq1cC78LE/edit?usp=sharing",
                    type: "presentation",
                },
                {
                    title: "La esencia del negocio",
                    description: "Carpeta de documentos claves",
                    link: "https://drive.google.com/drive/folders/1xYUmjLEuIbIq_mq2uqRtSD13diRumokt?usp=sharing",
                    type: "folder",
                },
                {
                    title: "Proceso de contratación: ChatGPT Plus",
                    description: "Documento de soporte",
                    link: "https://docs.google.com/document/d/1iIxxIFbnV_pk3faDHrsGFZ72MpLSWQj6F2j0h0tzw28/edit?usp=sharing",
                    type: "document",
                },
                {
                    title: "Plantilla para el desarrollo del ROL",
                    description: "Documento",
                    link: "https://docs.google.com/document/d/1bvQQL7b76_FBS90zh-Usww1nGjgJ5U3dNevEyNMwkxw/edit?usp=sharing",
                    type: "document",
                },
                {
                    title: "Tu Asistente Estratégico",
                    description: "Ejercicios Prácticos de Consolidación",
                    link: "https://docs.google.com/document/d/1ZKM2XKAa9pJDyWVJLVA6xlRgFYAVUeUTUJmi8Vyv2Zg/edit?usp=sharing",
                    type: "activity",
                },
                {
                    title: "Copiloto de Ventas",
                    description: "Ejercicios Prácticos de Consolidación",
                    link: "https://docs.google.com/document/d/1phUM86e8z5_ysDYw4NXBSY5yp4VfyIzLsncXZ3MSKaM/edit?usp=sharing",
                    type: "activity",
                },
                {
                    title: "Diversificación de Mensajes",
                    description: "Ejercicios Prácticos de Consolidación",
                    link: "https://docs.google.com/document/d/1sYsaTKLTXeAaLkP9h8HNqm9-S0bm1ME5jKw52ctuUww/edit?usp=sharing",
                    type: "activity",
                },
                {
                    title: "Desafío de Contenido Multimedia",
                    description: "Ejercicios Prácticos de Consolidación",
                    link: "https://docs.google.com/document/d/1Qy-F93URmiGAZjgJm0nvUvGiOgudCE12WPcMQyMANr0/edit?usp=sharing",
                    type: "activity",
                },
                {
                    title: "Inteligencia Documental",
                    description: "Ejercicios Prácticos de Consolidación",
                    link: "https://docs.google.com/document/d/1CV-Vxh_E1mMnzf_o4uR6rBhpkDF28s15eQ_-WVAqY9w/edit?usp=sharing",
                    type: "activity",
                },
            ],
        },
    ],
};

export const TIA_SUMMER_PROGRAM: Program = {
    id: "tia_summer",
    name: "TRENNO IA SUMMER",
    price: 250,
    href: "https://stannum.com.ar/trenno-ia-summer-2026",
    categories: ["main"],
    description: "Programa intensivo especializado en el entrenamiento en inteligencia artificial para líderes de empresas y sus equipos.",
    logo: tia_summer_logo,
    background: background_tia_summer,
    sections: [
        {
            id: "preseason",
            name: "Pretemporada",
            modules: [
                {
                    id: "TIASM01",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a dominar y redactar PROMPTs como un profesional.",
                    lessons: [
                        { id: "TIASM01L01", title: "El Mapa Definitivo para Dominar la Inteligencia Artificial y Multiplicar tu Productividad", longTitle: "El Mapa Definitivo para Dominar la Inteligencia Artificial y Multiplicar tu Productividad - Dominio de PROMPTS | TRENNO IA", description: "<p>¿Sientes que solo estás \"jugando\" con la Inteligencia Artificial en lugar de usarla para obtener resultados reales? En esta lección fundamental del programa <strong>TRENNO iA</strong>, te mostramos cómo pasar de ser un simple usuario a convertirte en un \"piloto de Fórmula 1\" de la IA, capaz de dominar la máquina para facilitar tu trabajo, tomar decisiones más rápidas y hacer que tu equipo sea exponencialmente más productivo.</p><h3>En este video descubrirás la hoja de ruta esencial: Los 5 Dominios de la IA</h3><p>Dominar la inteligencia artificial no es un concepto abstracto, sino un camino estructurado. Te guiamos a través de las 5 áreas clave que necesitas controlar:</p><ol><li><strong>Ser Diseñador de Prompts:</strong> Aprende la habilidad número uno del mercado laboral actual. No se trata solo de preguntar, sino de dar instrucciones precisas para obtener resultados poderosos.</li><li><strong>Saber Personalizar:</strong> Descubre cómo alimentar a la IA con tus propios datos para adaptar un chat, un GPT o un proyecto completo a las necesidades de tu negocio, procesos o clientes.</li><li><strong>Funciones Avanzadas:</strong> Ve más allá del chat básico y aprovecha las herramientas avanzadas que ofrecen los grandes modelos de lenguaje como ChatGPT para simplificar tareas complejas.</li><li><strong>Ser Entrenador de GPTs:</strong> Conviértete en un creador. Te enseñamos a entrenar tus propias versiones personalizadas de IA para que actúen como asistentes expertos en diferentes áreas de tu vida y trabajo.</li><li><strong>Automatización con IA:</strong> El nivel máximo de dominio. Aprende a utilizar la IA para crear automatizaciones que multipliquen tu capacidad operativa y la de tu equipo, liberando tiempo para lo que realmente importa.</li></ol><h3>Objetivos para una implementación exitosa</h3><p>Además, establecemos los objetivos prácticos que guiarán tu viaje en la implementación de la inteligencia artificial en tu día a día:</p><ul><li>Naturalizar la utilización de la IA en tu trabajo diario.</li><li>Desarrollar un criterio personal fuerte para el desarrollo de PROMPTs.</li><li>Iterar en la interacción con la IA hasta conseguir el resultado deseado.</li><li>Aprender a EXTRAER y CURAR las respuestas para ser utilizadas en la vida real.</li></ul><p>Este video es tu punto de partida para entender la máquina y, finalmente, dominarla. Prepárate para iniciar tu entrenamiento en STANNUM Game.</p>", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TIASM01L02", title: "El \"Motor\" de la IA al Descubierto: Domina los 5 Conceptos que te Harán un Experto", longTitle: "El \"Motor\" de la IA al Descubierto: Domina los 5 Conceptos que te Harán un Experto - Dominio de PROMPTS | TRENNO IA", description: "<p>Para dominar la Inteligencia Artificial, primero debes entender cómo funciona su 'motor'. Al igual que un piloto de Fórmula 1 conoce cada componente de su vehículo para llevarlo al límite, en esta lección del programa <strong>TRENNO iA</strong> desglosamos la tecnología que impulsa a herramientas como ChatGPT. Deja de usar la IA a ciegas y empieza a controlarla con conocimiento.</p><h3>¿Qué aprenderás en esta lección clave?</h3><p>Te explicamos de manera sencilla y directa los 5 conceptos fundamentales que forman la base de la inteligencia artificial moderna. Entenderlos es el primer paso para dejar de ser un aficionado y convertirte en un profesional.</p><ul><li><strong>Deep Learning (Aprendizaje Profundo):</strong> Descubre cómo la IA imita el aprendizaje del cerebro humano a través de \"capas profundas\" de procesamiento para reconocer patrones complejos.</li><li><strong>GPT (Transformador Generativo Preentrenado):</strong> Desglosamos el acrónimo que define a ChatGPT. Entenderás qué significa que sea 'Generativo', por qué su 'Preentrenamiento' es clave y cómo la arquitectura 'Transformer' revolucionó el campo.</li><li><strong>RNA (Redes Neuronales Artificiales):</strong> Visualiza las estructuras inspiradas en las neuronas de nuestro cerebro que permiten a la IA procesar información y aprender.</li><li><strong>LLM (Gran Modelo de Lenguaje):</strong> Comprende qué es exactamente un 'Large Language Model' y por qué modelos como ChatGPT o Gemini pertenecen a esta categoría de gigantes tecnológicos.</li><li><strong>NLP (Procesamiento del Lenguaje Natural):</strong> Conoce el campo de la IA que permite a las máquinas entender, interpretar y responder a nuestro lenguaje, haciendo posible la interacción que hoy experimentas.</li></ul><h3>De la teoría a la práctica</h3><p>A través de analogías claras, como la diferencia entre un atleta amateur (ChatGPT 3.5) y un atleta olímpico con todo un equipo de soporte (ChatGPT 4o), te ayudamos a visualizar por qué el 'entrenamiento' y la 'arquitectura' de un modelo son tan importantes.</p><p>Esta lección es esencial en tu camino para dominar la Inteligencia Artificial. ¡Prepárate para encender el motor y tomar el control en STANNUM Game!</p>", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TIASM01L03", title: "El Volante de la IA: Cómo Diseñar Prompts para Obtener Resultados Perfectos", longTitle: "El Volante de la IA: Cómo Diseñar Prompts para Obtener Resultados Perfectos - Dominio de PROMPTS | TRENNO IA", description: "<p>¿Sientes que tus conversaciones con la IA son superficiales y no obtienes la respuesta que buscas? La mayoría de las personas usan ChatGPT como un simple buscador, pero su verdadero poder se desata cuando aprendes a darle <strong>instrucciones precisas</strong>. En esta lección del programa <strong>TRENNO iA</strong>, te enseñamos a tomar el control del \"volante\" de la inteligencia artificial.</p><h3>¿Qué es el Diseño de Prompts y por qué es la habilidad clave?</h3><p>El diseño de prompts (o <em>Prompt Engineering</em>) es el arte y la ciencia de crear las instrucciones perfectas para guiar a la IA. Es el primer dominio que debes conquistar para dominar la tecnología.</p>    <h3>En este video aprenderás a:</h3><ul><li><strong>Entender qué es un Prompt:</strong> Mucho más que una pregunta, es la instrucción que define el éxito o el fracaso de tu interacción.</li><li><strong>Identificar los 4 factores que influyen en la respuesta de la IA:</strong> Descubre cómo la forma en que escribes, el historial de la conversación, la memoria de la IA y las instrucciones personalizadas condicionan cada resultado.</li><li><strong>Aplicar la técnica de asignación de roles:</strong> A través de un ejercicio práctico, verás cómo un simple cambio en el prompt (como pedirle a la IA que \"actúe como un profesor de primaria\") transforma una respuesta técnica en una explicación clara y didáctica.</li><li><strong>Distinguir entre el sustantivo y el verbo de tu prompt:</strong> Aprende a estructurar tus peticiones dividiéndolas en el tema central (parte A) y la acción que deseas (parte B) para lograr una comunicación efectiva.</li></ul><p>Deja de usar la IA como si fuera Google. Después de esta lección, sabrás cómo dirigirla para que trabaje para ti con la precisión de un experto. ¡Es hora de empezar a diseñar en STANNUM Game!</p>", duration: 555, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TIASM01L04", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Ya conoces la máquina y entiendes su potencial. Ahora, es momento de tomar el volante. Un monoplaza de Fórmula 1 puede ser el más rápido, pero sin un piloto que sepa exactamente cómo, cuándo y dónde dar cada instrucción, nunca cruzará la línea de meta en primer lugar. El Diseño de Prompts es tu volante, tu acelerador y tus frenos: es el arte de comunicarte con la IA con la precisión de un campeón. <br/> Este video se enfoca en el Dominio #1, la habilidad más crucial para convertirte en un verdadero experto. Aquí es donde separas a los espectadores de los pilotos de élite. No se trata solo de hacer preguntas, se trata de dar órdenes, de diseñar la instrucción perfecta para obtener el resultado exacto que necesitas.<br/> En esta sesión de entrenamiento práctico, aprenderás a:<br/> Definir el Prompt Perfecto: Descubre qué es realmente un prompt y por qué es la herramienta más poderosa para dirigir la IA.<br/> Las 4 Claves del Mando: Entenderás las cuatro influencias fundamentales que condicionan cada respuesta de la IA, desde la forma en que escribes hasta el uso de roles e historial.<br/> De la Petición a la Orden: Te mostraremos en vivo cómo transformar una pregunta simple en un comando estratégico que te entregue resultados superiores, más rápidos y más precisos.<br/> Evitar los Errores de Novato: Aprende a identificar por qué la IA no te da lo que quieres y cómo refinar tus instrucciones para que te entienda a la perfección.<br/> El prompt es el puente entre tu intención y el poder de la máquina. Un buen piloto no solo pisa el acelerador, lo domina.<br/> Prepárate para afinar tus habilidades de comunicación con la máquina y dar las órdenes que te llevarán directo a la victoria.<br/>", duration: 497, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
                        { id: "TIASM01L05", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "¡Eleva tu juego con la ingeniería de prompts y domina la cancha de la inteligencia artificial! En este video, te convertirás en un verdadero estratega de la IA. Aprenderás a diseñar PROMPTs o instrucciones tan precisas y potentes que transformarán por completo tus resultados. Descubre la fórmula secreta para comunicarte con la inteligencia artificial como un auténtico profesional y llevar tus proyectos al siguiente nivel.<br/> En esta sesión de entrenamiento intensivo, aprenderás a dominar los 6 elementos clave para crear el prompt perfecto:<br/> Sustantivo Clave / Tema (A): Define el campo de juego. Aprenderás a establecer el núcleo de tu solicitud para que la IA se enfoque en lo que realmente importa.<br/> Verbo / Intención (B): Marca la jugada. Descubrirás cómo usar verbos de acción para dirigir a la IA con una intención clara y obtener exactamente lo que necesitas.<br/> Rol (C): Asigna la posición. Aprende a darle a la IA un rol específico para que actúe como un experto en cualquier campo que imagines, desde un profesor de primaria hasta un estratega de marketing.<br/> Forma / Salida / Respuesta (D): Diseña la victoria. Define el formato en el que quieres recibir la información, ya sea un cuento, un correo electrónico, un análisis detallado o cualquier otra cosa que necesites para ganar.<br/> Contexto Infinito (E): Controla el balón. Descubre cómo proporcionar el contexto necesario para que la IA entienda la situación completa y te ofrezca respuestas más ricas y relevantes.<br/> Adjetivo (F): Añade tu estilo. Aprende a usar adjetivos para darle a la respuesta de la IA el tono y la personalidad que desees, desde creativo y mágico hasta profesional y directo.<br/> ¡Prepárate para desatar todo tu potencial! Con estas técnicas, dejarás de ser un espectador y te convertirás en un jugador clave en el mundo de la inteligencia artificial. ¡Es hora de jugar para ganar", duration: 585, muxPlaybackId: muxPlaybackIds["TIAM01L05"] ?? "" },
                        { id: "TIASM01L06", title: "Comprender la INTERFAZ de ChatGPT", longTitle: "Comprender la INTERFAZ de ChatGPT - Dominio de PROMPTS | TRENNO IA", description: "Sin descripción.", duration: 434, muxPlaybackId: muxPlaybackIds["TIAM01L06"] ?? "" },
                        { id: "TIASM01L07", title: "Ejercicio: \"UN LIBRO\"", longTitle: "Ejercicio: \"UN LIBRO\" - Dominio de PROMPTS | TRENNO IA", description: "¡Prepárate para llevar tus interacciones con la IA al siguiente nivel! Este video es tu campo de entrenamiento para convertirte en un verdadero maestro del Prompt Engineering con ChatGPT.<br/> ¿Listo para una sesión intensiva? Aquí aprenderás a construir prompts que no solo obtengan respuestas, sino que te brinden soluciones accionables y personalizadas, como si tuvieras un equipo de expertos dedicados.<br/> Descubre cómo optimizar tu juego:<br/> Define tu Sustantivo Clave/Tema: La base de tu estrategia. ¿Sobre qué quieres que la IA se concentre?<br/> Marca tu Verbo/Intención: No es solo preguntar, es dirigir la acción. ¿Qué acción específica quieres que realice la IA?<br/> Asigna un Rol: Transforma la IA en un experto aliado. ¿Quieres que actúe como un especialista en marketing digital, un autor o incluso un amigo?<br/> Perfecciona la Forma/Salida/Respuesta: Diseña la presentación. Desde rankings detallados hasta resúmenes por capítulos, la forma de la respuesta es clave para su utilidad.<br/> Añade Contexto Infinito: La profundidad es poder. Cuantos más detalles y matices le des, más relevante y adaptada será la respuesta a tus necesidades específicas (por ejemplo, cómo implementar una estrategia de marketing en tu propia empresa).<br/> Incluye Adjetivos: Dale el toque final. ¿Qué tan creativo, práctico o directo quieres que sea el resultado?<br/> Observa la evolución en acción: Desde una búsqueda básica hasta un plan de implementación detallado de 3 semanas, con roles, tareas diarias y consejos específicos para tu equipo. Este video demuestra cómo cada capa de un prompt bien diseñado te acerca a la perfección en la productividad y la estrategia.<br/> ¡Es hora de entrenar a tu IA como un campeón! Aplica estas técnicas y transforma la forma en que trabajas.<br/>", duration: 582, muxPlaybackId: muxPlaybackIds["TIAM01L07"] ?? "" },
                    ],
                    instructions: []
                },
                {
                    id: "TIASM02",
                    name: "Personalización de ChatGPT",
                    description: "Conviertete en un experto en la personalización de ChatGPT.",
                    lessons: [
                        { id: "TIASM02L01", title: "Preparando el contexto para empezar a PERSONALIZAR", longTitle: "Preparando el contexto para empezar a PERSONALIZAR - Personalización de ChatGPT | TRENNO IA", description: "¡Entrena a tu IA, Conquista tus Metas!<br/> ¡Prepárate para llevar tu juego al siguiente nivel! En esta sesión, nos sumergimos de lleno en el Dominio 2: Saber Personalizar. Ya no se trata solo de usar la inteligencia artificial, sino de convertirla en tu aliada estratégica más poderosa.<br/> Descubre cómo transformar a tu asistente de IA en un verdadero copiloto de alto rendimiento, un experto que conoce tu visión, tu misión y tus objetivos tan bien como tú. Aprenderás a alimentar el chat con la información clave de tu negocio, desde tu propuesta de valor hasta el perfil de tu cliente ideal, para que cada respuesta sea un paso más hacia la victoria.<br/> Este no es un entrenamiento cualquiera; es el comienzo de tu camino para convertirte en un verdadero entrenador de IA. Si estás listo para dejar de ser un simple usuario y empezar a liderar con tecnología, ¡dale al play y comencemos a construir tu legado<br/>", duration: 437, muxPlaybackId: muxPlaybackIds["TIAM02L01"] ?? "" },
                        { id: "TIASM02L02", title: "Cómo personalizar a ChatGPT Parte 1", longTitle: "Cómo personalizar a ChatGPT Parte 1 - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 420, muxPlaybackId: muxPlaybackIds["TIAM02L02"] ?? "" },
                        { id: "TIASM02L03", title: "Cómo personalizar a ChatGPT Parte 2", longTitle: "Cómo personalizar a ChatGPT Parte 2 - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 584, muxPlaybackId: muxPlaybackIds["TIAM02L03"] ?? "" },
                        { id: "TIASM02L04", title: "Ejercicio: \"Desarrollar información clave del negocio con IA\"", longTitle: "Ejercicio: \"Desarrollar información clave del negocio con IA\" - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 413, muxPlaybackId: muxPlaybackIds["TIAM02L04"] ?? "" },
                        { id: "TIASM02L05", title: "Instrucciones PERSONALIZADAS de ChatGPT", longTitle: "Instrucciones PERSONALIZADAS de ChatGPT - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 597, muxPlaybackId: muxPlaybackIds["TIAM02L05"] ?? "" },
                        { id: "TIASM02L06", title: "Estructura básica de generación de prompts: Fórmula RACS", longTitle: "Estructura básica de generación de prompts: Fórmula RACS - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 576, muxPlaybackId: muxPlaybackIds["TIAM02L06"] ?? "" },
                        { id: "TIASM02L07", title: "Personalización de áreas del negocio: Área Marketing", longTitle: "Personalización de áreas del negocio: Área Marketing - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 554, muxPlaybackId: muxPlaybackIds["TIAM02L07"] ?? "" },
                        { id: "TIASM02L08", title: "Personalización de áreas del negocio: Área Ventas", longTitle: "Personalización de áreas del negocio: Área Ventas - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 546, muxPlaybackId: muxPlaybackIds["TIAM02L08"] ?? "" },
                        { id: "TIASM02L09", title: "Roles en el área de ventas", longTitle: "Roles en el área de ventas - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 545, muxPlaybackId: muxPlaybackIds["TIAM02L09"] ?? "" },
                        { id: "TIASM02L10", title: "Exploración de ROLES: El principio de los Asistentes virtuales", longTitle: "Exploración de ROLES: El principio de los Asistentes virtuales - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 499, muxPlaybackId: muxPlaybackIds["TIAM02L10"] ?? "" },
                        { id: "TIASM02L11", title: "Tipologías de PROMPTs", longTitle: "Tipologías de PROMPTs - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 571, muxPlaybackId: muxPlaybackIds["TIAM02L11"] ?? "" },
                        { id: "TIASM02L12", title: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO", longTitle: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 229, muxPlaybackId: muxPlaybackIds["TIAM02L12"] ?? "" },
                        { id: "TIASM02L13", title: "Cómo DELEGAR: Fórmula RODOIR", longTitle: "Cómo DELEGAR: Fórmula RODOIR - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 572, muxPlaybackId: muxPlaybackIds["TIAM02L13"] ?? "" },
                        { id: "TIASM02L14", title: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs", longTitle: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs - Personalización de ChatGPT | TRENNO IA", description: "Sin descripción.", duration: 580, muxPlaybackId: muxPlaybackIds["TIAM02L14"] ?? "" },
                    ],
                    instructions: []
                },
            ],
        },
        {
            id: "resources",
            name: "Recursos",
            resources: [
                {
                    title: "Proceso de contratación: ChatGPT Plus",
                    description: "Documento de soporte",
                    link: "https://docs.google.com/document/d/1iIxxIFbnV_pk3faDHrsGFZ72MpLSWQj6F2j0h0tzw28/edit?usp=sharing",
                    type: "document",
                },
                {
                    title: "La esencia del negocio",
                    description: "Presentación",
                    link: "https://docs.google.com/presentation/d/1dxt94sAG4Xmu3lHXseigHr2okfjP0SEeUvrq1cC78LE/edit?usp=sharing",
                    type: "presentation",
                },
                {
                    title: "La esencia del negocio",
                    description: "Carpeta de documentos claves",
                    link: "https://drive.google.com/drive/folders/1xYUmjLEuIbIq_mq2uqRtSD13diRumokt?usp=sharing",
                    type: "folder",
                },
                {
                    title: "Plantilla para el desarrollo del ROL",
                    description: "Documento",
                    link: "https://drive.google.com/file/d/1L40cmq6A_hvlJDxOGRhslfbTUW0H7Dyc/view?usp=sharing",
                    type: "document",
                },
                {
                    id: "sesion-01",
                    title: "Sesión 01",
                    description: "Grabación, apuntes y ejercicios",
                    type: "folder",
                    children: [
                        {
                            title: "Grabación Sesión 01",
                            description: "Repite la sesión cuando quieras",
                            link: "https://drive.google.com/file/d/1ZmpBrRCPvQIIUxPExXccmWgU08rN8hdP/view?usp=sharing",
                            type: "video",
                        },
                        {
                            title: "Apuntes Sesión 01",
                            description: "Conceptos clave",
                            link: "https://drive.google.com/file/d/1RYdNNH_CcnBxBLNlLpDH7dZM4CCKis_L/view?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "Ejercicios Sesión 01",
                            description: "Ejercicios Prácticos de Consolidación",
                            link: "https://drive.google.com/file/d/15bghdQyCuOEMv_FnKFiC_isuCepuvZe9/view?usp=sharing",
                            type: "activity",
                        },
                    ],
                },
                {
                    id: "sesion-02",
                    title: "Sesión 02",
                    description: "Grabación, apuntes y PROMPTs",
                    type: "folder",
                    children: [
                        {
                            title: "Grabación Sesión 02",
                            description: "Repite la sesión cuando quieras",
                            link: "https://drive.google.com/file/d/1ua6L2PiFTDUhgWmtJp6BbFuaaUWPlCLL/view?usp=sharing",
                            type: "video",
                        },
                        {
                            title: "Apuntes Sesión 02",
                            description: "Conceptos clave",
                            link: "https://drive.google.com/file/d/115pgcbgxhsa3qSQjreJngSYVVfEkij9g/view?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "PROMPTs Sesión 02",
                            description: "Instrucciones personalizadas",
                            link: "https://docs.google.com/document/d/1G0HDda79htYmqCJwMXli_qwLKg9n-HBzm2W2ntbMXlY/edit?usp=sharing",
                            type: "document",
                        },
                    ],
                },
                {
                    id: "sesion-03",
                    title: "Sesión 03",
                    description: "Grabación, resumen, ejercicios y PROMPTs",
                    type: "folder",
                    children: [
                        {
                            title: "Grabación Sesión 03",
                            description: "Repite la sesión cuando quieras",
                            link: "https://drive.google.com/file/d/1orfHw9i_AHFJLi0U5x_owL0MxainmUPG/view?usp=sharing",
                            type: "video",
                        },
                        {
                            title: "Resumen Sesión 03",
                            description: "Conceptos clave",
                            link: "https://drive.google.com/file/d/1wrmieWl9ghnEatgWOTHvyA8pKamThDhg/view?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "PROMPTs Sesión 03",
                            description: "Instrucciones y PROMPTs de la sesión",
                            link: "https://docs.google.com/document/d/1lmcYdiC2--BvaCmxBjaUweGrBx9Rllk8Z3i9PrGvWVg/edit?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "¿En qué se diferencia un proyecto compartido de un GPT Personalizado?",
                            description: "Documento explicativo",
                            link: "https://drive.google.com/file/d/1UqPRzDRxPiMwksgyDwy8niQtdKAgEYr_/view?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "Estructura de PROMPTs",
                            description: "Documento de referencia",
                            link: "https://drive.google.com/file/d/1bewNOoytHGa8-rwsvj25pCMIGV-tAd0l/view?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "PROMPT para el desarrollo del ROL",
                            description: "Documento de referencia",
                            link: "https://drive.google.com/file/d/1wcd9HuC8L0KFI220n1x6en9cz77bicHJ/view?usp=sharing",
                            type: "document",
                        },
                        {
                            title: "Ejercicios Sesión 03",
                            description: "Ejercicios Prácticos de Consolidación",
                            link: "https://drive.google.com/file/d/1kJb9_KtLdQWryNgj8sRAPGRXOnWAeE9Z/view?usp=sharing",
                            type: "activity",
                        },
                        {
                            title: "Entrega de Tareas y Ejercicios",
                            description: "Sube tu respuesta aquí",
                            link: "https://drive.google.com/drive/folders/1mTxe5W65V_Q4a_5Zs1MeA1FUWll8hksd?usp=sharing",
                            type: "submission",
                        },
                    ],
                },
                {
                    id: "sesion-04",
                    title: "Sesión 04",
                    description: "Grabación, resumen, ejercicios y PROMPTs",
                    type: "folder",
                    children: [
                        {
                            title: "Grabación Sesión 04",
                            description: "Repite la sesión cuando quieras",
                            link: "https://drive.google.com/file/d/1Pr3tzobAeP_mSferOdB_w4_WOG7r2KYD/view?usp=sharing",
                            type: "video",
                        },
                    ],
                },
            ],
        },
    ],
};

export const TMD_PROGRAM: Program = {
    id: "tmd",
    name: "TRENNO Mark Digital",
    price: -1,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfK4Wp2c27wa-xxfgd4Bw9AhY7cuUHsLL4Rk4_YXAbuz2zL4Q/viewform?usp=sharing&ouid=118137140539958374058",
    categories: ["free"],
    description: "Programa especializado en organización digital y marketing para emprendedores.",
    logo: tmd_logo,
    background: background_tmd,
    sections: [
        {
            id: "preseason",
            name: "Introducción",
            modules: [
                {
                    id: "TMDM01",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TMDM01L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TMDM01L02", title: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL", longTitle: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TMDM01L03", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TMDM01L04", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
                    ],
                    instructions: []
                },
            ],
        },
        {
            id: "part_2",
            name: "Desarrollo",
            modules: [
                {
                    id: "TMDM01",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TMDM01L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TMDM01L01"] ?? "" },
                    ],
                    instructions: []
                },
            ],
        },
        {
            id: "part_3",
            name: "Cierre",
            modules: [
                {
                    id: "TMDM01",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TMDM01L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TMDM01L01"] ?? "" },
                    ],
                    instructions: []
                },
            ],
        }
    ],
};

export const programs: Array<Program> = [
    TIA_PROGRAM,
    TIA_SUMMER_PROGRAM,
    TMD_PROGRAM
];