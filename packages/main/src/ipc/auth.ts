import {app, IPC} from 'core';

IPC.handle('get-auth-user', async () => await app.auth.getCurrentUser());
IPC.handle('get-session-user', async () => await app.auth.getSession());
IPC.handle('needs-auth-setup', () => app.auth.hasSession());
