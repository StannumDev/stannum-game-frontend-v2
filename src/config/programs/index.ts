import { Program } from "@/interfaces";
import tia_logo from '@/assets/programs/trenno_ia_logo.webp';
import tmd_logo from '@/assets/programs/trenno_mark_digital_logo.webp';

const muxPlaybackIds: Record<string, string> = JSON.parse(process.env.NEXT_PUBLIC_MUX_IDS || "{}");

export const TIA_PROGRAM: Program = {
    id: "tia",
    name: "TRENNO IA",
    price: 500,
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
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TIAM01L01", title: "Introducción a TRENNO Inteligencia Artificial", longTitle: "Introducción a TRENNO Inteligencia Artificial - Dominio de PROMPTS | TRENNO IA", description: "¡Bienvenido a la parrilla de salida! En la carrera por el éxito, la Inteligencia Artificial es tu monoplaza de Fórmula 1: una máquina de increíble potencia esperando al piloto adecuado para llevarla a la victoria. ¿Estás listo para tomar el volante? Este video es tu vuelta de calentamiento en el circuito Trenno IA Xtreme. Aquí no solo aprenderás a conducir, sino a fusionarte con la máquina, a entender cada uno de sus componentes para dominar la pista y acelerar el crecimiento de tu negocio como nunca antes. En esta sesión introductoria, descubrirás: El Mindset del Campeón: ¿Qué significa realmente \"DOMINAR\" la IA? Prepárate para cambiar las reglas del juego y convertir la tecnología en tu copiloto estratégico. Los 5 Dominios de la Victoria: Conocerás las cinco áreas clave que todo piloto de élite de la IA debe conquistar, desde ser un Diseñador de Prompts de clase mundial hasta convertirte en un Entrenador de GPTs y un maestro de la Automatización. La Clave del Éxito: Entender la máquina es el primer paso para dominarla. Te daremos las bases para construir una sinergia perfecta con la IA, anticipar cada curva y tomar decisiones a 300 km/h. Dominar la IA es una decisión, un entrenamiento constante y un desafío que te llevará al siguiente nivel. ¡Dale al play, ajusta tu cinturón y prepárate para acelerar a fondo!", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TIAM01L02", title: "Introducción Microlearning TRENNO Inteligencia Artificial", longTitle: "Introducción Microlearning TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "¡Bienvenido a la parrilla de salida! En la carrera por el éxito, la Inteligencia Artificial es tu monoplaza de Fórmula 1: una máquina de increíble potencia esperando al piloto adecuado para llevarla a la victoria. ¿Estás listo para tomar el volante? Este video es tu vuelta de calentamiento en el circuito Trenno IA Xtreme. Aquí no solo aprenderás a conducir, sino a fusionarte con la máquina, a entender cada uno de sus componentes para dominar la pista y acelerar el crecimiento de tu negocio como nunca antes. En esta sesión introductoria, descubrirás: El Mindset del Campeón: ¿Qué significa realmente \"DOMINAR\" la IA? Prepárate para cambiar las reglas del juego y convertir la tecnología en tu copiloto estratégico. Los 5 Dominios de la Victoria: Conocerás las cinco áreas clave que todo piloto de élite de la IA debe conquistar, desde ser un Diseñador de Prompts de clase mundial hasta convertirte en un Entrenador de GPTs y un maestro de la Automatización. La Clave del Éxito: Entender la máquina es el primer paso para dominarla. Te daremos las bases para construir una sinergia perfecta con la IA, anticipar cada curva y tomar decisiones a 300 km/h. Dominar la IA es una decisión, un entrenamiento constante y un desafío que te llevará al siguiente nivel. ¡Dale al play, ajusta tu cinturón y prepárate para acelerar a fondo!", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TIAM01L03", title: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL", longTitle: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 555, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TIAM01L04", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 497, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
                        { id: "TIAM01L05", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 585, muxPlaybackId: muxPlaybackIds["TIAM01L05"] ?? "" },
                        { id: "TIAM01L06", title: "Comprender la INTERFAZ de ChatGPT", longTitle: "Comprender la INTERFAZ de ChatGPT - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 434, muxPlaybackId: muxPlaybackIds["TIAM01L06"] ?? "" },
                        { id: "TIAM01L07", title: "Ejercicio: \"UN LIBRO\"", longTitle: "Ejercicio: \"UN LIBRO\" - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 582, muxPlaybackId: muxPlaybackIds["TIAM01L07"] ?? "" },
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
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TIAM02L01", title: "Preparando el contexto para empezar a PERSONALIZAR", longTitle: "Preparando el contexto para empezar a PERSONALIZAR - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 437, muxPlaybackId: muxPlaybackIds["TIAM02L01"] ?? "" },
                        { id: "TIAM02L02", title: "Cómo personalizar a ChatGPT Parte 1", longTitle: "Cómo personalizar a ChatGPT Parte 1 - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 420, muxPlaybackId: muxPlaybackIds["TIAM02L02"] ?? "" },
                        { id: "TIAM02L03", title: "Cómo personalizar a ChatGPT Parte 2", longTitle: "Cómo personalizar a ChatGPT Parte 2 - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 584, muxPlaybackId: muxPlaybackIds["TIAM02L03"] ?? "" },
                        { id: "TIAM02L04", title: "Ejercicio: \"Desarrollar información clave del negocio con IA\"", longTitle: "Ejercicio: \"Desarrollar información clave del negocio con IA\" - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 413, muxPlaybackId: muxPlaybackIds["TIAM02L04"] ?? "" },
                        { id: "TIAM02L05", title: "Instrucciones PERSONALIZADAS de ChatGPT", longTitle: "Instrucciones PERSONALIZADAS de ChatGPT - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 597, muxPlaybackId: muxPlaybackIds["TIAM02L05"] ?? "" },
                        { id: "TIAM02L06", title: "Estructura básica de generación de prompts: Fórmula RACS", longTitle: "Estructura básica de generación de prompts: Fórmula RACS - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 576, muxPlaybackId: muxPlaybackIds["TIAM02L06"] ?? "" },
                        { id: "TIAM02L07", title: "Personalización de áreas del negocio: Área Marketing", longTitle: "Personalización de áreas del negocio: Área Marketing - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 554, muxPlaybackId: muxPlaybackIds["TIAM02L07"] ?? "" },
                        { id: "TIAM02L08", title: "Personalización de áreas del negocio: Área Ventas", longTitle: "Personalización de áreas del negocio: Área Ventas - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 546, muxPlaybackId: muxPlaybackIds["TIAM02L08"] ?? "" },
                        { id: "TIAM02L09", title: "Roles en el área de ventas", longTitle: "Roles en el área de ventas - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 545, muxPlaybackId: muxPlaybackIds["TIAM02L09"] ?? "" },
                        { id: "TIAM02L10", title: "Exploración de ROLES: El principio de los Asistentes virtuales", longTitle: "Exploración de ROLES: El principio de los Asistentes virtuales - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 499, muxPlaybackId: muxPlaybackIds["TIAM02L10"] ?? "" },
                        { id: "TIAM02L11", title: "Tipologías de PROMPTs", longTitle: "Tipologías de PROMPTs - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 571, muxPlaybackId: muxPlaybackIds["TIAM02L11"] ?? "" },
                        { id: "TIAM02L12", title: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO", longTitle: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 229, muxPlaybackId: muxPlaybackIds["TIAM02L12"] ?? "" },
                        { id: "TIAM02L13", title: "Cómo DELEGAR: Fórmula RODOIR", longTitle: "Cómo DELEGAR: Fórmula RODOIR - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 572, muxPlaybackId: muxPlaybackIds["TIAM02L13"] ?? "" },
                        { id: "TIAM02L14", title: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs", longTitle: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs - Personalización de ChatGPT | TRENNO IA", description: "Aprende", duration: 580, muxPlaybackId: muxPlaybackIds["TIAM02L14"] ?? "" },
                    ],
                    instructions: [
                        {
                        id: "TMDM02I01",
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
    price: 0,
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