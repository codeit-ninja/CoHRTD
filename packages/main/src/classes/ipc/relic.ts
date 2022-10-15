import type {IpcMainInvokeEvent} from 'electron';

import IPCContract from 'contracts/ipc';
import {relicApi} from 'core';

export default class IPCRelic extends IPCContract {
    public channels = [
        {name: 'relic-get-me', handler: this.getProfile},
        {name: 'relic-get-stats', handler: this.getStats},
    ];

    public async getProfile(event: IpcMainInvokeEvent, steamId?: string) {
        return await relicApi.getProfile(steamId);
    }

    public async getStats(event: IpcMainInvokeEvent, steamId?: string) {
        return await relicApi.getStats(steamId);
    }
}
