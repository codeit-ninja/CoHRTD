declare module 'App/Core/IPC' {
    import type {LeaderboardStats, MemberProfile} from 'App/Core/Relic';
    import type {AppSettings} from 'App/Core/Config';
    import type {AuthUser} from 'App/Core/Auth';
    import type {App} from 'core';
    import type {CoHGameState} from 'App/Core/Game';
    /*
    |--------------------------------------------------------------------------
    | IPC main
    |--------------------------------------------------------------------------
    |
    | Register you IPC channels here.
    |
    | You can invoke these channels from the `preload` or `renderer` process.
    | 
    | Example:
    | import IPC from './ipc';
    |
    | IPC.request('channel-name', ...arguments) 
    |
    | https://www.electronjs.org/docs/latest/tutorial/ipc
    |
    */
    interface Channels {
        'needs-auth-setup': () => boolean;
        'get-app': () => App;
        'get-auth-user': () => Promise<AuthUser | null>;
        'get-session-user': () => Promise<AuthUser>;
        'twitch-login': () => Promise<User>;
        'twitch-current-user': () => Promise<User>;
        'get-settings': () => AppSettings;
        'update-settings': (settings: Partial<AppSettings>) => RequestStatusResponse;
        'relic-get-me': (steamId?: string) => Promise<MemberProfile>;
        'relic-get-stats': (steamId?: string) => Promise<LeaderboardStats>;
        'get-game-info': () => CoHGameState | undefined;
    }

    interface RequestStatusResponse {
        status: string;
        message: string;
    }
}
