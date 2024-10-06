'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NavbarSection as NavbarSectionType } from "@/interfaces";
import { MotionWrapperLayout, NavbarSection } from "@/components";
import { RiFireLine, RiFlagLine, RiMedal2Line, RiCustomerService2Line, RiToolsLine, RiTrophyLine, RiShieldStarLine } from "react-icons/ri";

const sections: Array<NavbarSectionType> = [
    {
        label: "Calentamiento",
        value: "warmup",
        Icon: RiFireLine
    },
    {
        label: "Pre temporada",
        value: "preseason",
        Icon: RiFlagLine
    },
    {
        label: "Temporada",
        value: "season",
        Icon: RiMedal2Line
    },
    {
        label: "Soporte",
        value: "support",
        Icon: RiCustomerService2Line
    },
    {
        label: "Herramientas",
        value: "tools",
        Icon: RiToolsLine
    },
    {
        label: "Ranking",
        value: "ranking",
        Icon: RiTrophyLine
    },
    {
        label: "Misiones",
        value: "missions",
        Icon: RiShieldStarLine
    }
];

type sectionOptions = 'warmup' | 'preseason' | 'season' | 'support' | 'tools' | 'ranking' | 'missions';

export const TMDSectionsLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layout = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<sectionOptions>('warmup');

    useEffect(() => {
        if (layout && ['warmup', 'preseason', 'season', 'support', 'tools', 'ranking', 'missions'].includes(layout)) {
            setSelectedLayout(layout as sectionOptions);
        } else {
            router.replace(`${pathname}?section=warmup`, { scroll: false });
        }
    }, [layout, pathname, router]);

    const handleLayoutChange = (layout: string): void => {
        setSelectedLayout(layout as sectionOptions);
        router.replace(`${pathname}?section=${layout}`, { scroll: false });
    };

    return (
        <MotionWrapperLayout>
            <section className="w-full card px-0">
                <h2 className="mb-4 title-2 px-4 lg:px-6">Explora las posiblidades</h2>
                <NavbarSection
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="my-4 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6">
                    {/* {selectedLayout === 'achievements' && <AchievementsLayout />} */}
                </div>
            </section>
        </MotionWrapperLayout>
    );
};