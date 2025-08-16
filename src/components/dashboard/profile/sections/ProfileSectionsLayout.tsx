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
    {
        name: "Logros",
        id: "achievements",
        Icon: MedalIcon
    },
    {
        name: "TMD",
        id: "tmd"
    },
    {
        name: "TIA",
        id: "tia"
    },
];

type SectionOptions = 'achievements' | 'tmd' | 'tia'

export const ProfileSectionsLayout = ({user}:Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layout = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>('achievements');

    useEffect(() => {
        if (layout && ['achievements', 'tmd', 'tia'].includes(layout)) {
            setSelectedLayout(layout as SectionOptions);
        } else {
            router.replace(`${pathname}?section=achievements`, { scroll: false });
        }
    }, [layout, pathname, router]);

    const handleLayoutChange = useCallback((layout: string): void => {
        setSelectedLayout(layout as SectionOptions);
        router.replace(`${pathname}?section=${layout}`, { scroll: false });
    }, [pathname, router, setSelectedLayout])

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