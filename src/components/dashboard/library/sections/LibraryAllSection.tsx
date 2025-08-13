import { LibraryCard } from "@/components";
import { programs } from "@/config/programs";
import type { FullUserDetails } from "@/interfaces";
import { calculateProgramProgress } from "@/utilities";

interface Props {
    user: FullUserDetails;
}

export const LibraryAllSection = ({ user }: Props) => {
    const purchasedPrograms = programs.filter(program => user.programs?.[program.id as keyof FullUserDetails['programs']]?.isPurchased);

    if (purchasedPrograms.length === 0) {
        return (
        <section className="w-full text-center">
            <h2 className="text-2xl font-semibold text-stannum">¡Aún no te has unido a ningún programa!</h2>
            <p className="mt-2 text-lg text-card-lightest">Desde aquí vas a poder retomar rápidamente tus programas adquiridos y seguir tu progreso. Cuando compres tu primer programa, aparecerá en esta sección.</p>
        </section>
        );
    }

    return (
        <section className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
            { purchasedPrograms.map((program) => {
                const progress = calculateProgramProgress(program, user);
                return (
                    <LibraryCard
                        key={program.id}
                        id={program.id}
                        name={program.name}
                        description={program.description}
                        logo={program.logo}
                        progress={progress}
                    />
                );
            })}
        </section>
    );
};
