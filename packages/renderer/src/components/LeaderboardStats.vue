<template>
    <slot name="title"></slot>
    <div class="row stats-header g-0">
        <div class="col-1"><span>Level</span></div>
        <div class="col-3"><span>Type</span></div>
        <div class="col-1"><span>Army</span></div>
        <div class="col-2"><span>Position</span></div>
        <div class="col-2"><span>Wins</span></div>
        <div class="col-2"><span>Losses</span></div>
        <div class="col-1"><span>Streak</span></div>
    </div>
    <div class="stats-container">
        <StatGroup v-for="(stat, id) in stats" :key="id" :stats="stat" />
    </div>
</template>
<script lang="ts" setup>
    import { computed } from 'vue';
    import { orderBy } from 'lodash';
    import { useAuthStore } from 'store/auth';
    import StatGroup from './stats/StatGroup.vue';

    const { user } = useAuthStore();
    const stats = computed(() => orderBy(user?.stats, ['rank', 'leaderboardId'], ['asc', 'asc'] ));
</script>