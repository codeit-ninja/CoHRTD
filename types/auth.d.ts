declare module 'App/Core/Auth' {
    import type {LeaderboardStats} from 'App/Core/Relic';
    /*
    |--------------------------------------------------------------------------
    | User
    |--------------------------------------------------------------------------
    |
    | Data for current authenticated twitch user
    |
    */
    interface User {
        id: string;
        login: string;
        displayName: string;
        broadcasterType: string;
        description: string;
        profilePictureUrl: string;
        offlinePlaceholderUrl: string;
        email: string;
        creationDate: Date;
    }

    interface AuthUser {
        steamid: number;
        communityvisibilitystate: number;
        profilestate: number;
        personaname: string;
        profileurl: string;
        avatar: string;
        avatarmedium: string;
        avatarfull: string;
        avatarhash: string;
        personastate: number;
        primaryclanid: number;
        timecreated: number;
        personastateflags: number;
        stats: LeaderboardStats[];
    }
}
