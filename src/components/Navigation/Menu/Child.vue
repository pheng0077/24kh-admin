<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import type { IMenuData } from '~/types/Menu';

const route = useRoute();
defineProps<{ item: IMenuData, isExpanded: boolean }>()
const emits = defineEmits<{ (event: 'toggleExpand'): void }>()

</script>

<template>
    <NuxtLink @click="emits('toggleExpand')"
        class="cursor-pointer flex justify-start gap-6 items-center p-4 border border-transparent rounded hover:border-border hover:bg-gray-500/20 transition-colors duration-300">
        <component :is="item.icon" class="size-6" />
        <span class="w-full">{{ item.title }}</span>
        <ChevronDown class="size-5 transition-all duration-300" :class="{ '-rotate-180': isExpanded }" />
    </NuxtLink>
    <!-- Transition -->
    <transition-expand>
        <ul v-if="isExpanded" class="flex flex-col my-1 gap-1">
            <li v-for="(menu, index) in item.children" :key="index" class="w-full">
                <NuxtLink :to="item.path + menu.path"
                    class="flex justify-start gap-6 items-center p-3 border border-transparent rounded hover:border-border hover:bg-gray-500/20 transition-colors duration-300"
                    :class="{ 'bg-gray-500/20': route.path.startsWith(item.path + menu.path) }">
                    <component :is="menu.icon" class="size-5" />
                    <span class="ml-12">{{ menu.title }}</span>
                </NuxtLink>
            </li>
        </ul>
    </transition-expand>
</template>