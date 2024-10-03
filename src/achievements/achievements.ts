import { Achievement } from "@/interfaces";
import achievementBackground from '@/assets/profile/achievement_default.webp';

export const achievements: Array<Achievement> = [
    {
        title: "Emprendedor Amateur",
        description: "Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento. Completa tu primer módulo de entrenamiento.",
        background: achievementBackground,
        achieved: false,
        // getProgress: (user) => user.modulesCompleted / 1 * 100, // Ejemplo: calcula el progreso en función de los módulos completados
        // checkAchievement: (user) => {
        //     if (user.modulesCompleted >= 1) {
        //         return true; // Logro alcanzado
        //     }
        //     return false;
        // },
    },
    {
        title: "Aprendiz Constante",
        description: "Alcanza un progreso del 50% en los entrenamientos.",
        background: achievementBackground,
        achieved: true,
        // getProgress: (user) => user.trainingProgress * 100, // Ejemplo: calcula el progreso como porcentaje
        // checkAchievement: (user) => {
        //     if (user.trainingProgress >= 0.5) {
        //         return true; // Logro alcanzado
        //     }
        //     return false;
        // },
    },
    {
        title: "Maestro en Formación",
        description: "Completa el 100% de los entrenamientos.",
        background: achievementBackground,
        achieved: false,
        // getProgress: (user) => user.trainingProgress * 100, // Ejemplo: calcula el progreso como porcentaje
        // checkAchievement: (user) => {
        //     if (user.trainingProgress >= 1) {
        //         return true; // Logro alcanzado
        //     }
        //     return false;
        // },
    },
    {
        title: "El Conector",
        description: "Conecta con al menos 5 nuevos emprendedores en la plataforma.",
        background: achievementBackground,
        achieved: false,
        // getProgress: (user) => (user.networkConnections / 5) * 100, // Ejemplo: calcula el progreso basado en conexiones realizadas
        // checkAchievement: (user) => {
        //     if (user.networkConnections >= 5) {
        //         return true; // Logro alcanzado
        //     }
        //     return false;
        // },
    },
    {
        title: "Capitán del Equipo",
        description: "Lidera a tu equipo hacia la victoria en una competencia grupal.",
        background: achievementBackground,
        achieved: false,
        // getProgress: (user) => user.teamWins >= 1 ? 100 : 0, // Logro se completa con al menos una victoria
        // checkAchievement: (user) => {
        //     if (user.teamWins >= 1) {
        //         return true; // Logro alcanzado
        //     }
        //     return false;
        // },
    }
];