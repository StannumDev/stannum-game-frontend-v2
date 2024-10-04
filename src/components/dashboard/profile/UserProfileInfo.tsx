import { UserProfileCover, UserProfilePicture, UserProfileSocialMedias, UserProfileLevel } from "@/components";

export const UserProfileInfo = () => {

    return (
        <section className="w-full flex flex-col">
            <UserProfileCover/>
            <div className="w-full card pt-0 rounded-t-none relative">
                <UserProfileLevel/>
                <div className="w-full flex flex-col justify-center items-center -mt-32">
                    <UserProfilePicture/>
                    {/* <p className="mt-2 title-3 text-neutral-300 font-thin">Nivel <b className="font-semibold text-neutral-100">25</b></p> */}
                    <p className="mt-4 title-2">Alejandro de la Zerda</p>
                    <p className="font-semibold text-stannum">STANNUM</p>
                </div>
                <UserProfileSocialMedias/>
            </div>
        </section>
    )
}
