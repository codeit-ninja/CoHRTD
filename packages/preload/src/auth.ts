import {request} from './ipc';

export function isAuthenticated() {
    return request('needs-auth-setup');
}

export function getCurrentUser() {
    return request('get-session-user');
}
