'use client';

import { forwardRef, useImperativeHandle } from 'react';
import { GoogleReCaptchaProvider, GoogleReCaptchaCheckbox, useGoogleReCaptcha } from '@google-recaptcha/react';

export interface ReCaptchaFieldHandle {
    reset: () => void;
}

interface Props {
    onChange: (token: string) => void;
    onError: () => void;
    onExpired: () => void;
}

const ReCaptchaCheckboxInner = forwardRef<ReCaptchaFieldHandle, Props>(({ onChange, onError, onExpired }, ref) => {
    const { reset } = useGoogleReCaptcha();

    useImperativeHandle(ref, () => ({
        reset: () => reset?.(),
    }));

    return (
        <GoogleReCaptchaCheckbox
            size="normal"
            onChange={onChange}
            onError={onError}
            onExpired={onExpired}
        />
    );
});

ReCaptchaCheckboxInner.displayName = 'ReCaptchaCheckboxInner';

export const ReCaptchaField = forwardRef<ReCaptchaFieldHandle, Props>((props, ref) => {
    return (
        <GoogleReCaptchaProvider type="v2-checkbox" siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} language="es-419" theme="dark">
            <ReCaptchaCheckboxInner ref={ref} {...props} />
        </GoogleReCaptchaProvider>
    );
});

ReCaptchaField.displayName = 'ReCaptchaField';
