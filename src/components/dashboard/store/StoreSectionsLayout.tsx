'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NavbarSection as NavbarSectionType } from "@/interfaces";
import { ChessBishopIcon, ChessKingicon, ChessKnightIcon, ChessPawnIcon, ChessQueenIcon } from "@/icons";
import { StoreAllSection, MotionWrapperLayoutClient, NavbarSection } from "@/components";

const sections: Array<NavbarSectionType> = [
    {
        label: "Todos",
        value: "",
        Icon: ChessKingicon
    },
    {
        label: "Principales",
        value: "main",
        Icon: ChessQueenIcon,
    },
    {
        label: "Gratuitos",
        value: "free",
        Icon: ChessKnightIcon,
    },
    {
        label: "Charlas",
        value: "talks",
        Icon: ChessBishopIcon,
    },
    {
        label: "Shorts",
        value: "shorts",
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
                <h2 className="mb-4 title-2 px-4 lg:px-6">Conoce nuestros programas</h2>
                <NavbarSection<SectionOptions>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 overflow-x-hidden">
                    {selectedLayout === '' ? <StoreAllSection/> : <></>
                    }
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};
