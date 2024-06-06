<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu';
import { MenuData, MenuUtilsData } from '~/lib/data';

const route = useRoute();
const isExpanded = ref<number>(-1);
const settings = MenuUtilsData[0];

// check the active route on page reload
onMounted(() => {
    const index = MenuData.findIndex((menu) => route.path.startsWith(menu.path));
    if (index !== -1) {
        isExpanded.value = index;
    }
}); 

</script>

<template>
    <div class="flex flex-col grow justify-between">
        <ul class="w-full flex flex-col gap-1">
            <li v-for="(menu, index) in MenuData" :key="index" class="w-full">
                <NuxtLink v-if="!menu.children" :to="menu.path"
                    class="flex justify-start gap-6 items-center p-4 border border-transparent rounded hover:border-border hover:bg-gray-500/20 transition-colors duration-300"
                    :class="{ 'bg-gray-500/20': route.path.startsWith(menu.path) }">
                    <component :is="menu.icon" class="size-5" />
                    <span class="">{{ menu.title }}</span>
                </NuxtLink>
                <!-- If the menu have children -->
                <NavigationMenuChild v-else :item="menu" :isExpanded="isExpanded === index"
                    @toggleExpand="isExpanded = isExpanded === index ? -1 : index" />
            </li>
        </ul>
        <div class="flex gap-4">
            <NuxtLink :to="settings.path"
                class="flex justify-start gap-6 w-full items-center p-4 border rounded hover:border-border hover:bg-gray-500/20 transition-colors duration-300"
                :class="{ 'bg-gray-500/20': route.path.startsWith(settings.path) }">
                <component :is="settings.icon" class="size-5" />
                <span class="">{{ settings.title }}</span>
            </NuxtLink>
            <ToogleDarkMode class-name="h-full" />
        </div>
    </div>
</template>