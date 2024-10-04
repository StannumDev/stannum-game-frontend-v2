import { Fragment } from "react";
import { UserProfileCover, UserProfilePicture, UserProfileSocialMedias, UserProfileLevel, MotionWrapperLayout, UserProfileInfo } from "@/components";

export const UserProfileDetails = () => {

    return (
        <Fragment>
            <MotionWrapperLayout>
                <section className="w-full flex flex-col">
                    <UserProfileCover/>
                    <div className="w-full card pt-0 rounded-t-none relative">
                        <UserProfileLevel/>
                        <div className="w-full flex flex-col justify-center items-center -mt-44">
                            <UserProfilePicture/>
                            {/* <p className="mt-2 title-3 text-neutral-300 font-thin">Nivel <b className="font-semibold text-neutral-100">25</b></p> */}
                            <p className="mt-4 title-2">aledelazerda</p>
                            <p className="font-semibold text-stannum">STANNUM</p>
                        </div>
                        <UserProfileSocialMedias/>
                    </div>
                </section>
            </MotionWrapperLayout>
            <MotionWrapperLayout>
                <UserProfileInfo/>
            </MotionWrapperLayout>
        </Fragment>
    )
}
