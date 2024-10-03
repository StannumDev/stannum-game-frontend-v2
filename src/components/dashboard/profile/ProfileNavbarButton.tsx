import { ProfileSection } from "@/interfaces";
import { ProfileSectionIndicator } from '@/components';

interface Props{
    section: ProfileSection;
    selectedLayout: 'achievements'|'tmd'|'proem';
    handleLayoutChange: (layout: "achievements" | "tmd" | "proem") => void
}

export const ProfileNavbarButton = ({section, selectedLayout, handleLayoutChange}:Props) => {

    const {label, value, Icon} = section;

    return (
        <button
            type="button"
            onClick={() => handleLayoutChange(value)}
            className={`
                px-4 py-1.5 rounded-xl font-semibold relative flex justify-center items-center gap-1 transition-all duration-200 ease-in-out
                ${ selectedLayout !== value ? 'hover:bg-[rgba(255,255,255,0.1)] text-white' : 'text-stannum'}
            `}
        >
            {
                selectedLayout === value &&
                <ProfileSectionIndicator/>
            }
            {
                Icon &&
                <Icon className="size-5"/>
            }
            <span className="relative z-10">{label}</span>
        </button>
    )
}
