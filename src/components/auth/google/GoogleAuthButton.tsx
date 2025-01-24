'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '@/services';
import { errorHandler } from '@/helpers';
import { GoogleColourIcon, SpinnerIcon } from '@/icons';
import { FormErrorMessage } from '@/components';
import { AppError } from '@/interfaces';

export const GoogleAuthButton = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">) => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                router.prefetch('/dashboard');
                const { access_token } = tokenResponse;
                if (!access_token) throw new Error('Google credential is missing');

                const username = await googleLogin(access_token);
                if(!username){
                    setErrorMessage("Google login failed. Please try again.");
                    return;
                }

                if (username.startsWith("google_")) {
                    router.push('/register/google');
                } else {
                    router.push('/dashboard');
                }
            } catch (error:unknown) {
                const appError:AppError = errorHandler(error);
                setErrorMessage(appError.friendlyMessage || "An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            setErrorMessage("Google login failed. Please try again.");
        },
        prompt: "consent",
    });
    
    return (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={() => login()}
                disabled={isLoading}
                className="size-12 p-2 rounded-lg bg-gradient-to-br from-background-sidebar to-card border border-card hover:border-card-lightest disabled:hover:border-card disabled:opacity-50 flex justify-center items-center transition-150"
            >
                { !isLoading ? <GoogleColourIcon className='size-full'/> : <SpinnerIcon className="animate-spin size-full"/> }
                <span className='sr-only'>Iniciar sesión con Google</span>
            </button>
            <FormErrorMessage condition={!!errorMessage} message={errorMessage||"Ocurrio un error inesperado."} className="mt-2"/>
        </div>
    );
};