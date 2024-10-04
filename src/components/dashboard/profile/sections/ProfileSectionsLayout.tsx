'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiMedalFill } from "react-icons/ri";
import { ProfileSection } from "@/interfaces";
import { AchievementsLayout, MotionWrapperLayout, ProfileNavbar } from "@/components";

const sections:Array<ProfileSection> = [
    {
        label: "Logros",
        value: "achievements",
        Icon: RiMedalFill
    },
    {
        label: "TMD",
        value: "tmd"
    },
    {
        label: "PROEM",
        value: "proem"
    },
];

export const ProfileSectionsLayout = () => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const layout:string|null = searchParams.get('section')
    let initialLayout:'achievements'|'tmd'|'proem'|null
    if(layout && typeof layout === 'string' && ['achievements', 'tmd', 'proem'].includes(layout)){
        initialLayout = layout as 'achievements'|'tmd'|'proem';
    } else {
        initialLayout = null;
        router.replace(`${pathname}?section=achievements`, { scroll: true });
    }

    const [selectedLayout, setSelectedLayout] = useState<'achievements'|'tmd'|'proem'>(initialLayout||'achievements')

    useEffect(() => {
        if (layout && typeof layout === 'string') {
            if (['achievements', 'tmd', 'proem'].includes(layout)) {
                setSelectedLayout(layout as 'achievements'|'tmd'|'proem');
            }
        }
    }, [layout]);

    const handleLayoutChange = (layout:'achievements'|'tmd'|'proem'):void => {
        setSelectedLayout(layout);
        router.replace(`${pathname}?section=${layout}`, { scroll: true });
    };

    return (
        <MotionWrapperLayout>
            <section className="w-full card px-0">
                <div className="px-4 lg:px-6">
                    <ProfileNavbar
                        sections={sections}
                        selectedLayout={selectedLayout}
                        handleLayoutChange={handleLayoutChange}
                    />
                </div>
                <span className="my-4 block w-full h-px bg-card-light"></span>
                <div className="px-4 lg:px-6">
                    {
                        selectedLayout === 'achievements' && <AchievementsLayout/>
                    }
                </div>
            </section>
        </MotionWrapperLayout>
    )
}
