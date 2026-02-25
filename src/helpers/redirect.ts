/**
 * Validates and returns a safe redirect URL from a query parameter.
 * Blocks open redirect attacks (external URLs, protocol-relative, backslash tricks).
 */
export const getRedirectUrl = (param: string | null): string => {
    if (param && param.startsWith('/') && !param.startsWith('//') && !param.includes('\\')) {
        return param;
    }
    return '/dashboard';
};

const SKIP_REDIRECT_PATHS = ['/dashboard', '/login', '/register', '/password-recovery'];

/**
 * Builds a `?redirect=` query string from the current pathname.
 * Returns empty string if the path shouldn't be redirected back to.
 */
export const buildRedirectParam = (pathname: string): string => {
    if (!pathname || SKIP_REDIRECT_PATHS.some(p => pathname === p)) return '';
    return `?redirect=${encodeURIComponent(pathname)}`;
};
