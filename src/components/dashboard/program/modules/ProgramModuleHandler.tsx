import { useModuleProgress } from "@/hooks/useModuleProgress";
import { ProgramCompletedModuleCard, ProgramBlockedModuleCard, ProgramPendingModuleCard } from "@/components";
import type { FullUserDetails, Module, Section } from "@/interfaces";
import Link from "next/link";

interface Props {
    program_module: Module;
    index: number;
    section: Section;
    user: FullUserDetails;
    programId: string;
}

export const ProgramModuleHandler = ({ program_module, index, section, user, programId }: Props) => {
  const { modules } = section;
  const { status, lessonsProgress, instructionsProgress } = useModuleProgress({ program_module, moduleIndex: index, modules, user, programId });
  // console.log({ status, lessonsProgress, instructionsProgress });
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
