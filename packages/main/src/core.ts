import type {CoHGameEvents} from 'App/Core/Game';
import type {Channels} from 'App/Core/IPC';

import Settings from './classes/settings';
import appConfig from 'config/app';
import Auth from './classes/auth';
import Emittery from 'emittery';
import {api} from './relic/api';
import {ipcMain, type IpcMainInvokeEvent} from 'electron';
import Game from './classes/game/game';

class Core {
    /*
    |--------------------------------------------------------------------------
    | App configuration
    |--------------------------------------------------------------------------
    |
    | App wide properties, these properties are read-only.
    | These properties are not exposed to the renderer.
    |
    */
    public config = appConfig;
    /*
    |--------------------------------------------------------------------------
    | Settings
    |--------------------------------------------------------------------------
    |
    | Note that these settings are exposed to the rendered.
    | Tokens and secrets should always be placed inside the .env file or
    | in the `appConfig`.
    |
    */
    public settings = new Settings();
    /*
    |--------------------------------------------------------------------------
    | Api
    |--------------------------------------------------------------------------
    |
    | Relic API.
    |
    */
    public api = api;
    /*
    |--------------------------------------------------------------------------
    | auth
    |--------------------------------------------------------------------------
    |
    | App authentication provider
    |
    */
    public auth = new Auth();
    /*
    |--------------------------------------------------------------------------
    | events
    |--------------------------------------------------------------------------
    |
    | Emits game events when a new even happened.
    |
    | Currently 4 events are implemented
    | `populating`
    | `gameStarted`
    | `gameEnded`
    | `playerPopulated` returns => `CoHPlayerPopulated`
    | `playerSteamInfo` returns => `CoHPlayerSteamInfo`
    |
    */
    public events = new Emittery<CoHGameEvents>();
    /*
    |--------------------------------------------------------------------------
    | game
    |--------------------------------------------------------------------------
    |
    | Current game state, listens and parses events
    | send by the `app.events`.
    |
    */
    public game: Game;

    constructor() {
        this.game = new Game(this.settings.logPath);
    }
}

export interface App extends Core {}

export const app = new Core();
export const IPC = {
    // @ts-ignore
    handle: <T extends keyof Channels>(
        handle: T,
        listener: (
            event: IpcMainInvokeEvent,
            ...args: Parameters<Channels[T]>
        ) => ReturnType<Channels[T]>,
    ) => ipcMain.handle(handle, listener),
};
