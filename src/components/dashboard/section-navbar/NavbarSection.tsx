'use client';

import { useCallback, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { NavbarSection as NavbarSectionType } from "@/interfaces";
import { NavbarSectionButton } from "@/components";

interface Props {
    sections: Array<NavbarSectionType>;
    selectedLayout: string;
    handleLayoutChange: (layout: string) => void;
}

export const NavbarSection = ({ sections, selectedLayout, handleLayoutChange }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useCallback((direction: 'previous' | 'next') => {
        const currentIndex = sections.findIndex(section => section.value === selectedLayout);

        if (direction === 'previous' && currentIndex > 0) {
            handleLayoutChange(sections[currentIndex - 1].value);
        }

        if (direction === 'next' && currentIndex < sections.length - 1) {
            handleLayoutChange(sections[currentIndex + 1].value);
        }
    }, [sections, selectedLayout, handleLayoutChange]);

    useEffect(() => {
        const currentButton = containerRef.current?.querySelector(`[data-layout="${selectedLayout}"]`);
        if(currentButton && containerRef.current){
            const container = containerRef.current;
            const button = currentButton as HTMLElement;

            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();

            if (buttonRect.left < containerRect.left || buttonRect.right > containerRect.right) {
                button.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center',
                });
            }
        }
    }, [selectedLayout]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                navigate('previous');
            } else if (event.key === 'ArrowRight') {
                navigate('next');
            } else if (!isNaN(Number(event.key)) && Number(event.key) >= 1 && Number(event.key) <= sections.length) {
                const sectionIndex = Number(event.key) - 1;
                handleLayoutChange(sections[sectionIndex].value);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedLayout, handleLayoutChange, navigate, sections, sections.length]);

    return (
        <nav className="w-full px-2 lg:px-6 flex justify-between lg:justify-start items-center gap-2 lg:gap-4">
            <button
                type="button"
                onClick={() => navigate('previous')}
                disabled={sections.findIndex(section => section.value === selectedLayout) === 0}
                className="py-1.5 px-2 rounded-lg text-card-lightest hover:text-white disabled:text-card-light lg:hover:bg-[rgba(255,255,255,0.1)] disabled:hover:bg-transparent flex justify-center items-center cursor-pointer disabled:cursor-default transition-200"
            >
                <FaChevronLeft className="size-3" />
            </button>
            <div
                ref={containerRef}
                className="w-fit max-w-full flex justify-start items-center gap-4 overflow-x-auto scrollbar-hide"
            >
                {sections.map((section: NavbarSectionType, i: number) => (
                    <NavbarSectionButton
                        key={`navbar_section_${i}`}
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
                className="py-1.5 px-2 rounded-lg text-card-lightest hover:text-white disabled:text-card-light lg:hover:bg-[rgba(255,255,255,0.1)] disabled:hover:bg-transparent flex justify-center items-center cursor-pointer disabled:cursor-default transition-200"
            >
                <FaChevronRight className="size-3" />
            </button>
        </nav>
    );
};
