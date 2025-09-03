import { notFound } from "next/navigation";
import { Program } from "@/interfaces";
import { programs } from "@/config/programs";
import { DocumentIcon, EditIcon, FolderColourIcon, PlayCircleIcon, SlidesIcon } from "@/icons";
import Link from "next/link";

interface Props {
    params: {
        program_id: string;
    };
}

export default async function ProgramResourcesPage({ params }: Props) {
    const { program_id } = params;
    const foundProgram:Program|undefined = programs.find(program => program.id === program_id.toLowerCase());
    const foundSection = foundProgram?.sections.find(sec => sec.id === "resources");
    if (!foundProgram || !foundSection || !foundSection.resources) return notFound();
    return (
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            <h3 className="sr-only">Recursos</h3>
            {
                foundSection.resources.map( (resource, i:number) => 
                    <Link
                        key={i}
                        href={resource.link}
                        target="_blank"
                        className="w-full p-4 lg:p-6 rounded-lg bg-card border border-card-light card-link flex items-center gap-4 lg:gap-6"
                    >
                        <div className="size-12 shrink-0">
                            {
                                resource.type === "document" ? <DocumentIcon className="text-[#2684fc] size-12"/> :
                                resource.type === "folder" ? <FolderColourIcon className="size-12"/> :
                                resource.type === "presentation" ? <SlidesIcon className="text-[#ffba00] size-12"/> :
                                resource.type === "activity" ? <EditIcon className="text-stannum size-12"/> :
                                resource.type === "video" && <PlayCircleIcon className="text-invalid size-12"/>
                            }
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-lg leading-tight font-semibold sm:line-clamp-2">{resource.title}</h4>
                            <h5 className="mt-2 subtitle-1 no-truncate sm:line-clamp-2">{resource.description}</h5>
                        </div>
                    </Link>
                )
            }
        </section>
    );
}