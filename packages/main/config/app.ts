import type { AppConfig } from 'App/Core/Config';

import { app } from 'electron';

/**
 * Feel free to let me know via PR, if you find something broken in this config
 * file.
 */
export const appConfig: AppConfig = {
    /*
    |--------------------------------------------------------------------------
    | basePath
    |--------------------------------------------------------------------------
    |
    | Root path to app files, this path must be an absolute path.
    |
    */
    basePath: app.getAppPath(),
    /*
    |--------------------------------------------------------------------------
    | settingsPath
    |--------------------------------------------------------------------------
    |
    | Absolute path to settings.json.
    |
    | Inside are the variables stored defined by the user in the
    | configuration process.
    |
    */
    settingsPath: app.getAppPath() + '/settings.json',
}

export default appConfig;