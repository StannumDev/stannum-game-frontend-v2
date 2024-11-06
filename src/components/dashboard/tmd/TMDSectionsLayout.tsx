'use client';

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { NavbarSection as NavbarSectionType } from "@/interfaces";
import { MissionsIcon, PreseasonIcon, SeasonIcon, SupportIcon, ToolsIcon, TrophyIcon, WarmupIcon } from "@/icons";
import { MotionWrapperLayoutClient, NavbarSection, TMDPreseasonLayout, TMDRankingLayout, TMDSeasonLayout, TMDWarmUpLayout } from "@/components";

const sections: Array<NavbarSectionType> = [
    {
        label: "Calentamiento",
        value: "warmup",
        Icon: WarmupIcon
    },
    {
        label: "Pre temporada",
        value: "preseason",
        Icon: PreseasonIcon
    },
    {
        label: "Temporada",
        value: "season",
        Icon: SeasonIcon
    },
    {
        label: "Soporte",
        value: "support",
        Icon: SupportIcon
    },
    {
        label: "Herramientas",
        value: "tools",
        Icon: ToolsIcon
    },
    {
        label: "Ranking",
        value: "ranking",
        Icon: TrophyIcon
    },
    {
        label: "Misiones",
        value: "missions",
        Icon: MissionsIcon
    }
];

type SectionOptions = 'warmup' | 'preseason' | 'season' | 'support' | 'tools' | 'ranking' | 'missions';

export const TMDSectionsLayout = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const layoutParam = searchParams.get('section');
    const moduleParam = searchParams.get('module');
    const instructionParam = searchParams.get('instruction');

    const [selectedLayout, setSelectedLayout] = useState<SectionOptions>('warmup');
    const [selectedModule, setSelectedModule] = useState<number|null>(null)
    const [selectedInstruction, setSelectedInstruction] = useState<number|null>(null)

    useEffect(() => {
        if (layoutParam && ['warmup', 'preseason', 'season', 'support', 'tools', 'ranking', 'missions'].includes(layoutParam)) {
            setSelectedLayout(layoutParam as SectionOptions);
        } else {
            router.push(`${pathname}?section=preseason`, { scroll: false });
        }

        if (moduleParam && parseInt(moduleParam) > 0) {
            setSelectedModule(parseInt(moduleParam));
        } else {
            setSelectedModule(null);
        }

        if (instructionParam && !moduleParam) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete('instruction');
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        } else if (instructionParam && parseInt(instructionParam) > 0) {
            setSelectedInstruction(parseInt(instructionParam));
        } else {
            setSelectedInstruction(null);
        }

    }, [pathname, router, layoutParam, moduleParam, instructionParam, searchParams]);

    const handleLayoutChange = useCallback((layout: string): void => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedModule){
            setSelectedModule(null);
            params.delete('module');
        };

        if (selectedInstruction){
            setSelectedInstruction(null);
            params.delete('instruction');
        }

        setSelectedLayout(layout as SectionOptions);
        params.set('section', layout);


        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams, selectedModule, selectedInstruction]);

    const handleModuleChange = useCallback((module: number): void => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedInstruction){
            setSelectedInstruction(null);
            params.delete('instruction');
        }

        setSelectedModule(module);
        params.set('module', module.toString());
        params.set('section', selectedLayout);


        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams, selectedLayout, selectedInstruction]);

    const restartModule = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
    
        if (selectedInstruction){
            setSelectedInstruction(null);
            params.delete('instruction');
        }

        setSelectedModule(null);
        params.delete('module');

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams, selectedInstruction]);
    
    const handleInstructionChange = useCallback((instruction: number): void => {
        if (!selectedModule) return;

        setSelectedInstruction(instruction);
        const params = new URLSearchParams(searchParams.toString());
        params.set('section', selectedLayout);
        params.set('module', selectedModule.toString());
        params.set('instruction', instruction.toString());

        router.push(`${pathname}?${params.toString()}`, { scroll: false,  });
    }, [pathname, router, searchParams, selectedLayout, selectedModule]);

    const restartInstruction = useCallback(() => {
        setSelectedInstruction(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('instruction');

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const props = {
        selectedModule,
        handleModuleChange,
        restartModule,
        selectedInstruction,
        handleInstructionChange,
        restartInstruction
    }

    return (
        <MotionWrapperLayoutClient>
            <section className="w-full card px-0">
                <h2 className="mb-4 title-2 px-4 lg:px-6">Explora las posiblidades</h2>
                <NavbarSection<SectionOptions>
                    sections={sections}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
                <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6 overflow-x-hidden">
                    {
                        selectedLayout === 'warmup' ?
                            <TMDWarmUpLayout {...props}/>
                        : selectedLayout === 'preseason' ?
                            <TMDPreseasonLayout {...props}/>
                        : selectedLayout === 'season' ?
                            <TMDSeasonLayout {...props}/>
                        : selectedLayout === 'ranking' &&
                            <TMDRankingLayout/>
                    }
                </div>
            </section>
        </MotionWrapperLayoutClient>
    );
};