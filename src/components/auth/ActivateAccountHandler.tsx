'use client'

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { consumeMagicLink } from "@/services";
import { CompleteProfileForm, LoadingScreen, STANNUMLogo } from "@/components";
import { errorHandler } from "@/helpers";

type Status = 'loading' | 'activation' | 'invalid' | 'expired';

export const ActivateAccountHandler = () => {
    const router = useRouter();
    const params = useParams<{ token: string }>();
    const token = params?.token;
    const [status, setStatus] = useState<Status>('loading');
    const [email, setEmail] = useState<string | undefined>();
    const consumedRef = useRef(false);

    useEffect(() => {
        if (!token || typeof token !== 'string') {
            setStatus('invalid');
            return;
        }
        if (consumedRef.current) return;
        consumedRef.current = true;

        let isMounted = true;
        (async () => {
            try {
                const res = await consumeMagicLink(token);
                if (!isMounted) return;
                if (res.scope === 'full') {
                    router.replace('/dashboard');
                    return;
                }
                if (res.scope === 'activation') {
                    setEmail(res.email);
                    setStatus('activation');
                    return;
                }
                setStatus('invalid');
            } catch (error: unknown) {
                if (!isMounted) return;
                const err = error as { response?: { status?: number; data?: { code?: string } } };
                const httpStatus = err?.response?.status;
                const code = err?.response?.data?.code;
                if (httpStatus === 410 || code === 'MAGIC_LINK_002') {
                    setStatus('expired');
                } else if (httpStatus === 404 || httpStatus === 400) {
                    setStatus('invalid');
                } else {
                    errorHandler(error);
                    setStatus('invalid');
                }
            }
        })();

        return () => { isMounted = false; };
    }, [token, router]);

    if (status === 'loading') return <LoadingScreen fullScreen/>;

    if (status === 'invalid' || status === 'expired') {
        return (
            <section className="w-full min-h-svh px-4 md:px-0 py-12 lg:py-24 flex justify-center items-center">
                <div className="w-full max-w-md bg-card rounded-lg p-6 md:p-12 flex flex-col justify-center items-center text-center relative">
                    <STANNUMLogo className="w-32" gameColor='fill-stannum' stannumColor='fill-white'/>
                    <h2 className="mt-8 text-2xl md:text-3xl font-black">
                        {status === 'expired' ? 'Enlace expirado' : 'Enlace inválido'}
                    </h2>
                    <p className="mt-4 text-neutral-400 text-sm">
                        {status === 'expired'
                            ? 'Este enlace de activación ya expiró. Comunicate con el equipo de STANNUM para que te enviemos uno nuevo.'
                            : 'Este enlace ya fue utilizado o no es válido. Si ya activaste tu cuenta, iniciá sesión normalmente.'
                        }
                    </p>
                    <Link href="/login" className="mt-8 inline-block bg-stannum text-black font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-200">
                        Ir a iniciar sesión
                    </Link>
                </div>
            </section>
        );
    }

    return <CompleteProfileForm mode="activation" initialEmail={email}/>;
};
