import {createRouter, createWebHashHistory} from 'vue-router';
import {settings} from '/@/store/settings';

import DashboardPage from './pages/DashboardPage.vue';
import ConfigurationPage from './pages/ConfigurationPage.vue';
import CurrentMatch from './pages/CurrentMatch.vue';

export const routes = [
    {
        name: 'Dashboard',
        path: '/',
        component: DashboardPage,
        layout: async () => await import('./layouts/DefaultLayout.vue'),
    },
    {
        name: 'CurrentMatch',
        path: '/current-game',
        component: CurrentMatch,
        layout: async () => await import('./layouts/DefaultLayout.vue'),
    },
    {
        name: 'Configure',
        path: '/configure',
        component: ConfigurationPage,
        layout: async () => await import('./layouts/EmptyLayout.vue'),
    },
];

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});

router.beforeEach(async to => {
    if (
        // Make sure app is configured
        !settings.configured &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Configure'
    ) {
        // Redirect to the configure page
        return {name: 'Configure'};
    }
});

export default router;
