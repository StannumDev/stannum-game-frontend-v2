import { Achievement } from "@/interfaces";
import achievement_background_1 from '@/assets/profile/achievement_background_1.webp';
import achievement_background_2 from '@/assets/profile/achievement_background_2.webp';
import achievement_background_3 from '@/assets/profile/achievement_background_3.webp';

export const achievements: Array<Achievement> = [
    {
        title: "Emprendedor Amateur",
        description: "Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento.",
        background: achievement_background_2,
        achieved: false,
        getProgress: () => { return 14 },
    },
    {
        title: "Aprendiz Constante",
        description: "Alcanza un progreso del 50% en los entrenamientos.",
        background: achievement_background_1,
        achieved: true,
        getProgress: () => { return 100 },
    },
    {
        title: "Maestro en Formación",
        description: "Completa el 100% de los entrenamientos.",
        background: achievement_background_3,
        achieved: true,
        getProgress: () => { return 100 },
    },
    {
        title: "El Conector",
        description: "Conecta con al menos 5 nuevos emprendedores en la plataforma.",
        background: achievement_background_1,
        achieved: false,
        getProgress: () => { return 73 },
    },
    {
        title: "Capitán del Equipo",
        description: "Lidera a tu equipo hacia la victoria en una competencia grupal.",
        background: achievement_background_2,
        achieved: true,
        getProgress: () => { return 45 },
    },
    {
        title: "Emprendedor Amateur",
        description: "Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento.",
        background: achievement_background_2,
        achieved: false,
        getProgress: () => { return 20 },
    },
    {
        title: "Aprendiz Constante",
        description: "Alcanza un progreso del 50% en los entrenamientos.",
        background: achievement_background_1,
        achieved: false,
        getProgress: () => { return 90 },
    },
    {
        title: "Maestro en Formación",
        description: "Completa el 100% de los entrenamientos.",
        background: achievement_background_3,
        achieved: false,
        getProgress: () => { return 87 },
    },
    {
        title: "El Conector",
        description: "Conecta con al menos 5 nuevos emprendedores en la plataforma.",
        background: achievement_background_1,
        achieved: false,
        getProgress: () => { return 35 },
    },
    {
        title: "Capitán del Equipo",
        description: "Lidera a tu equipo hacia la victoria en una competencia grupal.",
        background: achievement_background_2,
        achieved: true,
        getProgress: () => { return 100 },
    }
];