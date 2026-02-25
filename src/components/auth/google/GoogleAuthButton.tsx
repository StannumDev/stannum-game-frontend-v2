'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '@/services';
import { achievementHandler, errorHandler, getRedirectUrl } from '@/helpers';
import { GoogleColourIcon, SpinnerIcon } from '@/icons';
import { FormErrorMessage } from '@/components';
import { AppError } from '@/interfaces';

export const GoogleAuthButton = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const { access_token } = tokenResponse;
                if (!access_token) throw new Error('Google credential is missing');

                const { username, achievementsUnlocked } = await googleLogin(access_token);
                if(!username){
                    setErrorMessage("Google login failed. Please try again.");
                    return;
                }

                if (username.startsWith("google_")) {
                    window.location.replace('/register/google');
                } else {
                    achievementsUnlocked?.length && achievementHandler(achievementsUnlocked);
                    window.location.replace(getRedirectUrl(searchParams.get('redirect')));
                }
            } catch (error:unknown) {
                const appError:AppError = errorHandler(error);
                setErrorMessage(appError.friendlyMessage || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error:unknown) => {
            const appError:AppError = errorHandler(error);
            setErrorMessage(appError.friendlyMessage);
        },
        prompt: "consent",
    });

    return (
        <div className="w-full flex flex-col items-center gap-2">
            <button
                onClick={() => login()}
                disabled={isLoading}
                className="w-full h-12 rounded-lg bg-gradient-to-br from-background-sidebar to-card border border-card hover:border-card-lightest disabled:hover:border-card disabled:opacity-50 flex items-center overflow-hidden transition-150 relative"
            >
                <div className='h-full aspect-square flex justify-center items-center absolute top-0 left-0'>
                    { !isLoading ? <GoogleColourIcon className='size-6'/> : <SpinnerIcon className="animate-spin size-6"/> }
                </div>
                <span className='grow p-2 lg:text-lg font-semibold'>Iniciar sesión con Google</span>
                <span className='sr-only'>Iniciar sesión con Google</span>
            </button>
            <FormErrorMessage condition={!!errorMessage} message={errorMessage||"Ocurrio un error inesperado."} className="mt-2"/>
        </div>
    );
};
