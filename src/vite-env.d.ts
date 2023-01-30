/// <reference types="vite/client" />
interface task_list {
    title: string,
    hot_radio: boolean,
    id: number | string
}

interface data_type {
    day: number,
    week: string,
    hot: boolean,
    week_str: string,
    month_day: string,
    list: task_list[]
}
