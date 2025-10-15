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
                <section className="w-full flex flex-col relative lg:static">
                    <UserProfileCover owner={owner}/>
                    <div className="w-full card pt-0 rounded-t-none relative">
                        <div className="w-full flex flex-col justify-center items-center -mt-16 lg:-mt-44">
                            <UserProfilePhoto owner={owner} user={user} fetchUserData={fetchUserData}/>
                            <p className="mt-4 title-2">{user?.username}</p>
                            <p className="font-semibold text-stannum">{user?.enterprise?.name || ''}</p>
                        </div>
                        <UserProfileSocialMedias user={user} />
                        <div className="content-visibility-hidden xl:content-visibility-visible">
                            <UserProfileLevel user={user}/>
                        </div>
                    </div>
                </section>
                <div className="xl:content-visibility-hidden">
                    <UserProfileLevel user={user}/>
                </div>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
                <UserProfileInfo owner={owner} user={user} fetchUserData={fetchUserData}/>
            </MotionWrapperLayout>
        </Fragment>
    )
}
