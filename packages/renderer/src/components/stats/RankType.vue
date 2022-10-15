<template>
    {{ type }}
</template>
<script lang="ts" setup>
    import { matchTypes } from 'composables/helpers';
    import { computed } from 'vue';

    const props = defineProps<{ leaderboardId: number }>();
    const type = computed(() => matchTypes.find(type => type.ids.includes(props.leaderboardId))?.type);
</script>