<script setup lang="ts">
import { AlignLeft, Loader2 } from 'lucide-vue-next';
import { useToast } from '../ui/toast';

const { logout } = useAuth();
const { toast } = useToast();
const store = userStore();

const loading = ref<boolean>(false);
const router = useRouter();
const route = useRoute();

// Emits
const emits = defineEmits<{
    (event: 'toggleMenu'): boolean,
}>();

const handleLogout = async () => {
    loading.value = true;
    const resp = await logout();
    toast({
        title: resp.statusCode === 200 ? 'Success' : 'Error',
        description: resp.message,
        variant: resp.statusCode === 200 ? 'default' : 'destructive',
        duration: 5000,
    });

    loading.value = false;
    if (resp.statusCode === 200) {
        router.push('/auth/login')
    }
}

type CastIemType = { name: string, path: string }[]

const castItem = (item: any): CastIemType => {
    return item as CastIemType
}

</script>

<template>
    <div class="flex justify-between items-center border rounded p-4">
        <div class="flex items-center gap-10">
            <!-- Menu Icon -->
            <UIButton variant="outline" size="icon" @click="emits('toggleMenu')">
                <AlignLeft />
            </UIButton>

            <!-- Breadscrumbs -->
            <UIBreadcrumb>
                <UIBreadcrumbList>
                    <template v-for="(menu, index) in castItem(route.meta?.breadcrumb)" :key="index">
                        <UIBreadcrumbItem v-if="index <= route.matched.length">
                            <UIBreadcrumbLink as-child>
                                <NuxtLink :to="menu?.path" class="capitalize">{{ menu?.name }}</NuxtLink>
                            </UIBreadcrumbLink>
                        </UIBreadcrumbItem>
                        <UIBreadcrumbSeparator v-if="index < castItem(route.meta?.breadcrumb).length - 1" />
                    </template>
                </UIBreadcrumbList>
            </UIBreadcrumb>
        </div>
        <!-- Menu Items -->
        <div class="flex items-center space-x-4">
            <span>{{ store.credentials?.name }}</span>
            <UIButton @click="handleLogout" variant="secondary" :disabled="loading">
                <span v-if="loading" class="whitespace-nowrap flex">
                    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                    Logging Out...
                </span>
                <span v-else class="text-red-500">Log Out</span>
            </UIButton>
        </div>
    </div>
</template>