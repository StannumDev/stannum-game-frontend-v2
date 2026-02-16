import Cookies from 'js-cookie';

const IS_PRODUCTION = process.env.NEXT_PUBLIC_ENV === 'production';

const COOKIE_OPTIONS = {
  secure: IS_PRODUCTION,
  sameSite: 'Lax' as const,
  path: '/',
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  if (!accessToken || !refreshToken) {
    throw new Error('Both access token and refresh token are required');
  }
  Cookies.set('token', accessToken, { ...COOKIE_OPTIONS, expires: 1 });
  Cookies.set('refreshToken', refreshToken, { ...COOKIE_OPTIONS, expires: 7 });
};

export const getAccessToken = (): string | undefined => Cookies.get('token');

export const getRefreshToken = (): string | undefined => Cookies.get('refreshToken');

export const clearTokens = () => {
  Cookies.remove('token', { path: '/' });
  Cookies.remove('refreshToken', { path: '/' });
};
