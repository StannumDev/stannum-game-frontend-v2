import { ProfileSection } from "@/interfaces";
import { ProfileNavbarButton } from "@/components";

interface Props{
    sections:Array<ProfileSection>
    selectedLayout: 'achievements'|'tmd'|'proem';
    handleLayoutChange: (layout: "achievements" | "tmd" | "proem") => void
}

export const ProfileNavbar = ({sections, selectedLayout, handleLayoutChange}:Props) => {
    return (
        <nav className="flex justify-start items-center gap-4">
            {
                sections.map((section:ProfileSection, i:number) => (
                    <ProfileNavbarButton
                        key={i}
                        section={section}
                        selectedLayout={selectedLayout}
                        handleLayoutChange={handleLayoutChange}
                    />
                ))
            }
        </nav>
    )
}
