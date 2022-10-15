<template>
    <section class="nav-section">
        <span class="nav-section-header"> Navigation </span>
        <nav class="nav flex-column">
            <router-link
                class="nav-link"
                :to="{name: 'Dashboard'}"
            >
                <EyeIcon />
                <span>Overview</span>
            </router-link>
            <router-link
                class="nav-link"
                :to="{name: 'CurrentMatch'}"
            >
                <BoltIcon />
                <span>Current match</span>
            </router-link>
            <a class="nav-link">
                <ClockIcon />
                <span>Match history</span>
            </a>
            <a class="nav-link">
                <VideoCameraIcon />
                <span>Replay's</span>
            </a>
            <router-link
                class="nav-link"
                :to="{name: 'Configure'}"
            >
                <Cog6ToothIcon />
                <span>Settings</span>
            </router-link>
        </nav>
    </section>
    <section class="nav-section">
        <div class="nav-section-header d-flex">
            <span>Twitch</span>
        </div>
        <!-- <nav class="nav flex-column">
            <span v-if="state.isAuthenticated && state.user" class="text-primary px-4">{{ state.user.displayName }}</span>
            <button class="btn btn-link text-start px-4" role="link" @click="actions.login" v-else>
                Login with twitch
            </button>
        </nav> -->
    </section>
</template>
<script lang="ts" setup>
import {
    EyeIcon,
    Cog6ToothIcon,
    ClockIcon,
    VideoCameraIcon,
    BoltIcon,
} from '@heroicons/vue/24/outline';
</script>
