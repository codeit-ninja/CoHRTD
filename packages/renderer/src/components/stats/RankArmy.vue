<template>
    <img :src="flagIcon" :title="props.faction" />
</template>
<script lang="ts" setup>
    import { type Factions } from 'composables/helpers';
    import { computed } from 'vue';

    const props = defineProps<{ faction: Factions.Us|Factions.Brit|Factions.Pe|Factions.Wehr }>();
    const flagIcon = computed(() => new URL('/' + props.faction.toLowerCase() + '.png', import.meta.url).href);
</script>