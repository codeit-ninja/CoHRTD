declare module 'App/Core/Relic' {
    interface MemberProfileResponse { 
        profile_id: number;
        name: string;
        alias: string;
        personal_statgroup_id: number;
        xp: number;
        level: number;
        leaderboardregion_id: number;
        country: string;
    }

    interface MemberProfile {
        profileId: number;
        name: string;
        alias: string;
        personalStatgroupId: number;
        xp: number;
        level: number;
        leaderboardregionId: number;
        country: string;
    }

    interface LeaderboardStatsResponse {
        statgroup_id: number;
        leaderboard_id: number;
        wins: number;
        losses: number;
        streak: number;
        disputes:number;
        drops: number;
        rank: number;
        ranktotal: number;
        ranklevel: number;
        regionrank: number;
        regionranktotal: number;
        lastmatchdate: number;
    }

    interface LeaderboardStats {
        statgroupId: number;
        leaderboardId: number;
        wins: number;
        losses: number;
        streak: number;
        disputes:number;
        drops: number;
        rank: number;
        ranktotal: number;
        ranklevel: number;
        regionrank: number;
        regionranktotal: number;
        lastmatchdate: number;
    }
}