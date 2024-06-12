<script setup lang="ts" generic="TData, TValue">
import type { ICategory, ICategoryQuery } from '~/types/Category';
import { createColumnHelper, FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { ColumnDef, Table } from '@tanstack/vue-table';
import Checkbox from '~/components/ui/checkbox/Checkbox.vue';
import { MoreHorizontal } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/toast';
import DropDown from './DropDown.vue';
import CreateCategory from '../_create/index.vue'

const category = useCategory();

const props = defineProps<{
    // columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const selectedCategory = ref<ICategory[]>([]);

const { toast } = useToast();

const modalDeleteSelectedList = defineModel<boolean>();

const queryCategories = ref<ICategoryQuery>({
    page: 1,
    limit: 100,
    keyword: '',
    sortBy: 'nameEn',
    orderBy: 'asc'
})

const clearFilter = () => {
    queryCategories.value.keyword = '';
}

const columns: ColumnDef<TData>[] = [
    {
        id: 'select',
        header: ({ table }) => h(Checkbox, {
            'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
            'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
            'ariaLabel': 'Select all',
        }),
        cell: ({ row }) => h(Checkbox, {
            'checked': row.getIsSelected(),
            'onUpdate:checked': value => row.toggleSelected(!!value),
            'ariaLabel': 'Select row',
        }),
        // enableSorting: false,
        // enableHiding: false,
    },
    {
        accessorKey: 'nameEn',
        header: 'Name EN',
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('nameEn'))
    },
    {
        accessorKey: 'nameKh',
        header: 'Name KH',
        // header: ({ column }) => {
        //     return h(Button, {
        //         variant: 'ghost',
        //         onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        //     }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        // },
        cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('nameKh')),
    },
    {
        id: 'actions',
        header: ({ column }) => {
            if (table.getFilteredSelectedRowModel().rows.length > 1) {
                // selectedCategory.value = table.getFilteredSelectedRowModel().rows.map(row => row.original);
                return h('div', { class: 'relative text-right' }, h(Button, {
                    variant: 'destructive',
                    size: 'xs',
                    onClick: () => modalDeleteSelectedList.value = true,
                }, 'Delete Selected'))
            }
        },
        cell: ({ row }) => {
            const category = row.original

            // return h('div', { class: 'relative text-right' }, h(DropDown, {
            //     category,
            //     onDeleted: () => deleteOne(category),
            // }))
        },
    },
]

const deleteOne = async (item: ICategory) => {
    // const resp = await category.remove(item.id);
    // if (resp.statusCode === 200) {
    //     categoryList.value = categoryList.value.filter((category) => category.id !== item.id);
    //     filterCategories.value = filterCategories.value.filter((category) => category.id !== item.id);
    //     toast({
    //         title: 'Success',
    //         description: resp.message,
    //         variant: 'default',
    //         duration: 5000,
    //     });
    // } else {
    //     toast({
    //         title: 'Error',
    //         description: resp.message,
    //         variant: 'destructive',
    //         duration: 5000,
    //     });
    // }
}

const onDeleteSelected = () => {

}

const table = useVueTable({
    data: props.data,
    get columns() { return columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel({ initialSync: true, }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
        pagination: {
            pageSize: 10,
            pageIndex: 0,
        },
    },

})
const onCategorySuccess = (category: ICategory) => {
    // categoryList.value = [category, ...categoryList.value];
}

watchEffect(() => {
    // get the selected rows
    // selectedCategory.value = table.getFilteredSelectedRowModel().rows.map(row => row.original);
})

</script>

<template>
    <div class="flex gap-2 justify-between items-center pb-4">
        <UIInput class="max-w-sm" placeholder="Filter name..."
            :model-value="table.getColumn('nameEn')?.getFilterValue() as string"
            @update:model-value=" table.getColumn('nameEn')?.setFilterValue($event)" />
        <CreateCategory @on-success="onCategorySuccess" />
    </div>
    <div class="rounded-md border overflow-auto mb-6">
        <UITable>
            <UITableHeader>
                <UITableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <UITableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </UITableHead>
                </UITableRow>
            </UITableHeader>
            <UITableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <UITableRow v-for="row in table.getRowModel().rows" :key="row.id"
                        :data-state="row.getIsSelected() && 'selected'">
                        <UITableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </UITableCell>
                    </UITableRow>
                </template>

                <UITableRow v-else>
                    <UITableCell :colspan="columns.length" class="h-24 text-center">
                        No results.
                    </UITableCell>
                </UITableRow>
            </UITableBody>
        </UITable>
    </div>
    <DataTablePagination :table="table" />
    <ModalConfirmDelete v-model="modalDeleteSelectedList" title="Delete Selected Categories"
        @on-confirm="onDeleteSelected" description="Are you about to delete these selected items?" variant="danger" />
</template>