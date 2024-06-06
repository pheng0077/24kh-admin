<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { useToast } from '../ui/toast'
import { Loader2 } from 'lucide-vue-next'

const { toast } = useToast()
const { login } = useAuth()
const loading = ref<boolean>(false)
const router = useRouter()

const formSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
}))

const { handleSubmit } = useForm({
    validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
    loading.value = true

    const resp = await login({
        email: values.email,
        password: values.password,
    })

    toast({
        title: resp.statusCode === 200 ? 'Success' : 'Error',
        description: resp.message,
        variant: resp.statusCode === 200 ? 'default' : 'destructive',
        duration: 5000,
    })

    loading.value = false
    if (resp.statusCode === 200) {
        router.push('/')
    }
})
</script>

<template>
    <UICard class="">
        <UICardHeader class="text-center">
            <UICardTitle>Admin Login</UICardTitle>
            <UICardDescription>Welcome Back!</UICardDescription>
        </UICardHeader>
        <UICardContent>
            <form class="space-y-6" @submit="onSubmit" autocomplete="off">
                <UIFormField v-slot="{ componentField }" name="email">
                    <UIFormItem v-auto-animate>
                        <UIFormLabel>Email</UIFormLabel>
                        <UIFormControl>
                            <UIInput type="text" placeholder="Email" v-bind="componentField" autofocus
                                autocomplete="off" />
                        </UIFormControl>
                        <UIFormMessage class="text-sm" />
                    </UIFormItem>
                </UIFormField>
                <UIFormField v-slot="{ componentField }" name="password">
                    <UIFormItem v-auto-animate>
                        <UIFormLabel>Password</UIFormLabel>
                        <UIFormControl>
                            <UIInput type="password" placeholder="Password" v-bind="componentField" autocomplete="off" />
                        </UIFormControl>
                        <UIFormMessage class="text-sm" />
                    </UIFormItem>
                </UIFormField>
                <UIButton type="submit" variant="outline" size="default" :disabled="loading">
                    <span v-if="loading" class="flex whitespace-nowrap items-center">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                        Logging in...
                    </span>
                    <span v-else>Login</span>
                </UIButton>
            </form>
        </UICardContent>
    </UICard>
</template>