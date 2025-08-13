'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChessPawn, FaChessKing, FaChessKnight } from 'react-icons/fa6';
import type { FullUserDetails, NavbarSection as NavbarSectionType } from "@/interfaces";
import { LibraryAllSection, MotionWrapperLayoutClient, NavbarSection } from "@/components";
import { AppsIcon } from "@/icons";

interface Props {
    user: FullUserDetails;
}

const sections: Array<NavbarSectionType> = [
    {
        name: "Todos",
        id: "",
        Icon: AppsIcon
    },
    {
        name: "Principales",
        id: "main",
        Icon: FaChessKing
    },
    {
        name: "Gratuitos",
        id: "free",
        Icon: FaChessKnight,
    },
    {
        name: "Shorts",
        id: "shorts",
        Icon: FaChessPawn,
    },
];

type SectionOptions = '' | 'main' | 'free' | 'shorts';

export const LibrarySectionsLayout = ({ user }: Props) => {
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
                    { selectedLayout === '' && <LibraryAllSection user={user}/> }
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};
