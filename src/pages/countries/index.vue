<script setup lang="ts">
import type { ICountry, ICountryQuery } from '~/types/Country';
import CreateCountry from "./_create/index.vue"
import UpdateOrDelete from "./_updateOrDelete/index.vue"
import { X } from 'lucide-vue-next';

definePageMeta({
    breadcrumb: [
        {
            name: 'Countries',
            path: '/countries',
        },
    ],
});

const country = useCountry();
const countryList = ref<ICountry[]>([]);
const filterCountries = ref<ICountry[]>([]);
const selectedCountry = ref<ICountry>();

const modelUpdateOrDelete = ref<boolean>(false);


const queryCountries = ref<ICountryQuery>({
    page: 1,
    limit: 300,
    keyword: '',
    sortBy: 'nameEn',
    orderBy: 'asc'
});


onMounted(async () => {
    const resp = await country.getAll(queryCountries.value);
    if (resp.statusCode === 200) {
        countryList.value = resp.data;
        filterCountries.value = resp.data;
    }
});

watchEffect(() => {
    filterCountries.value = countryList.value.filter((country) => {
        if (!queryCountries.value.keyword) return true;
        return country.nameEn.toLowerCase().includes(queryCountries.value.keyword.toLowerCase());
    });
});

const clearFilter = () => {
    queryCountries.value.keyword = '';
};

const onSuccess = (value: ICountry) => {
    countryList.value.unshift(value);
    if (queryCountries.value.keyword) {
        filterCountries.value.unshift(value);
    }
};

const onSelectedCountry = (country: ICountry) => {
    selectedCountry.value = country;
    modelUpdateOrDelete.value = true;
};

watchEffect(() => {
    if (!modelUpdateOrDelete.value) {
        selectedCountry.value = undefined;
    }
});

const onDeleted = (id: string) => {
    countryList.value = countryList.value.filter((country) => country.id !== id);
    filterCountries.value = filterCountries.value.filter((country) => country.id !== id);
};

const onUpdated = (value: ICountry) => {
    const index = countryList.value.findIndex((country) => country.id === value.id);
    if (index !== -1) {
        countryList.value[index] = value;
    }
    const filterIndex = filterCountries.value.findIndex((country) => country.id === value.id);
    if (filterIndex !== -1) {
        filterCountries.value[filterIndex] = value;
    }
};

</script>

<template>
    <div class="flex flex-col gap-10">
        <!-- Header -->
        <div class="flex max-md:flex-col-reverse justify-between items-center gap-6">
            <h3 class="text-xl text-nowrap max-lg:hidden">Available Countries</h3>
            <div class="relative w-full max-w-sm items-center">
                <UIInput v-model="queryCountries.keyword" placeholder="Search country" class="w-full max-w-sm pr-10" />
                <span @click="clearFilter"
                    class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                    <X v-if="queryCountries.keyword" class="size-4 text-muted-foreground hover:text-white transition-colors" />
                </span>
            </div>
            <!-- Create New Country Dialog -->
            <CreateCountry @on-success="onSuccess" />
        </div>
        <!-- Content -->
        <ul>
            <transition-fade group
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-10">
                <li v-for="(country, index) in filterCountries" :key="country.slug"
                    class="flex flex-col text-left hover:opacity-80 cursor-pointer transition-all"
                    @click="onSelectedCountry(country)">
                    <ImgFlag :slug="country.slug" />
                    <h3 class="ml-2">{{ country.nameEn }}</h3>
                </li>
            </transition-fade>
        </ul>

        <!-- Update or Delete Country -->
        <UpdateOrDelete v-if="selectedCountry" v-model="modelUpdateOrDelete" :country="selectedCountry"
            @on-deleted="onDeleted" @on-updated="onUpdated" />
    </div>
</template>