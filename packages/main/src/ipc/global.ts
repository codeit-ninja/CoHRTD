import {ipcMain, dialog} from 'electron';

ipcMain.handle('open-file-dialog', async () => {
    return await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{name: 'Logs', extensions: ['log']}],
    });
});
