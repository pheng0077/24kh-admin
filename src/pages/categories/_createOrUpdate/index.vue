<script setup lang="ts">
import { Loader2, PlusIcon, Search, X } from 'lucide-vue-next';
import type { ICountry, ICountryQuery } from '~/types/Country';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useToast } from '~/components/ui/toast';
import type { ICategory } from '~/types/Category';

// Toast
const { toast } = useToast();

// Emits
const emits = defineEmits<{ (event: 'onSuccess', value: ICategory): ICategory }>();
const { item } = defineProps<{ item?: ICategory }>()

const category = useCategory();
const loadingAddCountry = ref<boolean>(false);
const modal = defineModel<boolean>();

// FORM
const schema = toTypedSchema(z.object({
    nameEn: z.string().min(3, 'Category nameEn must be at least 2 characters'),
    nameKh: z.string().min(3, 'Category nameKh must be at least 2 characters')
}));

const form = useForm({
    validationSchema: schema,
    keepValuesOnUnmount: item ? false : true,
    initialValues: {
        nameEn: item?.nameEn || '',
        nameKh: item?.nameKh || ''
    },
})

const onSubmit = form.handleSubmit(async (values) => {
    loadingAddCountry.value = true;
    let resp;
    if (item) {
        resp = await category.update(item.id, values);
    } else {
        resp = await category.create(values);
    }

    if (resp.statusCode === (item ? 200 : 201)) {
        loadingAddCountry.value = false;
        toast({
            title: 'Success',
            description: resp.message,
            variant: 'default',
            duration: 5000,
        });
        // Emit the event onSuccess to parent component
        emits('onSuccess', resp.data);
    } else {
        toast({
            title: 'Error',
            description: resp.message,
            variant: 'destructive',
            duration: 5000,
        });
        loadingAddCountry.value = false;
    }

    item ? modal.value = false : (form.resetForm(), modal.value = false);
})

</script>

<template>
    <UIDialog v-model:open="modal">
        <UIDialogTrigger as-child v-if="!item">
            <UIButton variant="outline" class="flex items-center gap-2 max-md:w-full">
                <PlusIcon class="h-5 w-5" />
                Add Category
            </UIButton>
        </UIDialogTrigger>
        <UIDialogContent class="sm:max-w-[425px]">
            <UIDialogHeader>
                <UIDialogTitle>{{ item ? 'Update Category' : 'Add New Category' }}</UIDialogTitle>
                <UIDialogDescription>
                    Category name and slug should be unique.
                </UIDialogDescription>
            </UIDialogHeader>
            <form class="space-y-10 mt-6" @submit="onSubmit" @error="console.log($event)">
                <!-- Form Body -->
                <div class="space-y-6">
                    <UIFormField v-slot="{ componentField }" name="nameEn">
                        <UIFormItem>
                            <UIFormLabel>NameEn</UIFormLabel>
                            <UIFormControl>
                                <UIInput type="text" placeholder="NameEn" v-bind="componentField" />
                            </UIFormControl>
                            <UIFormMessage />
                        </UIFormItem>
                    </UIFormField>
                    <UIFormField v-slot="{ componentField }" name="nameKh">
                        <UIFormItem>
                            <UIFormLabel>NameKh</UIFormLabel>
                            <UIFormControl>
                                <UIInput type="text" placeholder="NameKh" v-bind="componentField" />
                            </UIFormControl>
                            <UIFormMessage />
                        </UIFormItem>
                    </UIFormField>
                </div>
                <!-- Form Action -->
                <div class="flex justify-end items-center gap-2">
                    <UIButton v-if="item" type="button" class="w-full" variant="ghost" @click="modal = false">
                        Cancel
                    </UIButton>
                    <UIButton type="submit" class="w-full" :disabled="loadingAddCountry">
                        <span v-if="loadingAddCountry" class="flex items-center gap-2">
                            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                            {{ item ? 'Updating...' : 'Creating...' }}
                        </span>
                        <span v-else>{{ item ? 'Update' : 'Create' }}</span>
                    </UIButton>
                </div>
            </form>
        </UIDialogContent>
    </UIDialog>
</template>