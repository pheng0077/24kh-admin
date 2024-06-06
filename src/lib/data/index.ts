import { Clapperboard, Flag, Home, LayoutDashboard, ListTree, Settings } from "lucide-vue-next";
import type { IMenuData } from "~/types/Menu";

const MenuData: IMenuData[] = [
    {
        title: 'Home',
        path: '/home',
        icon: Home,
    },
    {
        title: "Movies",
        path: "/movies",
        icon: Clapperboard,
        children: [
            {
                title: "All Movies",
                path: "/list"
            },
            {
                title: "Series",
                path: "/series",
            },
            {
                title: "Create",
                path: "/create",
            }
        ]
    },
    {
        title: 'Categories',
        path: '/categories',
        icon: ListTree
    },
    {
        title: "Countries",
        path: "/countries",
        icon: Flag
    }
]


const MenuUtilsData: IMenuData[] = [
    {
        title: "Settings",
        path: "/settings",
        icon: Settings
    }
];

export { MenuData, MenuUtilsData };