import {} from 'App/Core/Contracts/IPC';
import {app} from 'core';

export default class IPCAuth extends IPCContract {
    public channels = [
        {name: 'twitch-login', handler: this.login},
        {name: 'current-user', handler: this.currentUser},
    ];

    public async login() {
        return await app.auth.authorize();
    }

    public async currentUser() {
        return await app.auth.getUser();
    }
}
