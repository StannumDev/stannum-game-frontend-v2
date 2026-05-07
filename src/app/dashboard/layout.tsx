import { Fragment } from "react";
import { UserInitializer, ConnectionError, DashboardGuard, InstallPromptModal, WhatsNewModal, Sidebar } from "@/components";
import { LessonFeedbackPrompt, InstructionFeedbackPrompt, OnboardingFeedbackPrompt, NpsFeedbackPrompt } from "@/components/feedback";
import { ProgramsProvider } from "@/providers/ProgramsProvider";

export default async function DashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <Fragment>
            <UserInitializer/>
            <ConnectionError/>
            <DashboardGuard>
                <ProgramsProvider>
                    <InstallPromptModal/>
                    <WhatsNewModal/>
                    <LessonFeedbackPrompt/>
                    <InstructionFeedbackPrompt/>
                    <OnboardingFeedbackPrompt/>
                    <NpsFeedbackPrompt/>

                    <div className="grow w-full max-w-[1920px] flex relative text-white">
                        <Sidebar />
                        {children}
                    </div>
                </ProgramsProvider>
            </DashboardGuard>
        </Fragment>
    );
}
