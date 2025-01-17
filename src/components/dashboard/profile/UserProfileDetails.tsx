import { Fragment } from "react";
import { UserProfileCover, UserProfilePicture, UserProfileSocialMedias, UserProfileLevel, MotionWrapperLayout, UserProfileInfo } from "@/components";
import { FullUserDetails } from "@/interfaces";

interface Props{
    user: FullUserDetails,
    fetchUserData: () => Promise<void>
}

export const UserProfileDetails = ({user, fetchUserData}:Props) => {

    return (
        <Fragment>
            <MotionWrapperLayout>
                <section className="w-full flex flex-col relative lg:static">
                    <UserProfileCover/>
                    <div className="w-full card pt-0 rounded-t-none relative">
                        <div className="w-full flex flex-col justify-center items-center -mt-16 lg:-mt-44">
                            <UserProfilePicture user={user} fetchUserData={fetchUserData}/>
                            <p className="mt-4 title-2">{user?.username}</p>
                            <p className="font-semibold text-stannum">{user?.enterprise?.name}</p>
                        </div>
                        <UserProfileSocialMedias/>
                        <div className="content-visibility-hidden lg:content-visibility-visible">
                            <UserProfileLevel/>
                        </div>
                    </div>
                </section>
                <div className="lg:content-visibility-hidden">
                    <UserProfileLevel/>
                </div>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
                <UserProfileInfo user={user} fetchUserData={fetchUserData}/>
            </MotionWrapperLayout>
        </Fragment>
    )
}
