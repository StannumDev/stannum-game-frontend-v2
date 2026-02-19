'use client';

import { useRouter } from 'next/navigation';
import { LoadingScreen, LessonVideoPlayer, LessonMiniatureCard, InstructionMiniatureCard, GoBackButton } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { isLessonAvailable, isInstructionAvailable, isModuleComplete } from '@/utilities';
import type { Instruction, Lesson, Module, Program, ProgramId, Section } from '@/interfaces';
import { useEffect, useState } from 'react';

interface Props {
    lesson: Lesson;
    program_module: Module;
    section: Section;
    program: Program;
    programId: string;
    lessonId: string;
}

export const LessonPageContent = ({ lesson, program_module, section, program, programId, lessonId }: Props) => {
    const router = useRouter();
    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);
    const [checked, setChecked] = useState(false);

    const typedProgramId = programId as ProgramId;

    useEffect(() => {
        if (!isLoading && user) {
            const available = isLessonAvailable(user, typedProgramId, program_module, lesson.id);
            if (!available) {
                router.replace(`/dashboard/library/${programId}`);
            } else {
                setChecked(true);
            }
        }
    }, [isLoading, user, typedProgramId, program_module, lesson.id, programId, router]);

    if (isLoading || !user || !checked) return <LoadingScreen />;

    const isCompleted = user.programs?.[programId as keyof typeof user.programs]?.lessonsCompleted?.some((ul) => ul.lessonId === lesson.id);
    const currentIndex = program_module.lessons.findIndex(l => l.id === lesson.id);
    const nextLessonObj = program_module.lessons[currentIndex + 1];
    const isNextLessonAvailable = nextLessonObj ? isLessonAvailable(user, typedProgramId, program_module, nextLessonObj.id, [lesson.id]) : false;

    const userInstructions = user.programs?.[typedProgramId]?.instructions || [];

    const nextInstructionConfig = program_module.instructions
        .filter(inst => inst.afterLessonId === lesson.id)
        .find(inst => isInstructionAvailable(user, typedProgramId, inst, [lesson.id]));
    const nextInstruction = nextInstructionConfig ? { id: nextInstructionConfig.id, title: nextInstructionConfig.title } : undefined;

    const allModulesWithSection: Array<{ module: Module; section: Section }> = [];
    for (const sec of program.sections) {
        for (const mod of sec.modules || []) {
            allModulesWithSection.push({ module: mod, section: sec });
        }
    }
    const currentModuleIndex = allModulesWithSection.findIndex(m => m.module.id === program_module.id);
    const nextModuleEntry = allModulesWithSection[currentModuleIndex + 1];
    const nextModuleFirstLesson = nextModuleEntry?.module.lessons[0];
    const isCurrentModuleComplete = isModuleComplete(user, typedProgramId, program_module, [lesson.id]);
    const nextModule = nextModuleEntry && nextModuleFirstLesson && isCurrentModuleComplete ? { name: nextModuleEntry.module.name, firstLessonId: nextModuleFirstLesson.id } : undefined;

    const miniatureItems: Array<{ type: 'lesson'; lesson: Lesson; index: number } | { type: 'instruction'; instruction: Instruction }> = [];
    program_module.lessons.forEach((l, i) => {
        miniatureItems.push({ type: 'lesson', lesson: l, index: i + 1 });
        const instructionsAfter = program_module.instructions.filter(inst => inst.afterLessonId === l.id);
        for (const inst of instructionsAfter) {
            miniatureItems.push({ type: 'instruction', instruction: inst });
        }
    });

    const renderMiniatureList = () => miniatureItems.map((item) => {
        if (item.type === 'lesson') {
            const lessonCompleted = user.programs?.[programId as keyof typeof user.programs]?.lessonsCompleted?.some((ul) => ul.lessonId === item.lesson.id);
            const available = isLessonAvailable(user, typedProgramId, program_module, item.lesson.id);
            return (
                <LessonMiniatureCard
                    key={item.lesson.id}
                    lesson={item.lesson}
                    index={item.index}
                    programId={programId}
                    isCurrent={item.lesson.id === lessonId}
                    isCompleted={lessonCompleted}
                    isAvailable={available}
                />
            );
        } else {
            const userInstr = userInstructions.find(ui => ui.instructionId === item.instruction.id);
            const available = isInstructionAvailable(user, typedProgramId, item.instruction);
            return (
                <InstructionMiniatureCard
                    key={item.instruction.id}
                    instruction={item.instruction}
                    programId={programId}
                    isAvailable={available}
                    userInstruction={userInstr}
                />
            );
        }
    });

    return (
        <main className="main-container min-h-0 p-0 flex flex-col items-start">
            <h1 className="sr-only">{lesson.longTitle}</h1>
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' href={`/dashboard/library/${programId}/${section.id}/${program_module.id}`} />
            <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="col-span-1 lg:col-span-3">
                    <LessonVideoPlayer
                        program={programId}
                        lesson={lesson}
                        moduleLessons={program_module.lessons}
                        isCompleted={isCompleted}
                        isNextLessonAvailable={isNextLessonAvailable}
                        nextInstruction={nextInstruction}
                        nextModule={nextModule}
                        userId={user.username}
                    />
                </div>
                <div className="hidden lg:block content-visibility-hidden lg:content-visibility-visible col-span-1 w-full max-h-none relative overflow-y-auto">
                    <div className="size-full pr-4 flex flex-col gap-2 absolute top-0 left-0">
                        {renderMiniatureList()}
                    </div>
                </div>
            </div>
            <div className="mt-6 w-full flex flex-col">
                <p className="subtitle-1"> {section.name} | {program_module.name}</p>
                <div className="w-full flex justify-between gap-4">
                    <div className="flex flex-col">
                        <h2 className="title-2">{lesson.title}</h2>
                    </div>
                </div>
                <span className="my-4 lg:mb-6 block w-full h-px bg-card-light"></span>
                <div className="w-full max-w-5xl h-64 lg:h-auto text-sm text-left overflow-y-auto relative">
                    <div dangerouslySetInnerHTML={{ __html: lesson.description }} className="size-full absolute lg:static top-0 left-0 whitespace-pre-line flex flex-col gap-4 lesson-description"/>
                </div>
            </div>
            <div className="mt-4 lg:hidden lg:content-visibility-hidden w-full h-96 relative overflow-y-auto overflow-x-hidden">
                <div className="size-full flex flex-col gap-2 absolute top-0 left-0">
                    {renderMiniatureList()}
                </div>
            </div>
        </main>
    );
};
