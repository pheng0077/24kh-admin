<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next';
import { cn } from '~/lib/utils';
import type { ClassNameValue } from 'tailwind-merge';

const colorMode = useColorMode()

defineProps<{
    className?: ClassNameValue
}>()

</script>

<template>
    <UIDropdownMenu>
        <UIDropdownMenuTrigger as-child>
            <UIButton variant="outline" :class="cn(className)">
                <Moon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Sun
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span class="sr-only">Toggle theme</span>
            </UIButton>
        </UIDropdownMenuTrigger>
        <UIDropdownMenuContent align="end">
            <UIDropdownMenuItem @click="colorMode.preference = 'light'">
                Light
            </UIDropdownMenuItem>
            <UIDropdownMenuItem @click="colorMode.preference = 'dark'">
                Dark
            </UIDropdownMenuItem>
            <UIDropdownMenuItem @click="colorMode.preference = 'system'">
                System
            </UIDropdownMenuItem>
        </UIDropdownMenuContent>
    </UIDropdownMenu>
</template>