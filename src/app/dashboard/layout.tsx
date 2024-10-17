import { Metadata } from "next";
import { Sidebar } from "@/components";

export const metadata:Metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};

export default function DashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <div className="grow w-full max-w-[1920px] flex relative text-white">
            <Sidebar />
            {children}
        </div>
    );
}