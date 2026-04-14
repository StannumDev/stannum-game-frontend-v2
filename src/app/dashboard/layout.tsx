import { Fragment } from "react";
import { UserInitializer, ConnectionError, DashboardGuard, InstallPromptModal, Sidebar } from "@/components";
import { ProgramsProvider } from "@/providers/ProgramsProvider";

export default async function DashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <Fragment>
            <UserInitializer/>
            <ConnectionError/>
            <DashboardGuard>
                <ProgramsProvider>
                    <InstallPromptModal/>

                    <div className="grow w-full max-w-[1920px] flex relative text-white">
                        <Sidebar />
                        {children}
                    </div>
                </ProgramsProvider>
            </DashboardGuard>
        </Fragment>
    );
}
