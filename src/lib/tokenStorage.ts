import Cookies from 'js-cookie';

export const isLoggedIn = (): boolean => Cookies.get('logged_in') === '1';

export const clearLoginFlag = () => {
  Cookies.remove('logged_in', { path: '/' });
};
