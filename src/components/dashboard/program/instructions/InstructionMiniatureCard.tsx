import Link from "next/link";
import { CheckIcon, CompassIcon, CrownIcon, HourglassIcon, LockIcon } from "@/icons";
import { Instruction, InstructionDetails } from "@/interfaces";

interface Props {
    instruction: Instruction;
    programId: string;
    isAvailable: boolean;
    userInstruction?: InstructionDetails;
}

const statusConfig = {
    GRADED: {
        border: 'border-stannum/50 hover:border-stannum',
        bg: 'bg-stannum/[0.08] hover:bg-stannum/[0.14]',
        accent: 'text-stannum',
        iconBg: 'bg-stannum/20',
        label: 'Completado',
        Icon: CheckIcon,
    },
    SUBMITTED: {
        border: 'border-yellow-400/50 hover:border-yellow-400',
        bg: 'bg-yellow-400/[0.06] hover:bg-yellow-400/[0.10]',
        accent: 'text-yellow-400',
        iconBg: 'bg-yellow-400/15',
        label: 'En revisión',
        Icon: HourglassIcon,
    },
    IN_PROCESS: {
        border: 'border-stannum/50 hover:border-stannum',
        bg: 'bg-stannum/[0.06] hover:bg-stannum/[0.10]',
        accent: 'text-stannum',
        iconBg: 'bg-stannum/15',
        label: 'En proceso',
        Icon: CompassIcon,
    },
} as const;

const defaultConfig = {
    border: 'border-invalid/50 hover:border-invalid',
    bg: 'bg-invalid/[0.06] hover:bg-invalid/[0.10]',
    accent: 'text-invalid',
    iconBg: 'bg-invalid/15',
    label: 'Pendiente',
    Icon: CompassIcon,
};

export const InstructionMiniatureCard = ({ instruction, programId, isAvailable, userInstruction }: Props) => {
    const status = userInstruction?.status;

    if (!isAvailable) {
        return (
            <div className="w-full my-1 p-2.5 rounded-lg border border-dashed border-card-light/50 opacity-40 flex items-center gap-3">
                <div className="size-8 rounded-full bg-card-light/50 flex justify-center items-center shrink-0">
                    <LockIcon className="size-3.5 text-white/40" />
                </div>
                <div className="flex flex-col min-w-0 gap-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-card-lightest">Instrucción</span>
                    <h2 className="w-full title-3 truncate text-white/50">{instruction.title}</h2>
                </div>
            </div>
        );
    }

    const cfg = (status && statusConfig[status as keyof typeof statusConfig]) || defaultConfig;

    return (
        <Link href={`/dashboard/library/${programId}/instructions/${instruction.id}`} className={`w-full my-1 p-2.5 rounded-lg border ${cfg.border} ${cfg.bg} transition-200 group cursor-pointer flex flex-col gap-1`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className={`size-6 rounded-full ${cfg.iconBg} flex justify-center items-center`}>
                        <cfg.Icon className={`size-3 ${cfg.accent}`} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${cfg.accent}`}>Instrucción</span>
                </div>
                <div className="flex items-center gap-1">
                    <CrownIcon className={`size-2.5 ${cfg.accent} opacity-60`} />
                    <span className={`text-[10px] font-bold ${cfg.accent} opacity-60`}>{instruction.rewardXP} XP</span>
                </div>
            </div>
            <h2 className="w-full title-3 truncate">{instruction.title}</h2>
            <span className={`text-[10px] font-semibold uppercase tracking-widest ${cfg.accent}`}>{cfg.label}</span>
        </Link>
    );
};
