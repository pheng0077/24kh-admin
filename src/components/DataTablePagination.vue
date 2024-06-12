<script setup lang="ts">
import { type Table } from '@tanstack/vue-table'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRight, ChevronsRightIcon } from 'lucide-vue-next';

interface DataTablePaginationProps<T> {
    table: Table<T>
}
defineProps<DataTablePaginationProps<any>>()

</script>

<template>
    <div class="flex items-center justify-between px-2">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ table.getFilteredSelectedRowModel().rows.length }} of
            {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="flex items-center space-x-6 lg:space-x-8">
            <div class="flex items-center space-x-2">
                <p class="text-sm font-medium">
                    Rows per page
                </p>
                <UISelect :model-value="`${table.getState().pagination.pageSize}`"
                    @update:model-value="table.setPageSize">
                    <UISelectTrigger class="h-8 w-[70px]">
                        <UISelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
                    </UISelectTrigger>
                    <UISelectContent side="top">
                        <UISelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
                            {{ pageSize }}
                        </UISelectItem>
                    </UISelectContent>
                </UISelect>
            </div>
            <div class="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {{ table.getState().pagination.pageIndex + 1 }} of
                {{ table.getPageCount() }}
            </div>
            <div class="flex items-center space-x-2">
                <UIButton variant="outline" class="hidden w-8 h-8 p-0 lg:flex" :disabled="!table.getCanPreviousPage()"
                    @click="table.setPageIndex(0)">
                    <span class="sr-only">Go to first page</span>
                    <ChevronsLeftIcon class="w-4 h-4" />
                </UIButton>
                <UIButton variant="outline" class="w-8 h-8 p-0" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                    <span class="sr-only">Go to previous page</span>
                    <ChevronLeftIcon class="w-4 h-4" />
                </UIButton>
                <UIButton variant="outline" class="w-8 h-8 p-0" :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()">
                    <span class="sr-only">Go to next page</span>
                    <ChevronRightIcon class="w-4 h-4" />
                </UIButton>
                <UIButton variant="outline" class="hidden w-8 h-8 p-0 lg:flex" :disabled="!table.getCanNextPage()"
                    @click="table.setPageIndex(table.getPageCount() - 1)">
                    <span class="sr-only">Go to last page</span>
                    <ChevronsRightIcon class="w-4 h-4" />
                </UIButton>
            </div>
        </div>
    </div>
</template>