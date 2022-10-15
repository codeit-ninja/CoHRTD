import type { AuthUser } from 'App/Core/Auth';

import { defineStore } from 'pinia';
import { isAuthenticated, getCurrentUser } from '#preload';

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            isLoggedIn: false,
            user: null as null as AuthUser|null,
        }
    },
    actions: {
        async login() {
            this.isLoggedIn = await isAuthenticated();
            
            if( ! this.isLoggedIn ) {
                this.router.replace({ name: 'Configure' });

                return;
            }

            this.user = await getCurrentUser();
            this.router.replace({ name: this.router.currentRoute.value.name ?? 'Dashboard' });
        }
    }
})