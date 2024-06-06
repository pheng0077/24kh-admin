export interface IMenuData {
    title: string;
    path: string;
    icon?: Component;
    children?: IMenuData[];
}