import {app, IPC} from 'core';

IPC.handle('get-game-info', () => app.game.getLobby()?.getGameInfo());
