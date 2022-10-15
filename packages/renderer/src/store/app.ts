import type {CoHGameState} from 'App/Core/Game';
import type Auth from '../classes/auth';

import {IPC} from '#preload';
import {ref} from 'vue';

setInterval(async () => {
    if (!state.auth.value?.isLoggedIn) {
        return;
    }

    state.game.value = await IPC.request('get-game-info');
}, 1000);

export const state = {
    auth: ref<Auth>(),
    game: ref<CoHGameState>(),
};
