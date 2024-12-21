export interface TableColumn{
    data: string;
    title: string;
    name: string;
    render?: Function;
    visible?: boolean;
    className?: string;
    orderable?: boolean;
    searchable?: boolean;
    width?: string;
    type?: 'image' | 'text';
    defaultContent?: string;
    rowDatas?: any[];
}