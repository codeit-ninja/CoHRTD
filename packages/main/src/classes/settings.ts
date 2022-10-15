import type {AppSettings} from 'App/Core/Config';

import {writeFileSync, readFileSync, existsSync} from 'fs';
import appConfig from 'config/app';

export default class Settings implements AppSettings {
    constructor() {
        if (!existsSync(appConfig.settingsPath)) {
            writeFileSync(appConfig.settingsPath, JSON.stringify({configured: false}));
        }
    }

    all(): AppSettings {
        return JSON.parse(readFileSync(appConfig.settingsPath, {encoding: 'utf8'})) as AppSettings;
    }

    get(key: keyof AppSettings) {
        return this.all()[key];
    }

    update(settings: AppSettings) {
        writeFileSync(appConfig.settingsPath, JSON.stringify({...settings, configured: true}));

        return {status: 'OK', message: 'Settings saved.'};
    }

    get configured() {
        return this.all().configured;
    }

    get steamId() {
        return this.all().steamId;
    }

    get steamName() {
        return this.all().steamName;
    }

    get logPath() {
        return this.all().logPath;
    }
}

export function loadSettings() {
    return new Settings().all();
}
