import Link from 'next/link';
import { STANNUMLogo } from '@/components';

export const metadata = { title: 'Términos y Condiciones' };

const sections = [
    { id: 'servicio', label: 'Descripción del servicio' },
    { id: 'suscripcion', label: 'Modelo de suscripción' },
    { id: 'cancelacion', label: 'Cancelación' },
    { id: 'progreso', label: 'Progreso al cancelar' },
    { id: 'reembolsos', label: 'Política de reembolsos' },
    { id: 'edad', label: 'Requisitos de edad' },
    { id: 'modificaciones', label: 'Modificaciones' },
    { id: 'contacto', label: 'Contacto' },
];

export default function TerminosPage() {
    return (
        <div className="w-full min-h-svh flex flex-col">
            <header className="w-full flex justify-between items-center p-4 lg:px-8 border-b border-card">
                <Link href="/dashboard"><STANNUMLogo className="w-36" gameColor="fill-stannum" stannumColor="fill-white" /></Link>
                <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-200">Volver</Link>
            </header>

            <div className="w-full max-w-6xl mx-auto px-6 py-10 lg:py-16 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-1 rounded-full bg-stannum" />
                        <h1 className="text-3xl lg:text-4xl font-black">Términos y Condiciones</h1>
                    </div>
                    <div className="flex items-center gap-3 ml-[19px]">
                        <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">Última actualización: Febrero 2026</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    <nav className="hidden lg:flex flex-col gap-1 w-56 shrink-0 sticky top-8 self-start">
                        <span className="subtitle-1 mb-2">Contenido</span>
                        {sections.map((s, i) => (
                            <a key={s.id} href={`#${s.id}`} className="text-sm text-white/40 hover:text-white py-1.5 transition-200 flex items-center gap-2.5">
                                <span className="text-[10px] text-stannum/70 font-bold w-4 text-right">{String(i + 1).padStart(2, '0')}</span>
                                {s.label}
                            </a>
                        ))}
                        <div className="h-px bg-card mt-3 mb-3" />
                        <Link href="/privacidad" className="text-sm text-white/30 hover:text-white/60 transition-200">Política de Privacidad</Link>
                    </nav>

                    <div className="flex-1 min-w-0 flex flex-col gap-6">
                        <Section id="servicio" number={1} title="Descripción del servicio">
                            <p>STANNUM Game es una plataforma de entrenamiento en inteligencia artificial y habilidades digitales que ofrece programas de aprendizaje gamificado. Los programas pueden adquirirse mediante compra única o suscripción mensual, según corresponda.</p>
                        </Section>

                        <Section id="suscripcion" number={2} title="Modelo de suscripción">
                            <p>Los programas de suscripción se cobran de forma automática cada mes a través de Mercado Pago. Al suscribirte, autorizás el débito automático mensual del monto vigente al momento de tu suscripción.</p>
                            <ul>
                                <li>El cobro se realiza automáticamente cada mes en la fecha de inicio de tu suscripción.</li>
                                <li>El precio se congela al momento de la suscripción (price grandfathering): si el precio del programa aumenta, los suscriptores existentes mantienen su precio original mientras la suscripción esté activa.</li>
                                <li>Si cancelás y te volvés a suscribir, se aplica el precio vigente al momento de la nueva suscripción.</li>
                            </ul>
                        </Section>

                        <Section id="cancelacion" number={3} title="Cancelación">
                            <p>Podés cancelar tu suscripción en cualquier momento desde la sección <strong>Mis Suscripciones</strong> dentro de la plataforma.</p>
                            <p>Al cancelar, tu acceso al contenido se mantiene hasta el final del período ya facturado. No se realizan cobros adicionales después de la cancelación.</p>
                        </Section>

                        <Section id="progreso" number={4} title="Progreso al cancelar">
                            <p>Tu progreso, logros, XP, nivel y Tins se mantienen en tu cuenta aunque canceles la suscripción. Si te volvés a suscribir, recuperás el acceso al contenido con todo tu progreso intacto. Sin embargo, al perder acceso dejás de participar en el ranking del programa.</p>
                        </Section>

                        <Section id="reembolsos" number={5} title="Política de reembolsos">
                            <p>No se realizan reembolsos proporcionales por períodos parciales. Al cancelar, mantenés acceso hasta el fin del período facturado. En caso de cobros indebidos o errores, contactanos a <a href="mailto:contacto@stannumgame.com" className="text-stannum hover:underline">contacto@stannumgame.com</a>.</p>
                        </Section>

                        <Section id="edad" number={6} title="Requisitos de edad">
                            <p>El servicio de suscripción está disponible únicamente para mayores de 18 años. Al suscribirte, confirmás que sos mayor de edad.</p>
                        </Section>

                        <Section id="modificaciones" number={7} title="Modificaciones">
                            <p>Nos reservamos el derecho de modificar estos términos. Los cambios se comunicarán por email y entrarán en vigencia 30 días después de la notificación.</p>
                        </Section>

                        <Section id="contacto" number={8} title="Contacto">
                            <p>Para consultas sobre tu suscripción: <a href="mailto:contacto@stannumgame.com" className="text-stannum hover:underline">contacto@stannumgame.com</a></p>
                        </Section>

                        <div className="pt-4 border-t border-card">
                            <Link href="/privacidad" className="card card-link text-center text-sm font-medium text-white/60 hover:text-white !py-3">Política de Privacidad</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ id, number, title, children }: { id: string; number: number; title: string; children: React.ReactNode }) {
    return (
        <section id={id} className="card flex flex-col gap-4 scroll-mt-8">
            <div className="flex items-center gap-3">
                <span className="size-7 shrink-0 rounded-md bg-stannum/10 text-stannum text-xs font-bold flex items-center justify-center">
                    {number}
                </span>
                <h2 className="text-lg font-bold">{title}</h2>
            </div>
            <div className="flex flex-col gap-3 text-sm text-white/60 leading-relaxed [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-1 [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:before:content-['•'] [&_li]:before:text-stannum/60 [&_li]:before:mt-px [&_li]:before:shrink-0 [&_strong]:text-white/80 [&_strong]:font-semibold [&_a]:text-stannum [&_a]:hover:underline">
                {children}
            </div>
        </section>
    );
}
