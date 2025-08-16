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
            id: "session_1",
            name: "Introducción",
            modules: [
                {
                    id: "TIAM01",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TIAM01L01", title: "Introducción Microlearning TRENNO iA", longTitle: "Introducción Microlearning TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TIAM01L02", title: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL", longTitle: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 555, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TIAM01L03", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 497, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TIAM01L04", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 585, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
                        { id: "TIAM01L05", title: "Comprender la INTERFAZ de ChatGPT", longTitle: "Comprender la INTERFAZ de ChatGPT - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 434, muxPlaybackId: muxPlaybackIds["TIAM01L05"] ?? "" },
                        { id: "TIAM01L06", title: "Ejercicio: \"UN LIBRO\"", longTitle: "Ejercicio: \"UN LIBRO\" - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 582, muxPlaybackId: muxPlaybackIds["TIAM01L06"] ?? "" },
                        { id: "TIAM01L07", title: "Preparando el contexto para empezar a PERSONALIZAR", longTitle: "Preparando el contexto para empezar a PERSONALIZAR - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 437, muxPlaybackId: muxPlaybackIds["TIAM01L07"] ?? "" },
                        { id: "TIAM01L08", title: "Cómo personalizar a ChatGPT Parte 1", longTitle: "Cómo personalizar a ChatGPT Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 420, muxPlaybackId: muxPlaybackIds["TIAM01L08"] ?? "" },
                        { id: "TIAM01L09", title: "Cómo personalizar a ChatGPT Parte 2", longTitle: "Cómo personalizar a ChatGPT Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 584, muxPlaybackId: muxPlaybackIds["TIAM01L09"] ?? "" },
                        { id: "TIAM01L10", title: "Ejercicio: \"Desarrollar información clave del negocio con IA\"", longTitle: "Ejercicio: \"Desarrollar información clave del negocio con IA\" - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 413, muxPlaybackId: muxPlaybackIds["TIAM01L10"] ?? "" },
                        { id: "TIAM01L11", title: "Instrucciones PERSONALIZADAS de ChatGPT", longTitle: "Instrucciones PERSONALIZADAS de ChatGPT - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 597, muxPlaybackId: muxPlaybackIds["TIAM01L11"] ?? "" },
                        { id: "TIAM01L12", title: "Estructura básica de generación de prompts: Fórmula RACS", longTitle: "Estructura básica de generación de prompts: Fórmula RACS - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 576, muxPlaybackId: muxPlaybackIds["TIAM01L12"] ?? "" },
                        { id: "TIAM01L13", title: "Personalización de áreas del negocio: Área Marketing", longTitle: "Personalización de áreas del negocio: Área Marketing - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 554, muxPlaybackId: muxPlaybackIds["TIAM01L13"] ?? "" },
                        { id: "TIAM01L14", title: "Personalización de áreas del negocio: Área Ventas", longTitle: "Personalización de áreas del negocio: Área Ventas - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 546, muxPlaybackId: muxPlaybackIds["TIAM01L14"] ?? "" },
                        { id: "TIAM01L15", title: "Roles en el área de ventas", longTitle: "Roles en el área de ventas - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 545, muxPlaybackId: muxPlaybackIds["TIAM01L15"] ?? "" },
                        { id: "TIAM01L16", title: "Exploración de ROLES: El principio de los Asistentes virtuales", longTitle: "Exploración de ROLES: El principio de los Asistentes virtuales - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 499, muxPlaybackId: muxPlaybackIds["TIAM01L16"] ?? "" },
                        { id: "TIAM01L17", title: "Tipologías de PROMPTs", longTitle: "Tipologías de PROMPTs - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 571, muxPlaybackId: muxPlaybackIds["TIAM01L17"] ?? "" },
                        { id: "TIAM01L18", title: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO", longTitle: "Recomendaciones para dar INDICACIONES a la IA: EL VERBO - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 229, muxPlaybackId: muxPlaybackIds["TIAM01L18"] ?? "" },
                        { id: "TIAM01L19", title: "Cómo DELEGAR: Fórmula RODOIR", longTitle: "Cómo DELEGAR: Fórmula RODOIR - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 572, muxPlaybackId: muxPlaybackIds["TIAM01L19"] ?? "" },
                        { id: "TIAM01L20", title: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs", longTitle: "Profundizar sobre las FORMAS de RESPUESTAS al diseñar PROMPTs - Dominio de PROMPTS | TRENNO IA", description: "Aprende", duration: 580, muxPlaybackId: muxPlaybackIds["TIAM01L20"] ?? "" },
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
                {
                    id: "TIAM02",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TIAM02L01", title: "Introducción Microlearning TRENNO iA", longTitle: "Introducción Microlearning TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 347, muxPlaybackId: muxPlaybackIds["TIAM01L01"] ?? "" },
                        { id: "TIAM02L02", title: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL", longTitle: "Conceptos básicos para entender a la INTELIGENCIA ARTIFICIAL - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 555, muxPlaybackId: muxPlaybackIds["TIAM01L02"] ?? "" },
                        { id: "TIAM02L03", title: "Introducción al DISEÑO de PROMPTS - Parte 1", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 1 - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 497, muxPlaybackId: muxPlaybackIds["TIAM01L03"] ?? "" },
                        { id: "TIAM02L04", title: "Introducción al DISEÑO de PROMPTS - Parte 2", longTitle: "Introducción al DISEÑO de PROMPTS - Parte 2 - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 585, muxPlaybackId: muxPlaybackIds["TIAM01L04"] ?? "" },
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
        {
            id: "session_2",
            name: "Desarrollo",
            modules: [
                {
                    id: "TIAM02",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TIAM02L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM02L01"] ?? "" },
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
        {
            id: "session_3",
            name: "Cierre",
            modules: [
                {
                    id: "TIAM03",
                    name: "Dominio de PROMPTS",
                    description: "Aprende a organizar tu empresa digitalmente con herramientas y estrategias avanzadas.",
                    lessons: [
                        { id: "TIAM03L01", title: "Introducción a la Serie TRENNO iA", longTitle: "Introducción a la Serie TRENNO iA - Dominio de PROMPTS | TRENNO IA", description: "Aprende los conceptos básicos de la inteligencia artificial y su aplicación en el mundo empresarial.", duration: 360, muxPlaybackId: muxPlaybackIds["TIAM03L01"] ?? "" },
                    ],
                    instructions: [
                        {
                        id: "TMDM03I01",
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

export const TMD_PROGRAM: Program = {
    id: "tmd",
    name: "TRENNO Mark Digital",
    price: 0,
    categories: ["free"],
    description: "Programa especializado en organización digital y marketing para emprendedores.",
    logo: tmd_logo,
    sections: [
        {
            id: "session_1",
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
            id: "session_2",
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
            id: "session_3",
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