import type { ProgramType } from "@/interfaces/programs";

interface ProgramMeta {
    type: ProgramType;
    priceARS: number | null;
    subscriptionPriceARS?: number | null;
    purchasable: boolean;
    hidden?: boolean;
    longDescription?: string;
    learningPoints?: string[];
}

export const programMetadata: Record<string, ProgramMeta> = {
    tia: {
        type: "purchase",
        priceARS: 50000,
        purchasable: false,
        learningPoints: [
            "Diseñar prompts profesionales con la estructura de 6 pasos (A-F)",
            "Dominar la interfaz completa de ChatGPT como un experto",
            "Personalizar ChatGPT con la información clave de tu negocio",
            "Aplicar las fórmulas RACS y RODOIR para delegar tareas complejas",
            "Configurar Instrucciones Personalizadas para respuestas adaptadas",
            "Personalización por áreas: Marketing, Ventas y Liderazgo",
            "Asignar roles expertos a la IA para obtener resultados específicos",
            "Explorar tipologías de prompts y técnicas de iteración avanzada",
        ],
    },
    tia_summer: {
        type: "purchase",
        priceARS: null,
        purchasable: false,
    },
    tia_pool: {
        type: "purchase",
        priceARS: null,
        purchasable: false,
    },
    tmd: {
        type: "purchase",
        priceARS: null,
        purchasable: false,
    },
    trenno_ia: {
        type: "subscription",
        priceARS: null,
        subscriptionPriceARS: null,
        purchasable: false,
    },
};
