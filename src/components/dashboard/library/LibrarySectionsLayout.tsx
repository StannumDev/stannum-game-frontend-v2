'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FullUserDetails, NavbarSection as NavbarSectionType, ProgramCategory } from "@/interfaces";
import { MotionWrapperLayoutClient, NavbarSection, LibraryCard } from "@/components";
import { AppsIcon } from "@/icons";
import { calculateProgramProgress } from "@/utilities";
import { programs } from "@/config/programs";

interface Props { user: FullUserDetails; }

const sections: Array<NavbarSectionType> = [
    { name: "Todos", id: "", Icon: AppsIcon },
    { name: "Principales", id: "main", disabled: true },
    { name: "Gratuitos", id: "free", disabled: true },
    { name: "Shorts", id: "shorts", disabled: true },
];

export const LibrarySectionsLayout = ({ user }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layoutParam = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<ProgramCategory>('');

    useEffect(() => {
        const validCategories: Array<ProgramCategory> = ['', 'main', 'free', 'shorts'];
        const validLayout = layoutParam && validCategories.includes(layoutParam as ProgramCategory) && !sections.find(section => section.id === layoutParam && section.disabled);
        setSelectedLayout(validLayout ? (layoutParam as ProgramCategory) : '');
        if (!validLayout) router.push(pathname, { scroll: false });
    }, [pathname, router, layoutParam]);

    const handleLayoutChange = useCallback((layout: ProgramCategory): void => {
        const params = new URLSearchParams(searchParams.toString());
        setSelectedLayout(layout);
        layout ? params.set('section', layout) : params.delete('section');
        router.push(`${pathname}${layout ? `?${params.toString()}` : ''}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const filteredPrograms = programs.filter(program => user.programs?.[program.id as keyof FullUserDetails['programs']]?.isPurchased).filter(program => !selectedLayout || program.categories.includes(selectedLayout));

    return (
        <MotionWrapperLayoutClient className="grow">
            <section className="size-full card px-0 flex flex-col">
                <h2 className="mb-4 title-2 px-4 lg:px-6">Tus programas</h2>
                <NavbarSection<ProgramCategory>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                {filteredPrograms.length === 0 ? (
                    <div className="w-full grow flex flex-col justify-center items-center text-center">
                        <h2 className="text-2xl font-semibold text-stannum tracking-widest uppercase">¡Aún no te has unido a ningún programa!</h2>
                        <p className="mt-2 text-lg text-card-lightest">Cuando compres tu primer programa, aparecerá en esta sección.</p>
                    </div>
                ) : 
                <div className="px-4 lg:px-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                    {filteredPrograms.map(program => {
                        const progress = calculateProgramProgress(program, user);
                        return (
                            <LibraryCard program={program} key={program.id} progress={progress}/>
                        );
                    })}
                </div>  
                }
            </section>
        </MotionWrapperLayoutClient>
    );
};
