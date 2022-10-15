import type {IpcMainInvokeEvent} from 'electron';
import type {AppSettings} from 'App/Core/Ipc';

import IPCContract from 'contracts/ipc';
import {app} from 'core';

export default class IPCSettings extends IPCContract {
    public channels = [
        {name: 'get-settings', handler: this.getSettings},
        {name: 'update-settings', handler: this.updateSettings},
    ];

    public getSettings() {
        return app.settings.all();
    }

    public async updateSettings(event: IpcMainInvokeEvent, updateSettings: AppSettings) {
        return await app.settings.update(updateSettings);
    }
}
