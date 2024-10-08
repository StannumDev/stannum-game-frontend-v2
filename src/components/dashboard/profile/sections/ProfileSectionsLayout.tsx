'use client';

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiMedalFill } from "react-icons/ri";
import type { NavbarSection as NavbarSectionType } from "@/interfaces";
import { AchievementsLayout, MotionWrapperLayout, NavbarSection } from "@/components";

const sections: Array<NavbarSectionType> = [
    {
        label: "Logros",
        value: "achievements",
        Icon: RiMedalFill
    },
    {
        label: "TMD",
        value: "tmd"
    },
    {
        label: "PROEM",
        value: "proem"
    },
    {
        label: "Hola",
        value: "hola"
    },
    {
        label: "Chau",
        value: "chau"
    },
];

type sectionOptions = 'achievements' | 'tmd' | 'proem' | 'hola' | 'chau'

export const ProfileSectionsLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layout = searchParams.get('section');
    const [selectedLayout, setSelectedLayout] = useState<sectionOptions>('achievements');

    // Actualiza el estado basado en la URL al cargar el componente o cambiar la URL
    useEffect(() => {
        if (layout && ['achievements', 'tmd', 'proem', 'hola', 'chau'].includes(layout)) {
            setSelectedLayout(layout as sectionOptions);
        } else {
            router.replace(`${pathname}?section=achievements`, { scroll: false });
        }
    }, [layout, pathname, router]);

    const handleLayoutChange = (layout: string): void => {
        setSelectedLayout(layout as sectionOptions);
        router.replace(`${pathname}?section=${layout}`, { scroll: false });
    };

    return (
        <MotionWrapperLayout>
            <section className="w-full card px-0">
                <NavbarSection
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6">
                    {selectedLayout === 'achievements' && <AchievementsLayout />}
                </div>
            </section>
        </MotionWrapperLayout>
    );
};