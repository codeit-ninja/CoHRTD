<template>
    <img :src="rankicon" :title="'Lvl. ' + props.rank" class="stats-group-rank-icon" />
</template>
<script lang="ts" setup>
    import type { Factions } from 'composables/helpers';
    import { computed } from 'vue';

    const props = defineProps<{ rank: number, faction: Factions.Us|Factions.Brit|Factions.Pe|Factions.Wehr }>();
    const rankicon = computed(() => {
        const level = String(props.rank === -1 ? 0 : props.rank === 9999999 ? 1 : props.rank).padStart(2, '0');
        const formatted = level === '00' ? '/ranks/no_rank_yet.png' : `/ranks/${props.faction.toLowerCase()}/${level}.png`;
        console.log(level)
        return new URL(formatted, import.meta.url).href;
    });
</script>