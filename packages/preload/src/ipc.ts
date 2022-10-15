import type {Channels} from 'App/Core/IPC';
import {ipcRenderer} from 'electron';

export const request = <T extends keyof Channels>(channel: T, ...args: Parameters<Channels[T]>) =>
    ipcRenderer.invoke(channel, ...args) as unknown as Promise<ReturnType<Channels[T]>>;

export const IPC = {
    request,
};
