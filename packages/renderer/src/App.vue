<template>
    <Transition mode="out-in">
        <LoadingScreen v-if="loading" />
        <AppScreen v-else />
    </Transition>
</template>
<script lang="ts">
    import { defineComponent, onMounted, ref } from 'vue';

    import LoadingScreen from './components/LoadingScreen.vue';
    import AppScreen from './components/AppScreen.vue';
    import { useAuthStore } from 'store/auth';

    export default defineComponent({
        components: {
            LoadingScreen,
            AppScreen
        },
        setup() {
            const loading = ref(true);

            onMounted( async () => {
                await useAuthStore().login();

                setTimeout(() => loading.value = false, 1000);
            })

            return {
                loading
            }
        }
    })
</script>