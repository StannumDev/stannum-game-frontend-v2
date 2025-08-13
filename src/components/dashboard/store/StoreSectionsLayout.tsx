'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NavbarSection as NavbarSectionType } from "@/interfaces";
import { ChessBishopIcon, ChessKingicon, ChessKnightIcon, ChessPawnIcon, NewAppsIcon } from "@/icons";
import { StoreAllSection, MotionWrapperLayoutClient, NavbarSection, StoreTutorial } from "@/components";

const sections: Array<NavbarSectionType> = [
    {
        name: "Todos",
        id: "",
        Icon: NewAppsIcon
    },
    {
        name: "Principales",
        id: "main",
        Icon: ChessKingicon
    },
    {
        name: "Gratuitos",
        id: "free",
        Icon: ChessKnightIcon,
    },
    {
        name: "Charlas",
        id: "talks",
        Icon: ChessBishopIcon,
    },
    {
        name: "Shorts",
        id: "shorts",
        Icon: ChessPawnIcon,
    },
];

type SectionOptions = '' | 'main' | 'free' | 'talks' | 'shorts';

export const StoreSectionsLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layoutParam = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>('');

    useEffect(() => {
        const validLayout = layoutParam && ['', 'main', 'free', 'talks', 'shorts'].includes(layoutParam);
        setSelectedLayout(validLayout ? (layoutParam as SectionOptions) : '');

        if (!validLayout) {
            router.push(pathname, { scroll: false });
        }
    }, [pathname, router, layoutParam]);

    const handleLayoutChange = useCallback((layout: SectionOptions): void => {
        const params = new URLSearchParams(searchParams.toString());
        setSelectedLayout(layout);
        layout ? params.set('section', layout) : params.delete('section');
        router.push(`${pathname}${layout ? `?${params.toString()}` : ''}`, { scroll: false });
    }, [pathname, router, searchParams]);

    return (
        <MotionWrapperLayoutClient>
            <section className="w-full card px-0">
                <div className="mb-4 w-full px-4 lg:px-6 flex justify-between lg:justify-start items-start lg:items-center gap-2">
                    <h2 className="title-2">Conoce nuestros programas</h2>
                    <StoreTutorial/>
                </div>
                <NavbarSection<SectionOptions>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 overflow-x-hidden">
                    { selectedLayout === '' ?
                        <StoreAllSection/>
                    :
                        <></>
                    }
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};
