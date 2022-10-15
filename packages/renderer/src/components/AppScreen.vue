<template>
    <div id="wrapper" class="d-flex min-vh-100 min-vw-100">
        <component :is="layout">
            <slot />
        </component>
        <main id="main" class="d-flex position-relative">
            <div class="wrapper d-flex flex-column flex-grow-1">
                <router-view class="flex-grow-1" />
                <ToastMessage />
            </div>
        </main>
    </div>
</template>
<script lang="ts">
    import { watch, shallowRef, defineComponent } from 'vue';
    import { useRoute } from 'vue-router';

    import DefaultLayout from '../layouts/DefaultLayout.vue';
    import ToastMessage from '../components/ToastMessage.vue';

    import { routes } from '/@/router';

    export default defineComponent({
        components: {
            ToastMessage
        },
        setup() {
            const route = useRoute();
            const layout = shallowRef(DefaultLayout);

            watch(
                () => route.name,
                async name => {
                    const route = routes.find(r => r.name === name);

                    if( route && route.layout ) {
                        const l = await route.layout();
                        
                        layout.value = l.default;
                    }
                },
                { 
                    immediate: true 
                }
            );

            return {
                layout
            }
        }
    })
</script>