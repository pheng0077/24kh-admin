<script setup lang="ts">
import { Loader2, PlusIcon, Search, X } from 'lucide-vue-next';
import type { ICountry, ICountryQuery } from '~/types/Country';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useToast } from '~/components/ui/toast';

// Toast
const { toast } = useToast();

// Emits
const emits = defineEmits<{ (event: 'onSuccess', value: ICountry): ICountry }>();

const country = useCountry();
const loadingAddCountry = ref<boolean>(false);
const dialogModal = ref<boolean>(false);

// FORM
const schema = toTypedSchema(z.object({
    nameEn: z.string().min(3, 'Country nameEn must be at least 2 characters'),
    nameKh: z.string().min(3, 'Country nameKh must be at least 2 characters'),
    slug: z.string().min(2, 'Country ISO must be at least 2 characters').max(2, 'Country ISO must be at most 2 characters'),
}));

const form = useForm({
    validationSchema: schema,
    keepValuesOnUnmount: true,
})

const onSubmit = form.handleSubmit(async (values) => {
    loadingAddCountry.value = true;
    const resp = await country.create(values);
    if (resp.statusCode === 201) {
        dialogModal.value = false;
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
})

</script>

<template>
    <UIDialog v-model:open="dialogModal">
        <UIDialogTrigger as-child>
            <UIButton variant="outline" class="flex items-center gap-2 max-md:w-full">
                <PlusIcon class="h-5 w-5" />
                Add Country
            </UIButton>
        </UIDialogTrigger>
        <UIDialogContent class="sm:max-w-[425px]">
            <UIDialogHeader>
                <UIDialogTitle>Add New Country</UIDialogTitle>
                <UIDialogDescription>
                    Country name and slug should be unique.
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
                <!-- <UIDialogClose as-child> -->
                <UIButton type="submit" class="w-full" :disabled="loadingAddCountry">
                    <span v-if="loadingAddCountry" class="flex items-center gap-2">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                    </span>
                    <span v-else>Submit</span>
                </UIButton>
                <!-- </UIDialogClose> -->
            </form>
        </UIDialogContent>
    </UIDialog>
</template>