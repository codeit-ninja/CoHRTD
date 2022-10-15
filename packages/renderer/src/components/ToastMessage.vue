<template>
    <div class="toast-container">
        <div 
            v-for="(toast, i) in toasts" 
            :id="`toast-${i}`"
            :key="`toast-${i}`"
            :class="{
                'toast-info': toast.type === 'info',
                'toast-success': toast.type === 'success',
                'toast-warning': toast.type === 'warning',
                'toast-danger': toast.type === 'danger'
            }"
            class="toast" 
            role="alert" 
            ria-live="assertive" 
            aria-atomic="true"
        >
            <div class="d-flex">
                <div class="toast-body">
                    {{ toast.message }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { toasts } from 'store/toasts';
    import { watch } from 'vue';
    import { Toast } from 'bootstrap';
    
    watch(toasts, (newValue) => {
        setTimeout(() => {
            const toast = document.getElementById(`toast-${newValue.length - 1}`);

            if( ! toast ) return;

            new Toast(toast, { autohide: false, animation: false }).show()
        })

        setTimeout(() => toasts.shift(), 5000)
    })
</script>