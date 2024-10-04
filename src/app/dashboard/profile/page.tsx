import { UserProfileInfo, ProfileSectionsLayout } from "@/components";

export default function ProfilePage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow lg:min-h-svh flex flex-col justify-start items-start gap-8 p-4 lg:p-8">
            <UserProfileInfo/>
            <ProfileSectionsLayout/>
        </main>
    );
}