import stannum_achievement_background from '@/assets/achievements/stannum_achievement_background.webp';
import tia_achievement_background from '@/assets/achievements/tia_achievement_background.webp';
import tia_summer_achievement_background from '@/assets/achievements/tia_summer_achievement_background.webp';

import { FullUserDetails, Achievement } from "@/interfaces";
import { programs } from "@/config/programs";

export const achievements: Array<Achievement> = [
    {
        id: "first_program_acquired",
        title: "Inicio del camino",
        description: "Compra tu primer programa en la plataforma",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user: FullUserDetails) => {
            return Object.values(user.programs).some(p => p.isPurchased) ? 100 : 0;
        }
    },
    {
        id: "profile_completed",
        title: "Identidad revelada",
        description: "Completa todos los campos esenciales de tu perfil",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user: FullUserDetails) => {
            const { profile } = user;
            return profile.name && profile.country && profile.region && profile.birthdate ? 100 : 0;
        }
    },
    {
        id: "first_module_completed",
        title: "Primera conquista",
        description: "Completa todas las lecciones de un módulo",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 100,
        getProgress: (user: FullUserDetails) => {
            for (const program of programs) {
                for (const section of program.sections) {
                    if(!section.modules) return 0;
                    for (const program_module of section.modules) {
                        const allLessonsDone = program_module.lessons.every(l =>
                            (user.programs[program.id].lessonsCompleted || []).some(lc => lc.lessonId === l.id)
                        );
                        if (allLessonsDone) return 100;
                    }
                }
            }
            return 0;
        }
    },
    {
        id: "first_lesson_completed",
        title: "La chispa del aprendizaje",
        description: "Ve y marca como completada tu primera lección",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user: FullUserDetails) => {
            const total = Object.values(user.programs).flatMap(p => p.lessonsCompleted || []).length;
            return total >= 1 ? 100 : 0;
        }
    },
    {
        id: "first_instruction_completed",
        title: "Primera instrucción",
        description: "Primer movimiento estratégico",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user: FullUserDetails) => {
            return Object.values(user.programs).some(p => (p.instructions || []).some(i => i.status === "GRADED")) ? 100 : 0;
        }
    },
    {
        id: "module_instructions_completed",
        title: "Módulo bajo control",
        description: "Completa todas las instrucciones de un módulo",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 100,
        getProgress: (user: FullUserDetails) => {
            for (const programCfg of programs) {
                const userProgram = user.programs[programCfg.id];
                if (!userProgram) continue;
                for (const section of programCfg.sections) {
                    if(!section.modules) return 0;
                    for (const program_module of section.modules) {
                        if (program_module.instructions.length <= 0) continue;
                        const allInstructionsDone = program_module.instructions.every(inst =>
                            userProgram.instructions.some(i => i.instructionId === inst.id && i.status === "GRADED")
                        );
                        if (allInstructionsDone) return 100;
                    }
                }
            }
            return 0;
        }
    },
    {
        id: "first_program_completed",
        title: "Maestro del programa",
        description: "Completa todos los módulos de un programa",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 200,
        getProgress: (user: FullUserDetails) => {
            for (const programCfg of programs) {
                const userProgram = user.programs[programCfg.id];
                if (!userProgram) continue;
                const allModulesDone = programCfg.sections.every(section =>
                    section.modules?.every(program_module => {
                        const allLessonsDone = program_module.lessons.every(l => userProgram.lessonsCompleted.some(lc => lc.lessonId === l.id));
                        const allInstructionsDone = program_module.instructions.every(inst => userProgram.instructions.some(i => i.instructionId === inst.id && i.status === "GRADED"));
                        return allLessonsDone && allInstructionsDone;
                    })
                );
                if (allModulesDone) return 100;
            }
            return 0;
        }
    },
    {
        id: "level_5",
        title: "Bronce",
        description: "Alcanza el nivel 5 acumulando XP",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user: FullUserDetails) => user.level.currentLevel >= 5 ? 100 : 0
    },
    {
        id: "level_10",
        title: "Plata",
        description: "Alcanza el nivel 10 acumulando XP",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 100,
        getProgress: (user: FullUserDetails) => user.level.currentLevel >= 10 ? 100 : 0
    },
    {
        id: "level_20",
        title: "Oro",
        description: "Alcanza el nivel 20 acumulando XP",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 200,
        getProgress: (user: FullUserDetails) => user.level.currentLevel >= 20 ? 100 : 0
    },
    {
        id: "streak_3_days",
        title: "Entrando en calor",
        description: "Mantén tu streak 3 días consecutivos",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 50,
        getProgress: (user: FullUserDetails) => user.dailyStreak.count >= 3 ? 100 : 0
    },
    {
        id: "streak_7_days",
        title: "Ritmo de campeón",
        description: "Mantén tu streak 7 días consecutivos",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 100,
        getProgress: (user: FullUserDetails) => user.dailyStreak.count >= 7 ? 100 : 0
    },
    {
        id: "streak_30_days",
        title: "Mentalidad inquebrantable",
        description: "Mantén tu streak un mes entero",
        background: stannum_achievement_background,
        categories: ["stannum"],
        xpReward: 200,
        getProgress: (user: FullUserDetails) => user.dailyStreak.count >= 30 ? 100 : 0
    },
    {
        id: "trenno_ia_joined",
        title: "Conexión Neural activada",
        description: "Compra tu primer programa de Trenno IA",
        background: tia_achievement_background,
        categories: ["tia"],
        xpReward: 100,
        getProgress: (user: FullUserDetails) => {
            const tia = user.programs?.tia;
            return tia?.isPurchased ? 100 : 0;
        }
    },
    {
        id: "trenno_ia_first_module_completed",
        title: "Sistema Cognitivo activado",
        description: "Completa todas las lecciones del primer módulo de TIA",
        background: tia_achievement_background,
        categories: ["tia"],
        xpReward: 150,
        getProgress: (user: FullUserDetails) => {
            const tiaProgram = user.programs?.tia;
            if (!tiaProgram) return 0;

            const tiaConfig = programs.find(p => p.id === "tia");
            if (!tiaConfig) return 0;

            const firstSection = tiaConfig.sections[0];
            if (!firstSection || !firstSection.modules || firstSection.modules.length === 0) return 0;

            const firstModule = firstSection.modules[0];

            const allLessonsDone = firstModule.lessons.every(l =>
                tiaProgram.lessonsCompleted.some(lc => lc.lessonId === l.id)
            );

            return allLessonsDone ? 100 : 0;
        }
    },
    {
        id: "trenno_ia_completed",
        title: "Maestro IA",
        description: "Completa todos los módulos y lecciones de TIA",
        background: tia_achievement_background,
        categories: ["tia"],
        xpReward: 300,
        getProgress: (user: FullUserDetails) => {
            const tiaProgram = user.programs?.tia;
            if (!tiaProgram) return 0;

            const tiaConfig = programs.find(p => p.id === "tia");
            if (!tiaConfig) return 0;

            return tiaConfig.sections.every(section =>
                section.modules?.every(program_module =>
                    program_module.lessons.every(lesson =>
                        tiaProgram.lessonsCompleted.some(lc => lc.lessonId === lesson.id)
                    )
                )
            ) ? 100 : 0;
        }
    },
    {
        id: "trenno_ia_summer_joined",
        title: "Edición SUMMER 26",
        description: "Participaste del programa exclusivo TRENNO IA SUMMER 2026",
        background: tia_summer_achievement_background,
        categories: ["summer"],
        xpReward: 100,
        getProgress: (user: FullUserDetails) => {
            const tiaSummer = user.programs?.tia_summer;
            return tiaSummer?.isPurchased ? 100 : 0;
        }
    },
    {
        id: "trenno_ia_summer_halfway",
        title: "Mitad de cancha",
        description: "Llegá a la mitad del programa SUMMER",
        background: tia_summer_achievement_background,
        categories: ["summer"],
        xpReward: 150,
        getProgress: (user: FullUserDetails) => {
            const tiaSummer = user.programs?.tia_summer;
            if (!tiaSummer) return 0;
            const completed = (tiaSummer.lessonsCompleted || []).length;
            return completed >= 10 ? 100 : Math.floor((completed / 10) * 100);
        }
    },
    {
        id: "trenno_ia_summer_graduate",
        title: "Graduado SUMMER 26",
        description: "Completá el 100% del programa TRENNO IA SUMMER 2026",
        background: tia_summer_achievement_background,
        categories: ["summer"],
        xpReward: 500,
        getProgress: (user: FullUserDetails) => {
            const tiaSummer = user.programs?.tia_summer;
            if (!tiaSummer) return 0;
            const tiaSummerConfig = programs.find(p => p.id === "tia_summer");
            if (!tiaSummerConfig) return 0;
            const allLessonsDone = tiaSummerConfig.sections.every(section =>
                section.modules?.every(mod =>
                    mod.lessons.every(lesson =>
                        tiaSummer.lessonsCompleted?.some(lc => lc.lessonId === lesson.id)
                    )
                )
            );
            const allInstructionsDone = tiaSummerConfig.sections.every(section =>
                section.modules?.every(mod =>
                    mod.instructions.every(inst =>
                        tiaSummer.instructions?.some(i => i.instructionId === inst.id && i.status === "GRADED")
                    )
                )
            );
            return (allLessonsDone && allInstructionsDone) ? 100 : 0;
        }
    },
];