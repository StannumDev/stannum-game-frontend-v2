'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FullUserDetails, NavbarSection as NavbarSectionType } from "@/interfaces";
import { MedalIcon } from "@/icons";
import { AchievementsLayout, MotionWrapperLayoutClient, NavbarSection } from "@/components";

interface Props {
    user: FullUserDetails
}

const sections: Array<NavbarSectionType> = [
    { name: "Logros", id: "achievements", Icon: MedalIcon },
    { name: "TMD", id: "tmd", disabled: true },
    { name: "TIA", id: "tia", disabled: true },
];

type SectionOptions = 'achievements' | 'tmd' | 'tia'

export const ProfileSectionsLayout = ({user}:Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layoutParam = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>('achievements');

    useEffect(() => {
        const validCategories: Array<SectionOptions> = ['achievements', 'tmd', 'tia'];
        const validLayout = layoutParam && validCategories.includes(layoutParam as SectionOptions) && !sections.find(section => section.id === layoutParam && section.disabled);
        setSelectedLayout(validLayout ? (layoutParam as SectionOptions) : 'achievements');
        if (!validLayout) router.push(pathname, { scroll: false });
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
                <NavbarSection<SectionOptions>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 content-visibility-auto">
                    { selectedLayout === 'achievements' && <AchievementsLayout user={user}/>}
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};