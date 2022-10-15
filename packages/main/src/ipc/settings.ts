import { app, IPC } from 'core';

IPC.handle('get-settings', () => app.settings.all());
IPC.handle('update-settings', (event, settings) => app.settings.update({...app.settings.all(), ...settings}));