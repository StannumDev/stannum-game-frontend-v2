import { notFound, redirect } from 'next/navigation';
import { GoBackButton, ProgramLessonCard, ProgramInstructionCard } from '@/components';
import { programs } from "@/config/programs";
import { getUserByToken } from '@/services';
import type { Module, Program, Section, Instruction } from '@/interfaces';

interface Props {
  params: {
    program_id: string;
    section: string;
    program_module: string;
  };
}

export default async function ProgramModulePage({ params }: Props) {
    const { program_id, section, program_module } = params;

    const foundProgram: Program | undefined = programs.find(program => program.id === program_id.toLowerCase());
    const foundSection: Section | undefined = foundProgram?.sections.find(sec => sec.id === section);
    const foundModule: Module | undefined = foundSection?.modules.find(mod => mod.id === program_module);

    const user = await getUserByToken();
    if (!user) redirect("/login");

    if (!foundModule) return notFound()

    const userLessons = user.programs?.[program_id as keyof typeof user.programs]?.lessonsCompleted || [];
    const userInstructions = user.programs?.[program_id as keyof typeof user.programs]?.instructions || [];

    return (
        <section className="w-full">
            <GoBackButton className='text-card-lightest hover:text-white lg:hover:bg-card' />
            <div className="mt-4 w-full flex flex-col">
                <span className="subtitle-1">{foundModule.name}</span>
                <h2 className="title-2 text-lg lg:text-2xl">{foundModule.description}</h2>
            </div>
            <div className='mt-6 w-full'>
                <section className="mt-4 w-full">
                    <h3 className="subtitle-1">Lecciones</h3>
                    <div className="mt-4 w-full flex flex-col gap-4">
                        {foundModule.lessons.map((lesson, index) => {
                        const isCompleted = userLessons.some((ul) => ul.lessonId === lesson.id);
                        return (
                            <ProgramLessonCard
                                key={lesson.id}
                                index={index + 1}
                                programName={program_id}
                                id={lesson.id}
                                title={lesson.title}
                                completed={isCompleted}
                            />
                        );
                        })}
                    </div>
                </section>
                <section className="mt-6 w-full">
                    <h3 className="subtitle-1">Instrucciones</h3>
                    <div className="mt-4 w-full flex flex-col gap-4">
                        {foundModule.instructions.map((instruction: Instruction, index: number) => {
                        const userInstruction = userInstructions.find((ui) => ui.instructionId === instruction.id);
                        const completed = userInstruction?.status === "GRADED";
                        const inProcess = userInstruction?.status === "IN_PROCESS" || userInstruction?.status === "SUBMITTED";

                        return (
                            <ProgramInstructionCard
                            key={instruction.id}
                            index={index + 1}
                            title={instruction.title}
                            completed={completed}
                            inProcess={inProcess}
                            />
                        );
                        })}
                    </div>
                </section>
            </div>
        </section>
    );
}
