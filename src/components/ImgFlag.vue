<script setup lang="ts">

const { width = 24, heigh = 24 } = defineProps<{ width?: number | string, heigh?: string | number, slug: string }>()

</script>

<template>
    <!-- Reference => https://nucleoapp.com/svg-flag-icons -->
    <NuxtImg :src="`/icons/flags/${slug}.svg`" :alt="slug" :width="width" :height="heigh" placeholder />
</template>