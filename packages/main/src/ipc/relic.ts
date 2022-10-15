import { IPC } from 'core';
import { api } from '../relic/api';

IPC.handle('relic-get-me', async (event, steamId) => await api.getProfile(steamId));
IPC.handle('relic-get-stats', async (event, steamId) => await api.getStats(steamId));