<script setup lang="ts">
const route = useRoute()

// Capitalize the first letter of the route name
const routeName = computed(() => {
    const name = route.name ? route.name.charAt(0).toUpperCase() + route.name.slice(1) : ''
    // split the name by '-' 
    return name.split('-').join(' ')
})

watchEffect(() => {
    if (route.path) {
        useHead({
            titleTemplate: (titleChunk) => {
                return titleChunk ? `${titleChunk} - 24Kh` : routeName.value + ' - 24Kh'
            }
        })
    }
})

</script>


<template>
    <NuxtLayout>
        <NuxtLoadingIndicator />
        <NuxtPage />
    </NuxtLayout>
    <UIToaster />
</template>