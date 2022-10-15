import type { AuthUser } from 'App/Core/Auth';
import { api } from '../relic/api';
import { loadSettings } from './settings';

export default class Auth {
    /**
     * Current logged in user
     * 
     * @property
     * @public
     */
    public user?: AuthUser;

    /**
     * Check if a steamId exists, this is used to authorize user
     * 
     * @returns `boolean`
     */
    public hasSession() {
        const { steamId } = loadSettings();

        if( ! steamId ) {
            return false;
        }

        return true;
    }

    /**
     * Returns current session user
     * 
     * @returns `AuthUser`
     */
    public async getSession() {
        const { steamId } = loadSettings();

        return await api.getUser(steamId)
    }

    /**
     * Login
     * 
     * @param steamId 
     * @returns `AuthUser`
     */
    public async login(steamId: string) {
        return this.setUser(await api.getUser(steamId));
    }

    /**
     * Set current logged in user
     * 
     * @param user 
     * @returns `AuthUser`
     */
    public setUser(user: AuthUser) {
        return this.user = user;
    }

    /**
     * Call this function ONLY after 
     * user has logged in!
     * 
     * @returns `AuthUser`
     */
    public getCurrentUser() {
        return this.user as AuthUser;
    }
    
    public get isLoggedIn() {
        return !!this.user;
    }
}