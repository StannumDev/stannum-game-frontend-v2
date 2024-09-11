import { Sidebar } from "@/components";
import { Metadata } from "next";

export const metadata:Metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};

export default function DashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <div className="grow w-full flex justify-center items-center bg-background text-white">
            <Sidebar />
            {children}
        </div>
    );
}