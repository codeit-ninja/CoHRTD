import type {Mutable} from 'types';
import type {AppSettings} from 'App/Core/Config';

import {getSettings, updateSettings} from '#preload';
import {reactive} from 'vue';
import {toasts} from 'store/toasts';
import {getErrorMessage} from '../modules/error';

export const settings = reactive<Mutable<AppSettings>>(await getSettings());
export const state = reactive({
    isProcessing: false,
});

export const actions = {
    updateSettings: async () => {
        try {
            state.isProcessing = true;

            const response = await updateSettings({...settings});

            if (response.status === 'ERROR') {
                toasts.push({message: response.message, type: 'danger'});
            }

            // Prevents flickering
            setTimeout(() => {
                toasts.push({message: response.message, type: 'success'});
                state.isProcessing = false;
            }, 500);
        } catch (e) {
            // Prevents flickering
            setTimeout(() => {
                toasts.push({message: getErrorMessage(e), type: 'danger'});
                state.isProcessing = false;
            }, 500);
        }
    },
};

export default {
    settings,
    state,
    actions,
};
