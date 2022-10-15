<template>
    <div class="row g-0 stats-group">
        <div class="col-1">
            <span>
                <RankIcon
                    :rank="group.stats.ranklevel"
                    :faction="faction ?? Factions.Us"
                />
            </span>
        </div>
        <div class="col-3">
            <span>
                <RankType :leaderboard-id="group.stats.leaderboardId" />
            </span>
        </div>
        <div class="col-1">
            <span>
                <RankArmy :faction="faction ?? Factions.Us" />
            </span>
        </div>
        <div class="col-2">
            <span>
                {{ group.stats.rank === 9999999 ? '' : group.stats.rank }}
            </span>
        </div>
        <div class="col-2">
            <span>
                {{ group.stats.wins }}
            </span>
        </div>
        <div class="col-2">
            <span>
                {{ group.stats.losses }}
            </span>
        </div>
        <div class="col-1">
            <span>
                {{ group.stats.streak }}
            </span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type {LeaderboardStats} from 'App/Core/Relic';
import {computed} from 'vue';
import {factions, type Factions} from 'composables/helpers';

import RankIcon from './RankIcon.vue';
import RankType from './RankType.vue';
import RankArmy from './RankArmy.vue';

interface StatGroup {
    stats: LeaderboardStats;
}

const group = defineProps<StatGroup>();
const faction = computed(
    () => factions.find(faction => faction.ids.includes(group.stats.leaderboardId))?.faction,
);
</script>
