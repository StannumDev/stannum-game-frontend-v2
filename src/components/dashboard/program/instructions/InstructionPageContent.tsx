'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GoBackButton, ProgramInstructionDetails, LoadingScreen } from '@/components';
import { useUserStore } from '@/stores/userStore';
import { isInstructionAvailable } from '@/utilities';
import type { Instruction, InstructionDetails, Lesson, Module, Program, ProgramId } from '@/interfaces';

interface Props {
    instruction: Instruction;
    program_module: Module;
    program: Program;
    programId: string;
}

export const InstructionPageContent = ({ instruction, program_module, program, programId }: Props) => {
    const router = useRouter();
    const user = useUserStore(s => s.user);
    const isLoading = useUserStore(s => s.isLoading);
    const [checked, setChecked] = useState(false);

    const typedProgramId = programId as ProgramId;

    useEffect(() => {
        if (!isLoading && user) {
            const available = isInstructionAvailable(user, typedProgramId, instruction);
            if (!available) {
                router.replace(`/dashboard/library/${programId}`);
            } else {
                setChecked(true);
            }
        }
    }, [isLoading, user, typedProgramId, instruction, programId, router]);

    if (isLoading || !user || !checked) return <LoadingScreen />;

    const userProgram = user.programs?.[typedProgramId];
    const userInstruction: InstructionDetails | undefined = userProgram?.instructions.find((ui) => ui.instructionId === instruction.id);

    const relatedLessons: Lesson[] = (instruction.relatedLessonIds || []).map(id => program_module.lessons.find(l => l.id === id)).filter((l): l is Lesson => l !== undefined);

    const allModules = program.sections.flatMap(s => s.modules || []);
    const allLessons = allModules.flatMap(m => m.lessons);
    const referencedLessons: Lesson[] = (userInstruction?.referencedLessons || []).map(id => allLessons.find(l => l.id === id)).filter((l): l is Lesson => l !== undefined);

    return (
        <main className="main-container min-h-0 p-0 flex flex-col items-start">
            <h1 className="sr-only">{instruction.title}</h1>
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <ProgramInstructionDetails
                programId={typedProgramId}
                instruction={instruction}
                userInstruction={userInstruction}
                relatedLessons={relatedLessons}
                referencedLessons={referencedLessons}
            />
        </main>
    );
};
