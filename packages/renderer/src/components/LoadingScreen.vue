<template>
    <div class="loading-screen position-absolute vh-100 vw-100 top-0 start-0 d-flex flex-column align-items-center justify-content-center bg-dark">
        <svg id="triangle" width="100px" height="100px" viewBox="-3 -4 39 39">
            <polygon fill="transparent" stroke="#333333" stroke-width="1" points="16,0 32,32 0,32"></polygon>
        </svg>
        <small class="text-muted mt-3">Loading application ...</small>
    </div>
</template>
<style lang="scss">
.loading-screen {
    z-index: 1100;
}

svg {
    transform-origin: 50% 65%;
}

svg polygon {
    stroke-dasharray: 17;
	animation: dash 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
}


@keyframes dash {
    to {
        stroke-dashoffset: 136;
    }
}
	
@keyframes rotate {
    100% {
        transform: rotate(360deg );
    }
}
</style>