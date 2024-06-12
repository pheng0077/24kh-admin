<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import type { ICategory } from '~/types/Category';

const modaleDetele = defineModel<boolean>();
const emits = defineEmits<{
    (event: 'deleted', value: string): string,
    (event: 'updated', value: ICategory): ICategory
}>();
const { category } = defineProps<{ category: ICategory }>();

const handleDelete = () => {
    emits('deleted', category.id);
    modaleDetele.value = false;
}

</script>

<template>
    <UIDropdownMenu>
        <UIDropdownMenuTrigger as-child>
            <UIButton variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="w-4 h-4" />
            </UIButton>
        </UIDropdownMenuTrigger>
        <UIDropdownMenuContent align="end">
            <UIDropdownMenuItem @click="emits('updated', category)">Update</UIDropdownMenuItem>
            <UIDropdownMenuSeparator />
            <UIDropdownMenuItem @click="modaleDetele = true">Delete</UIDropdownMenuItem>
        </UIDropdownMenuContent>
    </UIDropdownMenu>
    <ModalConfirmDelete description="Are you about to delete this categroy?" v-model="modaleDetele"
        title="Delete Category" variant="danger" @on-confirm="handleDelete" button-text="Delee" />
</template>