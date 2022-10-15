<template>
    <div class="container mx-auto">
        <header>
            <h1>Current match</h1>
        </header>

        <div class="row g-2">
            <div class="col-12 col-sm-2">
                <span class="small">State</span>
            </div>
            <div class="col-12 col-sm-10">
                <span
                    class="badge"
                    :class="{
                        'bg-danger': gameStore.game?.state === 'OFFLINE',
                        'bg-success text-dark': gameStore.game?.started,
                        'bg-info': gameStore.game?.state === 'ONLINE',
                    }"
                    >{{ state }}</span
                >
            </div>
            <div class="col-12 col-sm-2">
                <span class="small">Map</span>
            </div>
            <div class="col-12 col-sm-10">
                <span class="small">{{ gameStore.game?.map }}</span>
            </div>
            <div class="col-12 col-sm-2">
                <span class="small">Players</span>
            </div>
            <div class="col-12 col-sm-10">
                <span class="small">{{ gameStore.game?.players.length }}</span>
            </div>
        </div>
        <hr class="my-5" />
        <div
            v-if="gameStore.game"
            class="teams teams-container"
        >
            <div class="row g-0 align-items-center">
                <div class="col-3">
                    <h2 class="text-end mb-4">Allies</h2>
                    <span
                        v-for="(player, index) in gameStore.game?.teams[0]"
                        :key="index"
                        class="d-flex gap-2 align-items-center justify-content-end"
                    >
                        <span class="teams-player-name small"
                            >{{ player.playerId === -1 ? 'CPU' : player.alias }}
                            {{ player.difficulty ? ' - ' + player.difficulty : '' }}</span
                        >
                        <RankIcon
                            :rank="player.rank ?? 0"
                            :faction="Factions.Us"
                        />
                    </span>
                </div>
                <div class="col-6 text-center">
                    <img
                        :src="VersusVector"
                        width="100"
                        class="versus-vector"
                    />
                </div>
                <div class="col-3">
                    <h2 class="mb-4">Axis</h2>
                    <span
                        v-for="(player, index) in gameStore.game?.teams[1]"
                        :key="index"
                        class="d-flex gap-2 align-items-center"
                    >
                        <RankIcon
                            :rank="player.rank ?? 0"
                            :faction="Factions.Us"
                        />
                        <span class="teams-player-name small"
                            >{{ player.playerId === -1 ? 'CPU' : player.alias }}
                            {{ player.difficulty ? ' - ' + player.difficulty : '' }}</span
                        >
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {useGameStore} from 'store/game';
import {computed} from 'vue';
import VersusVector from '/versus.svg';
import RankIcon from '../components/stats/RankIcon.vue';
import {Factions} from 'composables/helpers';

const gameStore = useGameStore();
const state = computed(() => {
    if (!gameStore.game) {
        return 'Waiting for a game to start';
    }

    if (gameStore.game.started) {
        return 'Game started';
    }

    return gameStore.game.state;
});

console.log(gameStore.game);
</script>
