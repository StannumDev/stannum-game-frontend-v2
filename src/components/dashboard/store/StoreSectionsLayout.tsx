'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NavbarSection as NavbarSectionType, ProgramCategory, FullUserDetails } from "@/interfaces";
import { ChessKingicon, ChessKnightIcon, ChessPawnIcon, NewAppsIcon } from "@/icons";
import { MotionWrapperLayoutClient, NavbarSection, StoreCard, StoreTutorial } from "@/components";
import { programs } from "@/config/programs";

interface Props {
    user: FullUserDetails;
}

const sections: Array<NavbarSectionType> = [
    { name: "Todos", id: "", Icon: NewAppsIcon },
    { name: "Principales", id: "main", Icon: ChessKingicon, disabled: true },
    { name: "Gratuitos", id: "free", Icon: ChessKnightIcon, disabled: true },
    { name: "Shorts", id: "shorts", Icon: ChessPawnIcon, disabled: true },
];

export const StoreSectionsLayout = ({ user }: Props) => {
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
        <MotionWrapperLayoutClient>
            <section className="w-full card px-0">
                <div className="mb-4 w-full px-4 lg:px-6 flex justify-between lg:justify-start items-start lg:items-center gap-2">
                    <h2 className="title-2">Conoce nuestros programas</h2>
                    <StoreTutorial/>
                </div>
                <NavbarSection<ProgramCategory>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 overflow-x-hidden grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
                    {filteredPrograms.length === 0 && (
                        <div className="col-span-full text-center">
                            <h2 className="text-2xl font-semibold text-stannum">No hay programas disponibles</h2>
                            <p className="mt-2 text-lg text-card-lightest">Selecciona otra categoría o revisa la tienda más tarde.</p>
                        </div>
                    )}
                    {filteredPrograms.map(program => {
                        const isPurchased = user.programs?.[program.id as keyof typeof user.programs]?.isPurchased ?? false;
                        return (
                            <StoreCard
                                key={program.id}
                                id={program.id}
                                name={program.name}
                                description={program.description}
                                logo={program.logo}
                                price={program.price}
                                isPurchased={isPurchased}
                            />
                        );
                    })}
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};