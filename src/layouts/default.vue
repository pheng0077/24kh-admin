<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';

const breakpoints = useBreakpoints(breakpointsTailwind);
const isExpandedMenu = ref<boolean>(false);

onMounted(() => {
    if (breakpoints.isGreaterOrEqual('lg')) {
        isExpandedMenu.value = true;
    } else {
        isExpandedMenu.value = false;
    }
})

</script>

<template>
    <div class="p-4 h-screen flex gap-4">
        <transition-expand axis="x">
            <div v-show="isExpandedMenu" class="w-full max-w-sm border flex flex-col rounded p-4 pt-4 space-y-6">
                <!-- LOGO -->
                <div class="flex justify-center items-center h-16">
                    <span class="text-2xl font-bold">24<span class="text-yellow-600">KH</span></span>
                </div>
                <LazyNavigationMenu />
            </div>
        </transition-expand>
        <div class="flex flex-col gap-4 w-full">
            <LazyNavigationBar @toggle-menu="isExpandedMenu = !isExpandedMenu" />
            <div class="border rounded h-full overflow-auto flex flex-col p-10">
                <slot />
            </div>
        </div>
    </div>
</template>