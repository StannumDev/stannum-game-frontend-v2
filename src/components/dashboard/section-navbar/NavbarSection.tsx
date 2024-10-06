'use client'

import { useEffect } from "react";
import { NavbarSection as NavbarSectionType } from "@/interfaces";
import { NavbarSectionButton } from "@/components";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Props {
    sections: Array<NavbarSectionType>;
    selectedLayout: string;
    handleLayoutChange: (layout: string) => void;
}

export const NavbarSection = ({ sections, selectedLayout, handleLayoutChange }: Props) => {
    
    const navigate = (direction: 'previous' | 'next') => {
        const currentIndex = sections.findIndex(section => section.value === selectedLayout);
        
        if (direction === 'previous' && currentIndex > 0) {
            handleLayoutChange(sections[currentIndex - 1].value);
        }
    
        if (direction === 'next' && currentIndex < sections.length - 1) {
            handleLayoutChange(sections[currentIndex + 1].value);
        }
    };

    // useEffect para agregar el listener de teclado
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                navigate('previous');
            } else if (event.key === 'ArrowRight') {
                navigate('next');
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedLayout]);

    return (
        <nav className="w-full px-4 lg:px-6 flex justify-start items-center gap-4">
            <button
                type="button"
                onClick={() => navigate('previous')}
                disabled={sections.findIndex(section => section.value === selectedLayout) === 0}
                className="py-1.5 px-2 rounded-lg text-card-lightest hover:text-white disabled:text-card-light hover:bg-[rgba(255,255,255,0.1)] disabled:hover:bg-transparent flex justify-center items-center cursor-pointer disabled:cursor-default transition-all duration-200 ease-in-out"
            >
                <FaChevronLeft className="size-3"/>
            </button>
            <div className="w-fit max-w-full flex justify-start items-center gap-4 overflow-hidden">
            {sections.map((section: NavbarSectionType, i: number) => (
                <NavbarSectionButton
                    key={i}
                    section={section}
                    selectedLayout={selectedLayout}
                    handleLayoutChange={handleLayoutChange}
                />
            ))}
            </div>
            <button
                type="button"
                onClick={() => navigate('next')}
                disabled={sections.findIndex(section => section.value === selectedLayout) === sections.length - 1}
                className="py-1.5 px-2 rounded-lg text-card-lightest hover:text-white disabled:text-card-light hover:bg-[rgba(255,255,255,0.1)] disabled:hover:bg-transparent flex justify-center items-center cursor-pointer disabled:cursor-default transition-all duration-200 ease-in-out"
            >
                <FaChevronRight className="size-3"/>
            </button>
        </nav>
    );
};
