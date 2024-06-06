<script setup lang="ts">

const route = useRoute('countries')

console.log("route", route);

definePageMeta({
    breadcrumb: [
        {
            name: 'Countries',
            path: '/countries',
        },
        {
            name: 'Create',
            path: '/countries/create',
        },
    ],
})

</script>

<template>
    <div>
        Create Country
    </div>
</template>