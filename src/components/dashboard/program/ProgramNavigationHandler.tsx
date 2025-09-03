'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";
import { NavbarSection } from "@/components"
import type { Program } from "@/interfaces";

interface Props {
    program: Program
}

export const ProgramNavigationHandler = ({ program }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const sectionIds = useMemo(() => {
        return program.sections.map(section => section.id);
    }, [program.sections]);

    type SectionOptions = typeof sectionIds[number];

    const getCurrentSectionFromUrl = useCallback((): SectionOptions => {
        const pathSegments = pathname.split('/');
        const programIndex = pathSegments.findIndex(segment => segment === program.id.toLowerCase());
        if (programIndex === -1 || programIndex === pathSegments.length - 1) return sectionIds[0] as SectionOptions;
        const potentialSectionSegment = pathSegments[programIndex + 1];
        const matchingSection = program.sections.find(section => section.id === potentialSectionSegment);
        if (matchingSection) return matchingSection.id as SectionOptions;
        return sectionIds[0] as SectionOptions;
    }, [pathname, program.id, program.sections, sectionIds]);

    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>(getCurrentSectionFromUrl());

    useEffect(() => {
        const currentSection = getCurrentSectionFromUrl();
        setSelectedLayout(currentSection);
    }, [getCurrentSectionFromUrl]);

    const handleLayoutChange = useCallback((layout: string): void => {
        const isValidSection = sectionIds.includes(layout);
        if (!isValidSection) notFound();
        setSelectedLayout(layout as SectionOptions);
        router.push(`/dashboard/library/${program.id.toLowerCase()}/${layout}`, { scroll: false });
    }, [router, program.id, sectionIds]);

    return (
        <NavbarSection<SectionOptions>
            sections={program.sections}
            selectedLayout={selectedLayout}
            handleLayoutChange={handleLayoutChange}
        />
    )
}
