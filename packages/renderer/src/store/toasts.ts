import {reactive} from 'vue';

export type ToastMessage = {
    message: string;
    type: 'info' | 'success' | 'warning' | 'danger';
};

export const toasts = reactive<ToastMessage[]>([]);
