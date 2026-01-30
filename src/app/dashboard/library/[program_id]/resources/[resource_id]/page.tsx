import { notFound } from "next/navigation";
import { Program, Resource } from "@/interfaces";
import { programs } from "@/config/programs";
import { DocumentIcon, EditIcon, FolderColourIcon, PlayCircleIcon, SlidesIcon } from "@/icons";
import { GoBackButton } from "@/components/ui/GoBackButton";
import Link from "next/link";

interface Props {
    params: Promise<{
        program_id: string;
        resource_id: string;
    }>;
}

function ResourceIcon({ type }: { type: Resource['type'] }) {
    return type === "document" ? <DocumentIcon className="text-[#2684fc] size-12"/> :
        type === "folder" ? <FolderColourIcon className="size-12"/> :
        type === "presentation" ? <SlidesIcon className="text-[#ffba00] size-12"/> :
        type === "activity" ? <EditIcon className="text-stannum size-12"/> :
        type === "video" ? <PlayCircleIcon className="text-invalid size-12"/> :
        null;
}

export default async function ProgramResourceFolderPage({ params }: Props) {
    const { program_id, resource_id } = await params;
    const foundProgram:Program|undefined = programs.find(program => program.id === program_id.toLowerCase());
    const foundSection = foundProgram?.sections.find(sec => sec.id === "resources");
    const foundResource = foundSection?.resources?.find(r => r.id === resource_id);
    if (!foundProgram || !foundSection || !foundResource || !foundResource.children) return notFound();
    return (
        <div className="w-full flex flex-col gap-4">
            <div>
                <GoBackButton />
            </div>
            <h3 className="text-2xl font-bold">{foundResource.title}</h3>
            <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {
                    foundResource.children.map( (resource, i:number) =>
                        resource.link ? (
                            <Link
                                key={i}
                                href={resource.link}
                                target="_blank"
                                className="w-full p-4 lg:p-6 rounded-lg bg-card border border-card-light card-link flex items-center gap-4 lg:gap-6"
                            >
                                <div className="size-12 shrink-0">
                                    <ResourceIcon type={resource.type} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-lg leading-tight font-semibold sm:line-clamp-2">{resource.title}</h4>
                                    <h5 className="mt-2 subtitle-1 no-truncate sm:line-clamp-2">{resource.description}</h5>
                                </div>
                            </Link>
                        ) : null
                    )
                }
            </section>
        </div>
    );
}
