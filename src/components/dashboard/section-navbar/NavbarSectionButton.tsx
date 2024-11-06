import type { NavbarSection } from "@/interfaces";
import { NavbarSectionIndicator } from '@/components';

interface Props<T>{
    section: NavbarSection;
    selectedLayout: T;
    handleLayoutChange: (layout: T) => void
}

export const NavbarSectionButton = <T extends string>({section, selectedLayout, handleLayoutChange}:Props<T>) => {

    const {label, value, Icon} = section;

    return (
        <button
            data-layout={value}
            type="button"
            onClick={() => handleLayoutChange(value as T)}
            className={`${ selectedLayout !== value ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'text-stannum'} text-sm lg:text-base px-4 py-1.5 rounded-xl font-semibold relative flex justify-center items-center gap-1 whitespace-nowrap transition-200`}
        >
            {
                selectedLayout === value &&
                <NavbarSectionIndicator/>
            }
            {
                Icon &&
                <Icon className="size-5"/>
            }
            <span className="relative z-10">{label}</span>
        </button>
    )
}
