import { ReactNode } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserByToken } from "@/services";
import { MotionWrapperLayout, ProgramCover, ProgramNavigationHandler } from "@/components";
import { programs } from '@/config/programs';
import { Program } from "@/interfaces";

interface Props {
    children: ReactNode;
    params: {
        program_id: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { program_id } = params;
    const foundProgram:Program|undefined = programs.find(program => program.id === program_id.toLowerCase());

    if (!foundProgram) {
        return {
            title: "Programa no encontrado",
            description: "El programa solicitado no existe en nuestra base de datos.",
        };
    }

    return {
        title: `${foundProgram.name}`,
        description: "Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.",
        openGraph: {
            title: 'TRENNO IA | STANNUM Game',
            description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
            url: 'https://stanumgame.com/dashboard/library/tia',
        },
        twitter: {
            site: 'https://stannumgame.com/dashboard/library/tia',
            title: 'TRENNO IA | STANNUM Game',
            description: 'Desarrolla las habilidades de tu equipo de venta y marketing con Stannum. Contáctanos y solicita una entrevista con el entrenador, Martín Merlini.',
        },
    };
}

export default async function ProgramDashboardLayout({children, params}:Props) {

    const { program_id } = params;
    const foundProgram:Program|undefined = programs.find(program => program.id === program_id.toLowerCase());
    if (!foundProgram) return notFound();
    
    const user = await getUserByToken();
    return (
        <main className="main-container">
            <h1 className="sr-only">Panel de control {foundProgram.name} STANNUM Game</h1>
            <ProgramCover program={foundProgram} user={user}/>
            <MotionWrapperLayout>
                <section className="w-full card px-0">
                    <h2 className="mb-4 title-2 px-4 lg:px-6">Explora las posiblidades</h2>
                    <ProgramNavigationHandler program={foundProgram}/>
                    <span className="mt-4 mb-6 block w-full h-px bg-card-light"></span>
                    <div className="px-4 lg:px-6 overflow-x-hidden">
                        {children}
                    </div>
                </section>
            </MotionWrapperLayout>
        </main>
    );
}