import type {AuthUser} from 'App/Core/Auth';
import {isAuthenticated, getCurrentUser} from '#preload';

export default class Auth {
    public user?: AuthUser;

    public isLoggedIn = false;

    async login() {
        this.isLoggedIn = await isAuthenticated();

        if (this.isLoggedIn) {
            this.user = await getCurrentUser();
        }
    }

    async isAuthenticated() {
        return await isAuthenticated();
    }
}
