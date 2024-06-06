<script setup lang="ts">

const route = useRoute()

// push name
definePageMeta({
    breadcrumb: [
        {
            name: 'Movies',
            path: '/movies/list',
        },
    ],
})

</script>

<template>
    <div>
        All Movie
    </div>
</template>