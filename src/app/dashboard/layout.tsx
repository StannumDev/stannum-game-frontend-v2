import { Fragment } from "react";
import { AuthUser, InstallPromptModal, Sidebar, WhatsNewModal } from "@/components";

export default async function DashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <Fragment>
            <AuthUser/>
            <InstallPromptModal/>
            <WhatsNewModal/>
            <div className="grow w-full max-w-[1920px] flex relative text-white">
                <Sidebar />
                {children}
            </div>
        </Fragment>
    );
}