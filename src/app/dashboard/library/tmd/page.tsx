import { Metadata } from "next";
import { TMDCover, TMDSectionsLayout } from "@/components";

export const metadata:Metadata = {
 title: 'SEO Title',
 description: 'SEO Title',
};

export default function TMDDashboardPage() {
    return (
        <main className="main-container">
            <TMDCover />
            <TMDSectionsLayout/>
        </main>
    );
}