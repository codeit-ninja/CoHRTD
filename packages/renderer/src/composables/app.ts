import type Auth from '../classes/auth';
import { isAuthenticated, getCurrentUser } from '#preload';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { state } from 'store/app';

export const provideAuth = async () => {
    return {
        isAuthenticated: await isAuthenticated(),
        user: await isAuthenticated() ? await getCurrentUser() : null
    }
}

export const useAuth = () => inject('auth') as Auth;

export const doStartUp = async () => {
    const router = useRouter();
    const auth = useAuth();

    await auth.login();

    if( ! auth.isLoggedIn ) {
        router.replace({ name: 'Configure' });
    } else {
        router.replace({ name: 'Dashboard' });
    }

    state.auth.value = auth;
}