'use client';

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FullUserDetails, NavbarSection as NavbarSectionType, ProgramCategory } from "@/interfaces";
import { MotionWrapperLayout, NavbarSection, LibraryCard } from "@/components";
import { AppsIcon, KeyIcon } from "@/icons";
import { calculateProgramProgress } from "@/utilities";
import { programs } from "@/config/programs";
import { useUserStore } from "@/stores/userStore";

const sections: Array<NavbarSectionType> = [
    { name: "Todos", id: "", Icon: AppsIcon },
    { name: "Principales", id: "main", disabled: true },
    { name: "Gratuitos", id: "free", disabled: true },
    { name: "Shorts", id: "shorts", disabled: true },
];

export const LibrarySectionsLayout = () => {
    const user = useUserStore(s => s.user);
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

    if (!user) return null;

    const filteredPrograms = programs.filter(program => user.programs?.[program.id as keyof FullUserDetails['programs']]?.isPurchased).filter(program => !selectedLayout || program.categories.includes(selectedLayout));

    return (
        <MotionWrapperLayout className="grow">
            <section className="size-full card px-0 flex flex-col">
                <h2 className="mb-4 title-2 px-4 lg:px-6">Tus programas</h2>
                <NavbarSection<ProgramCategory>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                {filteredPrograms.length === 0 ? (
                    <div className="w-full grow flex flex-col justify-center items-center text-center gap-4">
                        <h2 className="text-2xl font-semibold text-stannum">¡Aún no te has unido a ningún programa!</h2>
                        <p className="text-lg text-card-lightest">Cuando actives tu primer programa, aparecerá en esta sección.</p>
                        <Link href="/dashboard?activar=true" className="mt-2 px-4 py-2 bg-stannum hover:bg-stannum-light text-card text-sm font-semibold rounded-lg flex items-center gap-2 transition-200">
                            <KeyIcon className="size-4" />
                            Activar clave de producto
                        </Link>
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
        </MotionWrapperLayout>
    );
};
