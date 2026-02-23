'use client'

import axios from "axios";
import Link from "next/link";
import { Fragment, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { driver, type Driver, type PopoverDOM } from "driver.js";
import { getUserDetailsByUsername, getTutorialStatus, markTutorialAsCompleted } from "@/services";
import { errorHandler } from "@/helpers";
import { TUTORIAL_ICONS } from "@/helpers/tutorialIcons";
import { UserProfileDetails, ProfileSectionsLayout, LoadingScreen } from "@/components";
import { FullUserDetails } from "@/interfaces";
import { PowerIcon, WarningOctagonIcon } from "@/icons";
import { useUserStore } from "@/stores/userStore";
import "driver.js/dist/driver.css";

interface Props{
    username: string;
}

export const UserProfileWrapper = ({username}:Props) => {
    const owner = useUserStore(s => s.user?.username) === username;
    const storeLogout = useUserStore(s => s.logout);
    const pathname = usePathname();
    const driverRef = useRef<Driver | null>(null);

    const [userData, setUserData] = useState<FullUserDetails|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const [isTutorialCompleted, setIsTutorialCompleted] = useState(false);
    const [canStartTutorial, setCanStartTutorial] = useState(false);

    const fetchUserData = useCallback( async (force: boolean = false) => {
        setIsLoading(true);
        setNotFound(false);
        try {
            setUserData(await getUserDetailsByUsername(username, { force }));
        } catch (error:unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setNotFound(true);
            } else {
                errorHandler(error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchUserData(true);
    }, [username, fetchUserData]);

    useEffect(() => {
        if (!owner) return;
        const check = async () => {
            try {
                const completed = await getTutorialStatus('profile_tutorial');
                setIsTutorialCompleted(completed);
                setCanStartTutorial(true);
            } catch (error: unknown) {
                errorHandler(error);
            }
        };
        check();
    }, [owner]);

    const completeTutorial = async () => {
        try {
            await markTutorialAsCompleted('profile_tutorial');
            setIsTutorialCompleted(true);
        } catch (error: unknown) {
            errorHandler(error);
        }
    };

    useEffect(() => {
        if (!canStartTutorial || isTutorialCompleted || isLoading || !userData) return;

        const timeout = setTimeout(() => {
            const steps: NonNullable<Parameters<typeof driver>[0]>['steps'] = [];
            const isXl = window.innerWidth >= 1280;

            if (document.getElementById('profile-card')) {
                steps.push({
                    element: '#profile-card',
                    popover: {
                        popoverClass: 'tutorial-step-welcome',
                        title: `${TUTORIAL_ICONS.user} Tu Perfil`,
                        description: "Este es tu espacio personal. Acá se muestra tu <span class='text-stannum font-semibold'>foto, nombre y empresa.</span>",
                        side: 'bottom',
                        align: 'center',
                        showButtons: ['next'],
                    },
                });
            }

            const levelId = isXl ? 'profile-level-desktop' : 'profile-level-mobile';
            if (document.getElementById(levelId)) {
                steps.push({
                    element: `#${levelId}`,
                    popover: {
                        title: `${TUTORIAL_ICONS.crown} Nivel y Experiencia`,
                        description: "Tu <span class='text-stannum font-semibold'>nivel actual</span> y barra de progreso XP. Completá lecciones e instrucciones para subir de nivel.",
                        side: isXl ? 'right' : 'bottom',
                        align: 'center',
                    },
                });
            }

            if (document.getElementById('profile-info')) {
                steps.push({
                    element: '#profile-info',
                    popover: {
                        title: `${TUTORIAL_ICONS.edit} Tu Información`,
                        description: "Tus datos personales y profesionales: nombre, empresa, ubicación y rol.",
                        side: 'top',
                        align: 'start',
                    },
                });
            }

            if (document.getElementById('profile-edit-btn')) {
                steps.push({
                    element: '#profile-edit-btn',
                    popover: {
                        title: `${TUTORIAL_ICONS.edit} Editar Perfil`,
                        description: "Tocá este botón para <span class='text-stannum font-semibold'>editar</span> tu información, redes sociales y más.",
                        side: 'bottom',
                        align: 'end',
                    },
                });
            }

            if (document.getElementById('profile-about')) {
                steps.push({
                    element: '#profile-about',
                    popover: {
                        title: `${TUTORIAL_ICONS.user} Sobre Vos`,
                        description: "Contale al mundo quién sos. Escribí una breve <span class='text-stannum font-semibold'>bio</span> desde la sección de edición.",
                        side: 'top',
                        align: 'end',
                    },
                });
            }

            if (document.getElementById('profile-achievements')) {
                steps.push({
                    element: '#profile-achievements',
                    popover: {
                        title: `${TUTORIAL_ICONS.medal} Logros y Trofeos`,
                        description: "Tus <span class='text-stannum font-semibold'>objetivos alcanzados</span> durante el entrenamiento. Completá desafíos para desbloquear más logros y ganar XP.",
                        side: 'top',
                        align: 'center',
                    },
                });
            }

            if (document.getElementById('profile-card')) {
                steps.push({
                    element: '#profile-card',
                    popover: {
                        popoverClass: 'tutorial-step-ready',
                        title: `${TUTORIAL_ICONS.rocket} ¡Seguí Creciendo!`,
                        description: "Completá lecciones, desbloqueá logros y subí de nivel. Tu perfil refleja todo tu <span class='text-stannum font-semibold'>progreso.</span>",
                        side: 'bottom',
                        align: 'center',
                    },
                });
            }

            if (steps.length === 0) return;

            const totalSteps = steps.length;
            const driverInstance = driver({
                animate: true,
                smoothScroll: true,
                allowClose: false,
                stageRadius: 12,
                stagePadding: 6,
                popoverOffset: 12,
                showButtons: ['next', 'previous', 'close'],
                showProgress: true,
                nextBtnText: 'Siguiente',
                prevBtnText: 'Volver',
                doneBtnText: '¡Listo!',
                onPopoverRender: (popover: PopoverDOM, { state }) => {
                    const existingBar = popover.wrapper.querySelector('.tutorial-accent-bar');
                    if (!existingBar) {
                        const accentBar = document.createElement('div');
                        accentBar.className = 'tutorial-accent-bar';
                        popover.wrapper.prepend(accentBar);
                    }

                    const activeIndex = state.activeIndex ?? 0;
                    const dotsContainer = document.createElement('div');
                    dotsContainer.className = 'tutorial-progress-dots';

                    for (let i = 0; i < totalSteps; i++) {
                        const dot = document.createElement('div');
                        dot.className = `tutorial-progress-dot${i === activeIndex ? ' active' : i < activeIndex ? ' completed' : ''}`;
                        dotsContainer.appendChild(dot);
                    }

                    popover.progress.innerHTML = '';
                    popover.progress.style.display = 'flex';
                    popover.progress.appendChild(dotsContainer);
                },
                onDestroyed: completeTutorial,
                steps,
            });

            driverRef.current = driverInstance;
            driverInstance.drive();
        }, 800);

        return () => clearTimeout(timeout);
    }, [canStartTutorial, isTutorialCompleted, isLoading, userData]);

    useEffect(() => {
        return () => { driverRef.current?.destroy(); };
    }, [pathname]);

    const onLogout = () => {
        storeLogout();
    }

    if (isLoading) return <LoadingScreen />;

    if (notFound || !userData) return (
        <main className="main-container size-full px-4 text-center justify-center items-center">
            <WarningOctagonIcon className="size-32 text-card-lightest" />
            <h2 className="title-2 mt-4">Perfil no encontrado</h2>
            <p className="mt-2 subtitle-1">Este perfil no existe o fue eliminado.</p>
            <Link
                href="/dashboard"
                className="mt-8 w-40 h-9 bg-card-light rounded text-sm font-semibold flex justify-center items-center hover:bg-card-lighter transition-200"
            >
                Volver al inicio
            </Link>
        </main>
    );

    return (
        <Fragment>
            <UserProfileDetails owner={owner} user={userData} fetchUserData={fetchUserData}/>
            <Suspense fallback={null}>
                <ProfileSectionsLayout owner={owner} user={userData} />
            </Suspense>
            { owner &&
                <div className="w-full lg:hidden">
                    <button type="button" onClick={onLogout} className="w-full card py-2 flex justify-between items-center text-invalid">
                        Cerrar sesión <PowerIcon/>
                    </button>
                </div>
            }
        </Fragment>
    )
}
