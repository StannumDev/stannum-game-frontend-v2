'use client'

import type { NavbarSection } from "@/interfaces";
import { NavbarSectionIndicator } from '@/components';

interface Props<T>{
    section: NavbarSection;
    selectedLayout: T;
    handleLayoutChange: (layout: T) => void
}

export const NavbarSectionButton = <T extends string>({section, selectedLayout, handleLayoutChange}:Props<T>) => {

    const {name, id, Icon, disabled} = section;

    return (
        <button
            data-layout={id}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && handleLayoutChange(id as T)}
            className={`${ disabled ? "opacity-10" : selectedLayout !== id ? 'hover:bg-white/10' : 'text-stannum'} text-sm lg:text-base px-4 py-1.5 rounded-xl font-semibold relative flex justify-center items-center gap-1 whitespace-nowrap transition-200`}
        >
            {
                selectedLayout === id &&
                <NavbarSectionIndicator/>
            }
            {
                Icon &&
                <Icon className="size-5"/>
            }
            <span className="relative z-10">{name}</span>
        </button>
    )
}
