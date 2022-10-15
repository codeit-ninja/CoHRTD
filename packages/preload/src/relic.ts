import type { MemberProfile, LeaderboardStats } from 'Relic';
import { ipcRenderer } from 'electron';

export async function getMe(): Promise<MemberProfile> {
    return await ipcRenderer.invoke('relic-get-me');
}

export async function getProfileBySteamId( steamId: string ): Promise<MemberProfile> {
    return await ipcRenderer.invoke('relic-get-profile-by-steam-id', steamId);
}

export async function getStats( steamId?: string ): Promise<LeaderboardStats[]> {
    return await ipcRenderer.invoke('relic-get-stats', steamId);
}