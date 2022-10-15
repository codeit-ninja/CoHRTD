<template>
    <div class="container mx-auto d-flex flex-column justify-content-center">
        <div class="d-flex flex-column align-items-center">
            <div class="col-12 col-md-6 col-lg-4">
                <form
                    id="configuration-form"
                    @submit.prevent="actions.updateSettings"
                >
                    <header class="mb-5 text-center">
                        <h1>Configuration</h1>
                    </header>
                    <label
                        for="warnings-path"
                        class="form-label"
                        >Warnings.log path</label
                    >
                    <div class="mb-3 input-group">
                        <input
                            id="warnings-path"
                            v-model="settings.logPath"
                            type="text"
                            class="form-control"
                            placeholder="C:\Users\[username]\Documents\My Games\Company of Heroes Relaunch\warnings.log"
                        />
                        <button
                            class="btn btn-secondary"
                            type="button"
                            @click="selectLogFile"
                            >Select</button
                        >
                    </div>
                    <label
                        for="steam-id"
                        class="form-label"
                        >Steam ID</label
                    >
                    <div class="mb-3">
                        <input
                            id="steam-id"
                            v-model="settings.steamId"
                            type="text"
                            class="form-control"
                            placeholder="76561199210795903"
                        />
                    </div>
                    <div class="mb-3 text-end">
                        <button
                            :disabled="state.isProcessing"
                            role="submit"
                            class="btn btn-primary d-flex align-items-center justify-content-center gap-2 w-100"
                        >
                            <span
                                v-if="state.isProcessing"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            <span>Save configuration</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {settings, actions, state} from 'store/settings';

const selectLogFile = async () => {
    console.log('Select file');
};
</script>
