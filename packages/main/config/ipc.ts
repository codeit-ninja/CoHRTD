import type IPCContract from 'contracts/ipc';

import IPCSettings from '/@/classes/ipc/settings';
import IPCAuth from '/@/classes/ipc/auth';
import IPCRelic from '../src/classes/ipc/relic';

/*
|--------------------------------------------------------------------------
| ipcModules
|--------------------------------------------------------------------------
|
| Inter Process Communication modules.
|
| These modules are used to asynchronously recieve and send
| messages from the renderer process
|
*/
export const ipcModules: IPCContract[] = [new IPCSettings(), new IPCAuth(), new IPCRelic()];

export default ipcModules;
