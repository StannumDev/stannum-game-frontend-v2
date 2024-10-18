import { Metadata } from "next";
import { TMDCover } from "@/components";

export const metadata:Metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};

export default function TMDDashboardLayout({children}:{children: React.ReactNode}) {
    return (
        <main className="main-container">
            <TMDCover />
            {children}
        </main>
    );
}