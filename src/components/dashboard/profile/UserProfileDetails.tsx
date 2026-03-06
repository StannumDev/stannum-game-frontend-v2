import { Fragment } from "react";
import { UserProfileCover, UserProfilePhoto, UserProfileLevel, MotionWrapperLayout, UserProfileInfo, UserProfileSocialMedias } from "@/components";
import { FullUserDetails } from "@/interfaces";

interface Props{
    owner: boolean;
    user: FullUserDetails,
    fetchUserData: (force?: boolean) => Promise<void>
}

export const UserProfileDetails = ({user, fetchUserData, owner}:Props) => {

    return (
        <Fragment>
            <MotionWrapperLayout>
                <section id="profile-card" className="w-full flex flex-col relative lg:static">
                    <UserProfileCover
                        rankingPosition={user?.rankingPosition}
                        equippedCoverId={user?.equippedCoverId || 'default'}
                        owner={owner}
                        unlockedCoverIds={['default', ...(user?.unlockedCovers?.map(c => c.coverId) || [])]}
                    />
                    <div className="w-full card pt-0 rounded-t-none relative">
                        <div className="w-full flex flex-col justify-center items-center -mt-16 lg:-mt-44">
                            <UserProfilePhoto owner={owner} user={user}/>
                            <p className="mt-4 title-2">{user?.username}</p>
                            <p className="font-semibold text-stannum">{user?.enterprise?.name || ''}</p>
                        </div>
                        <UserProfileSocialMedias user={user} />
                        <div className="content-visibility-hidden xl:content-visibility-visible">
                            <UserProfileLevel id="profile-level-desktop" user={user}/>
                        </div>
                    </div>
                </section>
                <div className="xl:content-visibility-hidden">
                    <UserProfileLevel id="profile-level-mobile" user={user}/>
                </div>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
                <UserProfileInfo owner={owner} user={user} fetchUserData={fetchUserData}/>
            </MotionWrapperLayout>
        </Fragment>
    )
}
