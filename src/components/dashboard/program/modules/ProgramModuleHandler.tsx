'use client'

import { useModuleProgress } from "@/hooks/useModuleProgress";
import { ProgramCompletedModuleCard, ProgramBlockedModuleCard, ProgramPendingModuleCard } from "@/components";
import type { Module, Section } from "@/interfaces";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";

interface Props {
    program_module: Module;
    index: number;
    section: Section;
    programId: string;
}

export const ProgramModuleHandler = ({ program_module, index, section, programId }: Props) => {
  const user = useUserStore(s => s.user);
  const { modules } = section;

  const moduleProgress = useModuleProgress({ program_module, moduleIndex: index, modules, user, programId });
  if(!moduleProgress) return null;

  const { status, lessonsProgress, instructionsProgress } = moduleProgress;
  if (status === "COMPLETED") {
    return (
      <Link href={`/dashboard/library/${programId}/${section.id}/${program_module.id}`} className="w-full">
        <ProgramCompletedModuleCard index={index + 1} title={program_module.name} />
      </Link>
    );
  }

  if (status === "BLOCKED") {
    return <ProgramBlockedModuleCard index={index + 1} title={program_module.name} />;
  }

  return (
    <Link href={`/dashboard/library/${programId}/${section.id}/${program_module.id}`} className="w-full">
      <ProgramPendingModuleCard index={index + 1} title={program_module.name} lessonsProgress={lessonsProgress} instructionsProgress={instructionsProgress}/>
    </Link>
  );
};
