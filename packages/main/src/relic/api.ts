import type { LeaderboardStats, LeaderboardStatsResponse, MemberProfile, MemberProfileResponse } from 'App/Core/Relic';
import type { AuthUser } from 'App/Core/Auth';

import { app } from 'core';
import { camelCase, mapKeys, transform } from 'lodash';
import axios from 'axios';

class Api {
    public async getUser(steamId: string) {
        try {
            const { data } = await axios.get('/relicLink.php', { params: { playerSteamSummary: steamId } });
            const stats = await this.getStats(steamId);

            return {...data.steamResults.response.players[0], ...{stats: stats}} as unknown as AuthUser;
        } catch(e) {
            throw new Error(import.meta.env.VITE_RELIC_API_URL);
        }
    }

    public async getProfile(steamId?: string) {        
        const { data } = await axios.get('/relicLink.php', { params: { steamUserID: steamId || app.settings.steamId } });
        const profile = data.statGroups[0].members[0] as MemberProfileResponse;

        return mapKeys(profile, (v, k) => camelCase(k)) as unknown as MemberProfile;
    }

    public async getStats(steamId?: string) {
        const { data } = await axios.get('/relicLink.php', { params: { steamUserID: steamId || app.settings.steamId } });
        const stats = data.leaderboardStats as LeaderboardStatsResponse[];

        return stats.map(stat => transform(stat, (a, c, i) => {
            // @ts-ignore
            a[camelCase(i)] = i !== 'streak' && c === -1 ? 9999999 : c
        })) as unknown as LeaderboardStats;
    }
}

export const api = new Api();