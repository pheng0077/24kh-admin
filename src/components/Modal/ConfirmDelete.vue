<script setup lang="ts">

const modal = defineModel<boolean>();
withDefaults(defineProps<{ title: string, description: string, variant?: 'default' | 'danger', buttonText?: string }>(), {
    variant: 'default',
    buttonText: 'Confirm',
})

// console.log("Text", buttonText);
// console.log("variant", variant);
// console.log("rest", rest);

const emits = defineEmits<{
    (event: 'onConfirm'): string,
}>()

</script>

<template>
    <UIDialog v-model:open="modal">
        <UIDialogContent class="sm:max-w-[425px]">
            <UIDialogHeader>
                <UIDialogTitle></UIDialogTitle>
                <UIDialogDescription>{{ title }}</UIDialogDescription>
            </UIDialogHeader>
            <div class="grid gap-4 py-4">
                <p>{{ description }}</p>
            </div>
            <UIDialogFooter>
                <UIButton type="button" @click="modal = false" variant="ghost">
                    Cancel
                </UIButton>
                <UIButton @click="emits('onConfirm')" :variant="variant == 'default' ? 'default' : 'destructive'">
                    {{ buttonText }}
                </UIButton>
            </UIDialogFooter>
        </UIDialogContent>
    </UIDialog>
</template>