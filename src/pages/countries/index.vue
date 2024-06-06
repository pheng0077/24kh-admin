<script setup lang="ts">
import { PlusIcon } from 'lucide-vue-next';
import type { ICountryDetail, IQueryCountry } from '~/types/Country';

definePageMeta({
    breadcrumb: [
        {
            name: 'Countries',
            path: '/countries',
        },
    ],
});

const country = useCountry();
const countryList = ref<ICountryDetail[]>([]);

const queryCountries = ref<IQueryCountry>({
    page: 1,
    limit: 100,
    keyword: '',
    sortBy: 'nameEn',
    orderBy: 'asc'
});


onMounted(async () => {
    const resp = await country.getAll(queryCountries.value);
    if (resp.statusCode === 200) {
        countryList.value = resp.data;
    }
});


</script>

<template>
    <div class="flex flex-col gap-10">
        <!-- Header -->
        <div class="flex justify-between">
            <h2 class="font-medium">Available Countries</h2>
            <UIButton variant="outline" class="flex items-center gap-2">
                <PlusIcon class="h-5 w-5" />
                Add Country
            </UIButton>
        </div>
        <!-- Content -->
        <ul class="flex flex-wrap gap-10">
            <li v-for="(country, index) in countryList" :key="index" class="flex flex-col text-left">
                <ImgFlag width="128" heigh="128" :country-name="country.slug" />
                <h3 class="ml-2">{{ country.nameEn }}</h3>
            </li>
        </ul>

    </div>
</template>