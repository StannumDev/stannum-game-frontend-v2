'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { NavbarSection as NavbarSectionType } from "@/interfaces";
import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import { NavbarSectionButton } from "@/components";

interface Props<T> {
    sections: Array<NavbarSectionType>;
    selectedLayout: T;
    handleLayoutChange: (layout: T) => void;
}

export const NavbarSection = <T extends string>({sections, selectedLayout, handleLayoutChange}: Props<T>) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const navigate = useCallback((direction: 'previous' | 'next') => {
        const currentIndex = sections.findIndex(section => section.id === selectedLayout);

        if (direction === 'previous') {
            for (let i = currentIndex - 1; i >= 0; i--) {
                if (!sections[i].disabled) {
                    handleLayoutChange(sections[i].id as T);
                    break;
                }
            }
        }

        if (direction === 'next') {
            for (let i = currentIndex + 1; i < sections.length; i++) {
                if (!sections[i].disabled) {
                    handleLayoutChange(sections[i].id as T);
                    break;
                }
            }
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
        if (!isFocused) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') navigate('previous');
            else if (event.key === 'ArrowRight') navigate('next');
            else if (!isNaN(Number(event.key))) {
                const index = Number(event.key) - 1;
                if (index >= 0 && index < sections.length && !sections[index].disabled) {
                    handleLayoutChange(sections[index].id as T);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFocused, navigate, handleLayoutChange, sections, sections.length]);

    const canNavigatePrevious = sections.some((_, i) => i < sections.findIndex(s => s.id === selectedLayout) && !sections[i].disabled);
    const canNavigateNext = sections.some((_, i) => i > sections.findIndex(s => s.id === selectedLayout) && !sections[i].disabled);

    return (
        <div
            ref={wrapperRef}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="focus:outline-none"
        >
            <nav className="w-full px-2 lg:px-6 flex justify-between items-center gap-2 lg:gap-4">
                <button
                    type="button"
                    onClick={() => navigate('previous')}
                    disabled={!canNavigatePrevious}
                    className="py-1.5 px-2 rounded-lg text-card-lightest hover:text-white disabled:text-card-light lg:hover:bg-[rgba(255,255,255,0.1)] disabled:hover:bg-transparent flex justify-center items-center cursor-pointer disabled:cursor-default transition-200"
                >
                    <ArrowLeftIcon className="size-3" />
                </button>
                <div ref={containerRef} className="w-full flex items-center gap-4 overflow-x-auto scrollbar-hide">
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
                    disabled={!canNavigateNext}
                    className="py-1.5 px-2 rounded-lg text-card-lightest hover:text-white disabled:text-card-light lg:hover:bg-[rgba(255,255,255,0.1)] disabled:hover:bg-transparent flex justify-center items-center cursor-pointer disabled:cursor-default transition-200"
                >
                    <ArrowRightIcon className="size-3" />
                </button>
            </nav>
        </div>
    );
};