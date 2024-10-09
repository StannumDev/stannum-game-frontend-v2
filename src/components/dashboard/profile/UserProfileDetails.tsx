import { Fragment } from "react";
import { UserProfileCover, UserProfilePicture, UserProfileSocialMedias, UserProfileLevel, UserProfileInfo } from "@/components";

export const UserProfileDetails = () => {

    return (
        <Fragment>
            <section className="w-full flex flex-col relative lg:static">
                <UserProfileCover/>
                <div className="w-full card pt-0 rounded-t-none lg:relative">
                    <div className="w-full flex flex-col justify-center items-center -mt-16 lg:-mt-44">
                        <UserProfilePicture/>
                        <p className="mt-4 title-2">aledelazerda</p>
                        <p className="font-semibold text-stannum">STANNUM</p>
                    </div>
                    <UserProfileSocialMedias/>
                    <div className="hidden lg:block">
                        <UserProfileLevel/>
                    </div>
                </div>
            </section>
            <div className="lg:hidden">
                <UserProfileLevel/>
            </div>
            <UserProfileInfo/>
        </Fragment>
    )
}
