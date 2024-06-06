<script setup lang="ts">

const { width = 24, heigh = 24 } = defineProps<{ width?: number | string, heigh?: string | number, countryName: string }>()

</script>

<template>
    <!-- Reference => https://nucleoapp.com/svg-flag-icons -->
    <NuxtImg :src="`/icons/flags/${countryName}.svg`" :alt="countryName" :width="width" :height="heigh" placeholder
        loading="lazy" />
</template>