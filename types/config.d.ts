declare module 'App/Core/Config' {
    import type { HelixPrivilegedUser } from '@twurple/api';
    import type { Profile } from 'Relic';
    /*
    |--------------------------------------------------------------------------
    | App configuration
    |--------------------------------------------------------------------------
    |
    | Properties which are app wide. These are read-only and are
    | initialized on app startup process.
    |
    */
    interface AppConfig {
        readonly basePath: string;
        readonly settingsPath: string;
    }
    /*
    |--------------------------------------------------------------------------
    | Settings
    |--------------------------------------------------------------------------
    |
    | Settings used accross the app, add your settings here
    | when needed to have proper intellisense.
    |
    | Note that these settings are exposed to the rendered.
    | Tokens and secrets should always be placed inside your .env file
    |
    */
    interface AppSettings {
        configured: boolean;
        logPath: string;
        steamId: string;
        steamName: string;
    }
    /*
    |--------------------------------------------------------------------------
    | AppState
    |--------------------------------------------------------------------------
    |
    | Global app state, this will be set internally to keep track
    | of various properties needed to keep app running properly.
    |
    */
    interface AppState {
        auth: {
            isAuthenticated: boolean;
            user: HelixPrivilegedUser|null
        },
        relic: {
            user: Profile|null,
            stats: LeaderboardStats[]|null;
        }
    }
}