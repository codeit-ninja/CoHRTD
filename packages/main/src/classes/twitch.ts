import type {User} from 'App/Core/Auth';

import {ApiClient, type HelixPrivilegedUser} from '@twurple/api';
import {ElectronAuthProvider} from '@twurple/auth-electron';

export default class TwitchAuth {
    constructor(
        /**
         * Twitch client ID
         *
         * @property
         * @protected
         */
        protected clientId = import.meta.env.VITE_TWITCH_CLIENT_ID,
        /**
         * Twitch auth redirect uri
         *
         * @property
         * @protected
         */
        protected redirectUri = import.meta.env.VITE_TWITCH_REDIRECT_URI,
        /**
         * Authentication provider
         *
         * @property
         * @public
         */
        public provider = new ElectronAuthProvider({
            clientId: clientId,
            redirectUri: redirectUri,
        }),
        /**
         * Provider client
         *
         * @property
         * @public
         */
        public client = new ApiClient({
            authProvider: provider,
        }),
        /**
         * Is app authenticated?
         *
         * @property
         * @public
         */
        public isAuthenticated = false,
        /**
         * Current authenticated user
         *
         * @property
         * @public
         */
        public user?: HelixPrivilegedUser,
    ) {
        this.provider.allowUserChange();
    }

    public async authorize() {
        await this.client.requestScopes([
            'user_read',
            'channel:moderate',
            'chat:edit',
            'chat:read',
            'whispers:read',
            'whispers:edit',
        ]);

        const user = await this.client.users.getMe();

        this.isAuthenticated = true;
        this.user = user;

        return this.getUser() as NonNullable<User>;
    }

    public getUser() {
        if (!this.user) {
            return null;
        }

        return {
            id: this.user?.id,
            login: this.user?.name,
            displayName: this.user?.displayName,
            broadcasterType: this.user?.broadcasterType,
            description: this.user?.description,
            profilePictureUrl: this.user?.profilePictureUrl,
            offlinePlaceholderUrl: this.user?.offlinePlaceholderUrl,
            email: this.user?.email,
            creationDate: this.user?.creationDate,
        };
    }
}
