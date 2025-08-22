import { Program } from "@/interfaces";
import tia_logo from '@/assets/programs/trenno_ia_logo.webp';
import tmd_logo from '@/assets/programs/trenno_mark_digital_logo.webp';

const muxPlaybackIds: Record<string, string> = JSON.parse(process.env.NEXT_PUBLIC_MUX_IDS || "{}");

export const TIA_PROGRAM: Program = {
    id: "tia",
    name: "TRENNO IA",
    price: 10,
    href: "https://docs.google.com/forms/d/e/1FAIpQLSfK4Wp2c27wa-xxfgd4Bw9AhY7cuUHsLL4Rk4_YXAbuz2zL4Q/viewform?usp=sharing&ouid=118137140539958374058",
    categories: ["main"],
    description: "Programa intensivo especializado en el entrenamiento en inteligencia artificial para líderes de empresas y sus equipos.",
    logo: tia_logo,
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
                        { id: "TIAM01L01", title: "Introducción a TRENNO Inteligencia Artificial", longTitle: "Introducción a TRENNO Inteligencia Artificial - Dominio de PROMPTS | TRENNO IA", description: "Ya estás en la pista. Ahora es el momento de aprender a dominarla. En la Fórmula 1, no gana el que solo acelera, sino el que entiende la máquina, anticipa cada curva y traza una estrategia ganadora. Lo mismo ocurre con la Inteligencia Artificial.<br/> Este video es tu sesión de estrategia en boxes. Aquí desglosaremos el plan de carrera definitivo para que dejes de ser un simple usuario y te conviertas en un verdadero piloto de élite de la IA. Descubrirás que DOMINAR no es un concepto abstracto, sino un conjunto de habilidades tangibles y poderosas que te permitirán reducir la carga operativa, tomar decisiones más rápidas y llevar a tu equipo a la máxima productividad.<br/> En esta sesión táctica, conquistarás: <ul> <li> Los 5 Dominios de la Maestría: Te revelaremos el mapa completo del circuito. Las cinco áreas fundamentales que debes dominar para ganar la carrera:<br/> <ol> <li> Ser Diseñador de Prompts: La habilidad N°1. Aprende a comunicarte con la IA como un ingeniero de F1 con su monoplaza.<br/> </li> <li> Saber Personalizar: Ajusta tu motor a la perfección para que responda a tus necesidades exactas.<br/> </li> <li> Funciones Avanzadas: Descubre los \"botones secretos\" que te darán una ventaja insuperable.<br/> </li> <li> Ser Entrenador de GPTs: Ve más allá y entrena tus propias IA especializadas.<br/> </li> <li> Automatización con IA: La vuelta rápida hacia la eficiencia. ¡Pon tus procesos en piloto automático!<br/> </li> </ol> </li> <li> Mentalidad de Ganador: Te equiparemos con los objetivos clave para una implementación exitosa, enseñándote a desarrollar un criterio personal infalible y a naturalizar el uso de la IA en tu día a día.<br/> </li> </ul> Para dominar la máquina, primero debes entenderla.<br/> Prepárate para absorber cada detalle, porque esta sesión definirá tu estrategia para llegar al podio.", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TIAM01L02", title: "Introducción Microlearning TRENNO Inteligencia Artificial", longTitle: "Introducción Microlearning TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Ya estás en la pista. Ahora es el momento de aprender a dominarla. En la Fórmula 1, no gana el que solo acelera, sino el que entiende la máquina, anticipa cada curva y traza una estrategia ganadora. Lo mismo ocurre con la Inteligencia Artificial.<br/> Este video es tu sesión de estrategia en boxes. Aquí desglosaremos el plan de carrera definitivo para que dejes de ser un simple usuario y te conviertas en un verdadero piloto de élite de la IA. Descubrirás que DOMINAR no es un concepto abstracto, sino un conjunto de habilidades tangibles y poderosas que te permitirán reducir la carga operativa, tomar decisiones más rápidas y llevar a tu equipo a la máxima productividad.<br/> En esta sesión táctica, conquistarás: <ul> <li> Los 5 Dominios de la Maestría: Te revelaremos el mapa completo del circuito. Las cinco áreas fundamentales que debes dominar para ganar la carrera:<br/> <ol> <li> Ser Diseñador de Prompts: La habilidad N°1. Aprende a comunicarte con la IA como un ingeniero de F1 con su monoplaza.<br/> </li> <li> Saber Personalizar: Ajusta tu motor a la perfección para que responda a tus necesidades exactas.<br/> </li> <li> Funciones Avanzadas: Descubre los \"botones secretos\" que te darán una ventaja insuperable.<br/> </li> <li> Ser Entrenador de GPTs: Ve más allá y entrena tus propias IA especializadas.<br/> </li> <li> Automatización con IA: La vuelta rápida hacia la eficiencia. ¡Pon tus procesos en piloto automático!<br/> </li> </ol> </li> <li> Mentalidad de Ganador: Te equiparemos con los objetivos clave para una implementación exitosa, enseñándote a desarrollar un criterio personal infalible y a naturalizar el uso de la IA en tu día a día.<br/> </li> </ul> Para dominar la máquina, primero debes entenderla.<br/> Prepárate para absorber cada detalle, porque esta sesión definirá tu estrategia para llegar al podio.", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TIAM01L03", title: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL", longTitle: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL - Dominio de PROMPTS | TRENNO IA", description: "Un piloto de Fórmula 1 no solo conduce; conoce cada tornillo, cada circuito y cada sensor de su monoplaza. Sabe cómo funciona el motor, la aerodinámica y la electrónica para exprimir cada milisegundo en la pista. Es hora de que tú hagas lo mismo con la Inteligencia Artificial. <br/> Este video te abre las puertas del taller de ingeniería. Vamos a levantar el capó de la IA para que entiendas la mecánica que la impulsa. Conocer sus componentes fundamentales no es solo teoría; es la diferencia entre ser un conductor aficionado y un piloto que domina la máquina a 350 km/h.<br/> En esta sesión de ingeniería avanzada, desglosaremos los conceptos clave que potencian tu IA:<br/> Deep Learning: Descubre el corazón del motor, la tecnología que imita al cerebro humano para un aprendizaje profundo y sin precedentes.<br/> GPT (Transformador Generativo Preentrenado): Entiende qué significa realmente esta sigla y por qué es la pieza clave que permite a la IA generar respuestas asombrosas.<br/> Redes Neuronales Artificiales (RNA): Visualiza el sistema nervioso de la IA y cómo conecta ideas para ofrecer resultados coherentes.<br/> Grandes Modelos de Lenguaje (LLM) y Procesamiento del Lenguaje Natural (NLP): Conoce el combustible y la telemetría que permiten a la máquina entenderte y responderte como si fuera una persona.<br/> Este no es un video técnico aburrido; es tu entrada a la sala de ingenieros. Al final de esta sesión, no solo usarás la IA, sino que entenderás por qué funciona, dándote el control total para dominarla.<br/> ¡Prepárate para desarmar la máquina, entender sus secretos y ensamblar tu propia estrategia para la victoria!", duration: 555, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TIAM01L04", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Ya conoces la máquina y entiendes su potencial. Ahora, es momento de tomar el volante. Un monoplaza de Fórmula 1 puede ser el más rápido, pero sin un piloto que sepa exactamente cómo, cuándo y dónde dar cada instrucción, nunca cruzará la línea de meta en primer lugar. El Diseño de Prompts es tu volante, tu acelerador y tus frenos: es el arte de comunicarte con la IA con la precisión de un campeón. <br/> Este video se enfoca en el Dominio #1, la habilidad más crucial para convertirte en un verdadero experto. Aquí es donde separas a los espectadores de los pilotos de élite. No se trata solo de hacer preguntas, se trata de dar órdenes, de diseñar la instrucción perfecta para obtener el resultado exacto que necesitas.<br/> En esta sesión de entrenamiento práctico, aprenderás a:<br/> Definir el Prompt Perfecto: Descubre qué es realmente un prompt y por qué es la herramienta más poderosa para dirigir la IA.<br/> Las 4 Claves del Mando: Entenderás las cuatro influencias fundamentales que condicionan cada respuesta de la IA, desde la forma en que escribes hasta el uso de roles e historial.<br/> De la Petición a la Orden: Te mostraremos en vivo cómo transformar una pregunta simple en un comando estratégico que te entregue resultados superiores, más rápidos y más precisos.<br/> Evitar los Errores de Novato: Aprende a identificar por qué la IA no te da lo que quieres y cómo refinar tus instrucciones para que te entienda a la perfección.<br/> El prompt es el puente entre tu intención y el poder de la máquina. Un buen piloto no solo pisa el acelerador, lo domina.<br/> Prepárate para afinar tus habilidades de comunicación con la máquina y dar las órdenes que te llevarán directo a la victoria.<br/>", duration: 497, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
                        { id: "TIAM01L05", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "¡Eleva tu juego con la ingeniería de prompts y domina la cancha de la inteligencia artificial! En este video, te convertirás en un verdadero estratega de la IA. Aprenderás a diseñar PROMPTs o instrucciones tan precisas y potentes que transformarán por completo tus resultados. Descubre la fórmula secreta para comunicarte con la inteligencia artificial como un auténtico profesional y llevar tus proyectos al siguiente nivel.<br/> En esta sesión de entrenamiento intensivo, aprenderás a dominar los 6 elementos clave para crear el prompt perfecto:<br/> Sustantivo Clave / Tema (A): Define el campo de juego. Aprenderás a establecer el núcleo de tu solicitud para que la IA se enfoque en lo que realmente importa.<br/> Verbo / Intención (B): Marca la jugada. Descubrirás cómo usar verbos de acción para dirigir a la IA con una intención clara y obtener exactamente lo que necesitas.<br/> Rol (C): Asigna la posición. Aprende a darle a la IA un rol específico para que actúe como un experto en cualquier campo que imagines, desde un profesor de primaria hasta un estratega de marketing.<br/> Forma / Salida / Respuesta (D): Diseña la victoria. Define el formato en el que quieres recibir la información, ya sea un cuento, un correo electrónico, un análisis detallado o cualquier otra cosa que necesites para ganar.<br/> Contexto Infinito (E): Controla el balón. Descubre cómo proporcionar el contexto necesario para que la IA entienda la situación completa y te ofrezca respuestas más ricas y relevantes.<br/> Adjetivo (F): Añade tu estilo. Aprende a usar adjetivos para darle a la respuesta de la IA el tono y la personalidad que desees, desde creativo y mágico hasta profesional y directo.<br/> ¡Prepárate para desatar todo tu potencial! Con estas técnicas, dejarás de ser un espectador y te convertirás en un jugador clave en el mundo de la inteligencia artificial. ¡Es hora de jugar para ganar", duration: 585, muxPlaybackId: muxPlaybackIds["TIAM01L05"] ?? "" },
                        { id: "TIAM01L06", title: "Comprender la INTERFAZ de ChatGPT", longTitle: "Comprender la INTERFAZ de ChatGPT - Dominio de PROMPTS | TRENNO IA", description: "Sin descripción.", duration: 434, muxPlaybackId: muxPlaybackIds["TIAM01L06"] ?? "" },
                        { id: "TIAM01L07", title: "Ejercicio: \"UN LIBRO\"", longTitle: "Ejercicio: \"UN LIBRO\" - Dominio de PROMPTS | TRENNO IA", description: "¡Prepárate para llevar tus interacciones con la IA al siguiente nivel! Este video es tu campo de entrenamiento para convertirte en un verdadero maestro del Prompt Engineering con ChatGPT.<br/> ¿Listo para una sesión intensiva? Aquí aprenderás a construir prompts que no solo obtengan respuestas, sino que te brinden soluciones accionables y personalizadas, como si tuvieras un equipo de expertos dedicados.<br/> Descubre cómo optimizar tu juego:<br/> Define tu Sustantivo Clave/Tema: La base de tu estrategia. ¿Sobre qué quieres que la IA se concentre?<br/> Marca tu Verbo/Intención: No es solo preguntar, es dirigir la acción. ¿Qué acción específica quieres que realice la IA?<br/> Asigna un Rol: Transforma la IA en un experto aliado. ¿Quieres que actúe como un especialista en marketing digital, un autor o incluso un amigo?<br/> Perfecciona la Forma/Salida/Respuesta: Diseña la presentación. Desde rankings detallados hasta resúmenes por capítulos, la forma de la respuesta es clave para su utilidad.<br/> Añade Contexto Infinito: La profundidad es poder. Cuantos más detalles y matices le des, más relevante y adaptada será la respuesta a tus necesidades específicas (por ejemplo, cómo implementar una estrategia de marketing en tu propia empresa).<br/> Incluye Adjetivos: Dale el toque final. ¿Qué tan creativo, práctico o directo quieres que sea el resultado?<br/> Observa la evolución en acción: Desde una búsqueda básica hasta un plan de implementación detallado de 3 semanas, con roles, tareas diarias y consejos específicos para tu equipo. Este video demuestra cómo cada capa de un prompt bien diseñado te acerca a la perfección en la productividad y la estrategia.<br/> ¡Es hora de entrenar a tu IA como un campeón! Aplica estas técnicas y transforma la forma en que trabajas.<br/>", duration: 582, muxPlaybackId: muxPlaybackIds["TIAM01L07"] ?? "" },
                    ],
                    instructions: [
                        // {
                        // id: "TMDM01I01",
                        // title: "Organiza tu carpeta principal",
                        // description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
                        // difficulty: "LOW",
                        // rewardXP: 200,
                        // acceptedFormats: [".jpg", ".jpeg", ".png"],
                        // maxFileSizeMB: 15,
                        // steps: [
                        //     "Crea una cuenta en Google Drive si aún no tienes una.",
                        //     "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
                        //     "Organiza las subcarpetas como se indica en la guía.",
                        //     "Toma una captura de pantalla de tu estructura.",
                        //     "Súbela en esta instrucción."
                        // ],
                        // deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
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
                    instructions: [
                        // {
                        // id: "TMDM02I01",
                        // title: "Organiza tu carpeta principal",
                        // description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
                        // difficulty: "LOW",
                        // rewardXP: 200,
                        // acceptedFormats: [".jpg", ".jpeg", ".png"],
                        // maxFileSizeMB: 15,
                        // steps: [
                        //     "Crea una cuenta en Google Drive si aún no tienes una.",
                        //     "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
                        //     "Organiza las subcarpetas como se indica en la guía.",
                        //     "Toma una captura de pantalla de tu estructura.",
                        //     "Súbela en esta instrucción."
                        // ],
                        // deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
                        // }
                    ]
                },
            ],
        },
        // {
        //     id: "part_2",
        //     name: "Desarrollo",
        //     modules: [
        //         {
        //             id: "TIAM02",
        //             name: "Dominio de PROMPTS",
        //             description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
        //             lessons: [
        //                 { id: "TIAM02L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM02L01"] ?? "" },
        //             ],
        //             instructions: [
        //                 {
        //                 id: "TMDM02I01",
        //                 title: "Organiza tu carpeta principal",
        //                 description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
        //                 difficulty: "LOW",
        //                 rewardXP: 200,
        //                 acceptedFormats: [".jpg", ".jpeg", ".png"],
        //                 maxFileSizeMB: 15,
        //                 steps: [
        //                     "Crea una cuenta en Google Drive si aún no tienes una.",
        //                     "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
        //                     "Organiza las subcarpetas como se indica en la guía.",
        //                     "Toma una captura de pantalla de tu estructura.",
        //                     "Súbela en esta instrucción."
        //                 ],
        //                 deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
        //                 }
        //             ]
        //         },
        //     ],
        // },
        // {
        //     id: "part_3",
        //     name: "Cierre",
        //     modules: [
        //         {
        //             id: "TIAM03",
        //             name: "Dominio de PROMPTS",
        //             description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
        //             lessons: [
        //                 { id: "TIAM03L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM03L01"] ?? "" },
        //             ],
        //             instructions: [
        //                 {
        //                 id: "TMDM03I01",
        //                 title: "Organiza tu carpeta principal",
        //                 description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
        //                 difficulty: "LOW",
        //                 rewardXP: 200,
        //                 acceptedFormats: [".jpg", ".jpeg", ".png"],
        //                 maxFileSizeMB: 15,
        //                 steps: [
        //                     "Crea una cuenta en Google Drive si aún no tienes una.",
        //                     "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
        //                     "Organiza las subcarpetas como se indica en la guía.",
        //                     "Toma una captura de pantalla de tu estructura.",
        //                     "Súbela en esta instrucción."
        //                 ],
        //                 deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
        //                 }
        //             ]
        //         },
        //     ],
        // }
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
                    instructions: [
                        {
                        id: "TMDM01I01",
                        title: "Organiza tu carpeta principal",
                        description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
                        difficulty: "LOW",
                        rewardXP: 200,
                        acceptedFormats: [".jpg", ".jpeg", ".png"],
                        maxFileSizeMB: 15,
                        steps: [
                            "Crea una cuenta en Google Drive si aún no tienes una.",
                            "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
                            "Organiza las subcarpetas como se indica en la guía.",
                            "Toma una captura de pantalla de tu estructura.",
                            "Súbela en esta instrucción."
                        ],
                        deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
                        }
                    ]
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
                    instructions: [
                        {
                        id: "TMDM01I01",
                        title: "Organiza tu carpeta principal",
                        description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
                        difficulty: "LOW",
                        rewardXP: 200,
                        acceptedFormats: [".jpg", ".jpeg", ".png"],
                        maxFileSizeMB: 15,
                        steps: [
                            "Crea una cuenta en Google Drive si aún no tienes una.",
                            "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
                            "Organiza las subcarpetas como se indica en la guía.",
                            "Toma una captura de pantalla de tu estructura.",
                            "Súbela en esta instrucción."
                        ],
                        deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
                        }
                    ]
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
                    instructions: [
                        {
                        id: "TMDM01I01",
                        title: "Organiza tu carpeta principal",
                        description: "Sube una captura de pantalla de cómo estructuraste tu carpeta de Google Drive.",
                        difficulty: "LOW",
                        rewardXP: 200,
                        acceptedFormats: [".jpg", ".jpeg", ".png"],
                        maxFileSizeMB: 15,
                        steps: [
                            "Crea una cuenta en Google Drive si aún no tienes una.",
                            "Descarga la carpeta 'Tu Negocio' y súbela a tu Drive.",
                            "Organiza las subcarpetas como se indica en la guía.",
                            "Toma una captura de pantalla de tu estructura.",
                            "Súbela en esta instrucción."
                        ],
                        deliverableHint: "Sube una imagen clara que muestre tu estructura de carpetas en Drive."
                        }
                    ]
                },
            ],
        }
    ],
};

export const programs: Array<Program> = [
    TIA_PROGRAM,
    TMD_PROGRAM
];




















