export const getRedirectUrl = (param: string | null): string => {
    if (param && param.startsWith('/') && !param.startsWith('//') && !param.includes('\\')) {
        return param;
    }
    return '/dashboard';
};

const SKIP_REDIRECT_PATHS = ['/dashboard', '/login', '/register', '/password-recovery'];

export const buildRedirectParam = (pathname: string): string => {
    if (!pathname || SKIP_REDIRECT_PATHS.some(p => pathname === p)) return '';
    return `?redirect=${encodeURIComponent(pathname)}`;
};
