import { Fragment } from "react";
import { redirect } from "next/navigation";
import { getUserByToken } from "@/services";
import { InstallPromptModal, Sidebar } from "@/components";

export default async function DashboardLayout({children}:{children: React.ReactNode}) {
    const user = await getUserByToken()
    if (!user) {
        console.log("User not found")
        redirect("/login");
    }

    return (
        <Fragment>
            <InstallPromptModal/>
            <div className="grow w-full max-w-[1920px] flex relative text-white">
                <Sidebar />
                {children}
            </div>
        </Fragment>
    );
}