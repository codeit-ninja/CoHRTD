import {ipcRenderer} from 'electron';

export function getSettings() {
    return ipcRenderer.invoke('get-settings');
}

export function updateSettings(settings: object): Promise<SettingsResponseStatus> {
    return ipcRenderer.invoke('update-settings', settings);
}
