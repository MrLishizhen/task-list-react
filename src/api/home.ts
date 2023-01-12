import Axios from '@/util/http'

interface get_date_list {
    date_name: string, //天 | 周
    start_date: string,
    end_date: string
}

interface set_task_radio {
    id: number,
    task_radio: number
}

interface add_task {
    task_html:string,
    task_title:string
}

export function get_date_list(data: get_date_list) {
    return Axios({
        "url": '/home/get_date_list',
        "method": "POST",
        "data": data,
        "loading": false
    })
}

export function set_task_radio(data: set_task_radio) {
    return Axios({
        "url": '/home/set_task_radio',
        "method": "POST",
        "data": data,
        "loading": false
    })
}

export function add_task(data: add_task) {
    return Axios({
        "url": '/home/set_task_radio',
        "method": "POST",
        "data": data,
        "loading": false
    })
}
