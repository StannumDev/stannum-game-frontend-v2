import { Fragment } from "react";
import { InstallPromptModal, Sidebar } from "@/components";

export default function DashboardLayout({children}:{children: React.ReactNode}) {
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