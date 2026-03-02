import Link from 'next/link';
import { STANNUMLogo } from '@/components';

export const metadata = { title: 'Política de Privacidad' };

const sections = [
    { id: 'datos', label: 'Datos recopilados' },
    { id: 'uso', label: 'Uso de datos' },
    { id: 'pagos', label: 'Procesador de pagos' },
    { id: 'derechos', label: 'Derechos del usuario' },
    { id: 'seguridad', label: 'Seguridad' },
    { id: 'modificaciones', label: 'Modificaciones' },
    { id: 'contacto', label: 'Contacto' },
];

export default function PrivacidadPage() {
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
                        <h1 className="text-3xl lg:text-4xl font-black">Política de Privacidad</h1>
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
                        <Link href="/terminos" className="text-sm text-white/30 hover:text-white/60 transition-200">Términos y Condiciones</Link>
                    </nav>

                    <div className="flex-1 min-w-0 flex flex-col gap-6">
                        <Section id="datos" number={1} title="Datos recopilados">
                            <p>Recopilamos la siguiente información:</p>
                            <ul>
                                <li><strong>Datos de cuenta:</strong> nombre, email, nombre de usuario, foto de perfil.</li>
                                <li><strong>Datos de uso:</strong> progreso en programas, lecciones completadas, instrucciones enviadas, logros desbloqueados, XP, nivel, Tins.</li>
                                <li><strong>Datos de suscripción:</strong> estado de la suscripción, fecha de inicio, fecha de cancelación, historial de pagos (monto y estado).</li>
                            </ul>
                        </Section>

                        <Section id="uso" number={2} title="Uso de datos">
                            <p>Utilizamos tus datos para:</p>
                            <ul>
                                <li>Proveer acceso a los programas y funcionalidades de la plataforma.</li>
                                <li>Gestionar tu suscripción y procesar pagos.</li>
                                <li>Enviar comunicaciones transaccionales (confirmación de pago, recordatorios de renovación, confirmación de cancelación).</li>
                                <li>Mejorar la experiencia de la plataforma.</li>
                            </ul>
                        </Section>

                        <Section id="pagos" number={3} title="Procesador de pagos">
                            <p>Los pagos son procesados por <strong>Mercado Pago</strong>. No almacenamos datos de tarjetas de crédito o débito en nuestros servidores. Los datos de pago son gestionados íntegramente por Mercado Pago bajo sus propias políticas de seguridad y privacidad.</p>
                        </Section>

                        <Section id="derechos" number={4} title="Derechos del usuario">
                            <p>Conforme a la Ley 25.326 de Protección de Datos Personales y las regulaciones de la Agencia de Acceso a la Información Pública (AAIP), tenés derecho a:</p>
                            <ul>
                                <li>Acceder a tus datos personales.</li>
                                <li>Solicitar la rectificación de datos inexactos.</li>
                                <li>Solicitar la supresión de tus datos.</li>
                                <li>Oponerte al tratamiento de tus datos.</li>
                            </ul>
                            <p>Para ejercer estos derechos, contactanos a <a href="mailto:contacto@stannumgame.com" className="text-stannum hover:underline">contacto@stannumgame.com</a>.</p>
                        </Section>

                        <Section id="seguridad" number={5} title="Seguridad">
                            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales, incluyendo cifrado de comunicaciones (HTTPS), autenticación segura y control de acceso.</p>
                        </Section>

                        <Section id="modificaciones" number={6} title="Modificaciones">
                            <p>Podemos actualizar esta política. Los cambios se comunicarán por email y se publicarán en esta página.</p>
                        </Section>

                        <Section id="contacto" number={7} title="Contacto">
                            <p>Para consultas sobre privacidad: <a href="mailto:contacto@stannumgame.com" className="text-stannum hover:underline">contacto@stannumgame.com</a></p>
                        </Section>

                        <div className="pt-4 border-t border-card">
                            <Link href="/terminos" className="card card-link text-center text-sm font-medium text-white/60 hover:text-white !py-3">Términos y Condiciones</Link>
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
