import { UserProfileDetails, ProfileSectionsLayout } from "@/components";

export default function ProfilePage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow lg:min-h-svh flex flex-col justify-start items-start gap-4 p-4">
            <UserProfileDetails/>
            <ProfileSectionsLayout/>
        </main>
    );
}