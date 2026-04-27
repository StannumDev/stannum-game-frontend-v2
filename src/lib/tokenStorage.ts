import Cookies from 'js-cookie';

export const isLoggedIn = (): boolean => Cookies.get('logged_in') === '1';

export const clearLoginFlag = () => {
  Cookies.remove('logged_in', { path: '/' });

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const parts = host.split('.');
    if (parts.length >= 2) {
      const rootDomain = parts.slice(-2).join('.');
      Cookies.remove('logged_in', { path: '/', domain: `.${rootDomain}` });
      Cookies.remove('logged_in', { path: '/', domain: rootDomain });
    }
  }
};
