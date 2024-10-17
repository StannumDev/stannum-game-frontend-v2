import { Metadata } from "next";
import { Sidebar } from "@/components";

export const metadata:Metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};

export default function DashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <div className="grow w-full max-w-[1920px] bg-background text-white">
            <div className="size-full flex relative">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}