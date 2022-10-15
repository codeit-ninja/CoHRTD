import type {CoHGameState} from 'App/Core/Game';

import {defineStore} from 'pinia';
import {IPC} from '#preload';
import {useAuthStore} from 'store/auth';

setInterval(() => {
    if (!useAuthStore().isLoggedIn) {
        return;
    }

    // useGameStore().refresh();
}, 1000);

export const useGameStore = defineStore('game', {
    state: () => {
        return {
            game: null as CoHGameState | null,
        };
    },
    actions: {
        async refresh() {
            // this.game = await IPC.request('get-game-info');
        },
    },
});
