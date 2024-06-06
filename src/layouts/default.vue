<template>
    <div class="p-4 min-h-screen flex gap-4">
        <div class="max-w-sm w-full grow border flex flex-col rounded p-4 pt-4 space-y-6">
            <!-- LOGO -->
            <div class="flex justify-center items-center h-16">
                <span class="text-2xl font-bold">24<span class="text-yellow-600">KH</span></span>
            </div>
            <LazyNavigationMenu/>
        </div>
        <div class="flex flex-col gap-4 grow">
            <LazyNavigationBar />
            <div class="border rounded grow flex flex-col p-10">
                <slot />
            </div>
        </div>
    </div>
</template>