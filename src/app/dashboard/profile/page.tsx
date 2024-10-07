import { UserProfileDetails, ProfileSectionsLayout } from "@/components";

export default function ProfilePage() {
    return (
        <main className="mt-12 mb-14 lg:my-0 grow min-w-0 lg:min-h-svh p-4 flex flex-col gap-4 overflow-x-hidden">
            <UserProfileDetails/>
            <ProfileSectionsLayout/>
        </main>
    );
}