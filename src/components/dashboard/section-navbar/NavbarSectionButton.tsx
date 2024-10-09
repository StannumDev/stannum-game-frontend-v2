import type { NavbarSection } from "@/interfaces";
import { NavbarSectionIndicator } from '@/components';

interface Props{
    section: NavbarSection;
    selectedLayout: string;
    handleLayoutChange: (layout: string) => void
}

export const NavbarSectionButton = ({section, selectedLayout, handleLayoutChange}:Props) => {

    const {label, value, Icon} = section;

    return (
        <button
            data-layout={value}
            type="button"
            onClick={() => handleLayoutChange(value)}
            className={`${ selectedLayout !== value ? 'hover:bg-[rgba(255,255,255,0.1)] text-white' : 'text-stannum'} text-sm lg:text-base px-4 py-1.5 rounded-xl font-semibold relative flex justify-center items-center gap-1 whitespace-nowrap transition-200`}
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
