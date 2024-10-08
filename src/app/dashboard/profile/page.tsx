import { UserProfileDetails, ProfileSectionsLayout } from "@/components";

export default function ProfilePage() {
    return (
        <main className="main-container">
            <UserProfileDetails/>
            <ProfileSectionsLayout/>
        </main>
    );
}