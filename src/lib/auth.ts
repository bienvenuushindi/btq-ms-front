'use client'
import Cookies from 'js-cookie';

export const setToken = (user: string, accessToken: string) => {
    if (typeof window === 'undefined') {
        return;
    }

    // Calculate the expiration time 1200 minutes (20 hours) from now
    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + 1200 * 60 * 1000); // 1200 minutes in milliseconds
    Cookies.set('user', user, { expires: expiresDate });
    Cookies.set('accessToken', accessToken, { expires: expiresDate });
    Cookies.set('expiresAt', expiresDate.toISOString(), { expires: expiresDate });
};
