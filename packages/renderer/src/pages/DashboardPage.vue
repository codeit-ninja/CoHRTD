<template>
    <div class="container mx-auto">
        <header>
            <h1>Profile overview</h1>
        </header>
        <div class="row">
            <div class="col-12 col-sm-6">
                <div class="row g-2">
                    <div class="col-4">
                        <span class="small">Status</span>
                    </div>
                    <div class="col-8">
                        <span 
                            class="badge"
                            :class="{
                                'bg-danger': ! gameStore.game || gameStore.game?.state === 'OFFLINE',
                                'bg-success': gameStore.game && gameStore.game.state === 'ONLINE',
                                'bg-info': gameStore.game && gameStore.game.state === 'IN_GAME',
                            }"
                        >{{ gameStore.game?.state }}</span>
                    </div>
                    <div class="col-4">
                        <span class="small">Twitch</span>
                    </div>
                    <div class="col-8">
                        <!-- <span v-if="state.isAuthenticated && state.user" class="badge bg-info">Connected</span> -->
                        <span class="badge bg-danger">Disconnected</span>
                    </div>
                    <div class="col-4">
                        <span class="small">Steam ID</span>
                    </div>
                    <div class="col-8">
                        <span>{{ settings?.steamId }}</span>
                    </div>
                    <div class="col-4">
                        <span class="small">Username</span>
                    </div>
                    <div class="col-8">
                        <span>{{ authStore.user?.personaname }}</span>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 text-end">
                <img :src="authStore.user?.avatarfull" class="img-thumbnail" />
            </div>
            <div class="stats col-12 mt-5">
                <LeaderboardStats />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { settings } from 'store/settings';
    import LeaderboardStats from '../components/LeaderboardStats.vue';
    import { useAuthStore } from 'store/auth';
    import { useGameStore } from 'store/game';
    import { defineComponent } from 'vue';

    export default defineComponent({
        components: {
            LeaderboardStats
        },
        setup() {
            const authStore = useAuthStore();
            const gameStore = useGameStore();
            console.log(authStore)
            return {
                settings,
                authStore,
                gameStore
            }
        }
    })
</script>