import {createApp, markRaw} from 'vue';
import App from '/@/App.vue';
import router from '/@/router';

import '/@/scss/main.scss';
import {createPinia} from 'pinia';

try {
    const pinia = createPinia();
    const vueApp = createApp(App);

    // Add router to pinia store
    // so we can access the router in a store
    // using this.router
    pinia.use(({store}) => {
        store.router = markRaw(router);
    });

    Object.values(import.meta.globEager('./modules/*.ts')).forEach(module =>
        module.install?.(vueApp),
    );

    vueApp.use(router).mount('#app');
} catch (e) {
    console.log(e);
}
