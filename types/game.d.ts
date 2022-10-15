declare module 'App/Core/Game' {
    import type {MemberProfile, LeaderboardStats} from 'App/Core/Relic';
    import type {Dictionary} from 'lodash';

    interface CoHPlayerPopulated {
        playerIndex: number;
        playerId: number;
        type: number;
        team: number;
        race: number;
        cpu: boolean;
        difficulty?: string;
    }

    interface CoHPlayerSteamInfo {
        steamId: string;
        slot: number;
        rank: number;
    }

    type CoHPlayer = CoHPlayerPopulated & CoHPlayerSteamInfo & MemberProfile;

    interface CoHPlayerWithStats extends CoHPlayer {
        stats: LeaderboardStats;
    }

    interface CoHGameEvents {
        LOBBY_CREATED: never;
        gameStarted: never;
        gameEnded: never;
        gameType: string;
        gameMap: string;
        playerPopulated: CoHPlayerPopulated;
        playerSteamInfo: CoHPlayerSteamInfo;
        cpuPlayerType: string;
        gameState: 'ONLINE' | 'OFFLINE' | 'IN_GAME';
    }

    interface CoHGameState {
        state: 'ONLINE' | 'OFFLINE' | 'IN_GAME';
        started: boolean;
        players: Partial<CoHPlayerWithStats>[];
        map?: string;
        teams: Dictionary<Partial<CoHPlayerWithStats>[]>;
    }
}
