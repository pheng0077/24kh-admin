<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Loader2 } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { useToast } from '~/components/ui/toast';
import type { ICountry } from '~/types/Country';

const modal = defineModel<boolean>();
const emits = defineEmits<{
    (event: 'onUpdated', value: ICountry): ICountry,
    (event: 'onDeleted', value: string): string,
}>();
const { country } = defineProps<{ country: ICountry }>();

const { toast } = useToast();
const countryComp = useCountry();
const loadingDel = ref<boolean>(false);
const loadingUpdate = ref<boolean>(false);

const onDeleted = async () => {
    loadingDel.value = true;
    const resp = await countryComp.remove(country.id);
    if (resp.statusCode === 200) {
        toast({
            title: 'Success',
            description: resp.message,
            variant: 'default',
            duration: 5000,
        });
        emits('onDeleted', country.id);
        modal.value = false;
    } else {
        toast({
            title: 'Error',
            description: resp.message,
            variant: 'destructive',
            duration: 5000,
        });
    }
    loadingDel.value = false;
}


// FORM
const schema = toTypedSchema(z.object({
    nameEn: z.string().min(3, 'Country nameEn must be at least 2 characters').default(country.nameEn),
    nameKh: z.string().min(3, 'Country nameKh must be at least 2 characters').default(country.nameKh),
    slug: z.string().min(2, 'Country ISO must be at least 2 characters').max(2, 'Country ISO must be at most 2 characters').default(country.slug),
}));

const form = useForm({
    validationSchema: schema,
})

const onSubmit = form.handleSubmit(async (values) => {
    loadingUpdate.value = true;
    const resp = await countryComp.update(country.id, values);
    if (resp.statusCode === 200) {
        toast({
            title: 'Success',
            description: resp.message,
            variant: 'default',
            duration: 5000,
        });
        emits('onUpdated', resp.data)
        modal.value = false;
    } else {
        toast({
            title: 'Error',
            description: resp.message,
            variant: 'destructive',
            duration: 5000,
        });
    }
    loadingUpdate.value = false;
})

</script>

<template>
    <UIDialog v-model:open="modal">
        <UIDialogContent>
            <UIDialogHeader>
                <UIDialogTitle>Update or Delete</UIDialogTitle>
                <UIDialogDescription>Country name and slug should be unique.</UIDialogDescription>
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
                    <UIFormField v-slot="{ componentField }" name="slug">
                        <UIFormItem>
                            <UIFormLabel>Country ISO</UIFormLabel>
                            <UIFormControl>
                                <UIInput type="text" placeholder="ISO code" v-bind="componentField" />
                            </UIFormControl>
                            <UIFormDescription>
                                ISO:
                                <a href="https://countrycode.org/" target="_blank"
                                    class="hover:underline">countrycode.org</a>
                            </UIFormDescription>
                            <UIFormMessage />
                        </UIFormItem>
                    </UIFormField>
                </div>
                <!-- Form Action -->
                <UIDialogFooter class="gap-2 flex max-md:!flex-col">
                    <UIButton variant="secondary" type="button" @click="modal = false">Cancel</UIButton>
                    <UIButton variant="destructive" type="button" @click="onDeleted" :disabled="loadingDel">
                        <span v-if="loadingDel" class="flex items-center gap-2">
                            <Loader2 class="size-4 mr-2 animate-spin" />
                            Deleting...
                        </span>
                        <span v-else>Delete</span>
                    </UIButton>
                    <UIButton variant="default" type="submit" :disabled="loadingUpdate">
                        <span v-if="loadingUpdate" class="flex items-center gap-2">
                            <Loader2 class="size-4 mr-2 animate-spin" />
                            Updating...
                        </span>
                        <span v-else>Update</span>
                    </UIButton>
                </UIDialogFooter>
            </form>

        </UIDialogContent>
    </UIDialog>
</template>