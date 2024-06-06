<script setup lang="ts">

useHead({
    title: 'Create movie',
})

definePageMeta({
    breadcrumb: [
        {
            name: 'Movies',
            path: '/movies/list',
        },
        {
            name: 'Create Movie',
            path: '/movies/create',
        },
    ],
})

</script>

<template>
    <div>
        Create Movie
    </div>
</template>