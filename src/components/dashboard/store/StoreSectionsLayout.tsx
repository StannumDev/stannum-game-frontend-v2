'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NavbarSection as NavbarSectionType, ProgramCategory } from "@/interfaces";
import { NewAppsIcon } from "@/icons";
import { MotionWrapperLayout, NavbarSection, StoreCard, StoreTinsBalance, StoreTutorial } from "@/components";
import { programs } from "@/config/programs";
import { useUserStore } from "@/stores/userStore";

const sections: Array<NavbarSectionType> = [
    { name: "Todos", id: "", Icon: NewAppsIcon },
    { name: "Principales", id: "main", disabled: true },
    { name: "Gratuitos", id: "free", disabled: true },
    { name: "Shorts", id: "shorts", disabled: true },
];

export const StoreSectionsLayout = () => {
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

    const filteredPrograms = programs.filter(program => !selectedLayout || program.categories.includes(selectedLayout as ProgramCategory));

    return (
        <MotionWrapperLayout>
            <section className="w-full card px-0">
                <div className="mb-4 w-full px-4 lg:px-6 flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <h2 className="title-2">Programas</h2>
                        <StoreTutorial/>
                    </div>
                    <StoreTinsBalance/>
                </div>
                <NavbarSection<ProgramCategory>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 overflow-x-hidden grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                    {filteredPrograms.length === 0 && (
                        <div className="col-span-full text-center">
                            <h2 className="text-2xl font-semibold text-stannum">No hay programas disponibles</h2>
                            <p className="mt-2 text-lg text-card-lightest">Selecciona otra categoría o revisa la tienda más tarde.</p>
                        </div>
                    )}
                    {filteredPrograms.map(program => {
                        const isPurchased = user?.programs?.[program.id as keyof typeof user.programs]?.isPurchased ?? false;
                        return (
                            <StoreCard
                                key={program.id}
                                program={program}
                                isPurchased={isPurchased}
                            />
                        );
                    })}
                </div>
            </section>
        </MotionWrapperLayout>
    );
};