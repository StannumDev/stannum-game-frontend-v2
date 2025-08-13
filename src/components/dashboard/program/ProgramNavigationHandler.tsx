'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { NavbarSection } from "@/components"
import type { Program } from "@/interfaces";

type SectionOptions = 'session_1' | 'session_2' | 'session_3';

interface Props {
    program: Program
}

export const ProgramNavigationHandler = ({ program }: Props) => {

    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>(program.sections[0].id as SectionOptions);
    const router = useRouter();

    const handleLayoutChange = useCallback((layout: string): void => {
        setSelectedLayout(layout as SectionOptions);
        router.push(`/dashboard/library/${program.id.toLowerCase()}/${layout}`, { scroll: false });
    }, [router, program.id]);

    return (
        <NavbarSection<SectionOptions>
            sections={program.sections}
            selectedLayout={selectedLayout}
            handleLayoutChange={handleLayoutChange}
        />
    )
}
