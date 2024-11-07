'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChessPawn, FaChessKing, FaChessKnight } from 'react-icons/fa6';
import type { NavbarSection as NavbarSectionType } from "@/interfaces";
import { LibraryAllSection, MotionWrapperLayoutClient, NavbarSection } from "@/components";
import { AppsIcon } from "@/icons";

const sections: Array<NavbarSectionType> = [
    {
        label: "Todos",
        value: "",
        Icon: AppsIcon
    },
    {
        label: "Principales",
        value: "main",
        Icon: FaChessKing
    },
    {
        label: "Gratuitos",
        value: "free",
        Icon: FaChessKnight,
    },
    {
        label: "Shorts",
        value: "shorts",
        Icon: FaChessPawn,
    },
];

type SectionOptions = '' | 'main' | 'free' | 'shorts';

export const LibrarySectionsLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layoutParam = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>('');

    useEffect(() => {
        const validLayout = layoutParam && ['', 'main', 'free', 'shorts'].includes(layoutParam);
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
                <h2 className="mb-4 title-2 px-4 lg:px-6">Tus programas</h2>
                <NavbarSection<SectionOptions>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 overflow-x-hidden">
                    {selectedLayout === '' ? <LibraryAllSection/> : <></>
                    }
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};
