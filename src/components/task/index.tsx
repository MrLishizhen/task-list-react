import styles from './index.module.less'
import React from 'react'
import Inputs from './input'
import Item from './item'
import TaskEmpty from "@/components/task/task_empty";
import Ring_progress from './ringProgress'
import {useState} from "react";
import {set_model_open} from '@/redux/home_model'
import {useAppDispatch, useAppSelector} from '@/redux/hook'

interface data_type {
    day: number,
    week: string,
    hot: boolean,
    week_str: string,
    month_day: string,
    list: task_list[]
}

interface task_list {
    title: string,
    hot_radio: boolean,
    id: number
}

const Task: React.FC<{ name: string, data: data_type }> = ({name, data}) => {
    const dispatch = useAppDispatch()
    const [task_list, set_task_list] = useState<task_list[]>([...data.list])
    const task_list_radio = (id: number) => {

        set_task_list([...task_list.map((u) => {
            if (u.id === id) {
                return {...u, hot_radio: !u.hot_radio}
            } else {
                return {...u}
            }
        })])
    }
    const task_list_content_click = (id: number): void => {
        const hot_list = task_list.find(u=>u.id===id);

        dispatch(set_model_open({
            model_open: true,
            hot_list,
            ...data
        }))
    }
    const hot_list = task_list.filter(u => u.hot_radio);
    const addChange = (e: any) => {
        if (e.charCode === 13) {

        }
    }
    return (
        <div className={styles.task_box}>
            <div className={styles.task_top}>
                <div className={styles.task_left}>
                    <div className={styles.task_left_week_top}>
                        <span className={styles.week}>{data.week_str}</span>
                        <span className={styles.quantity}>（{hot_list.length + '/' + task_list.length}）</span>
                        {
                            data.hot ? <span className={styles.today}>今天</span> : ''
                        }
                    </div>
                    <div className={styles.task_left_week_bom}>
                        {
                            data.month_day
                        }
                    </div>
                </div>
                <div className={styles.task_right}>
                    <Ring_progress key={data.week} percent={hot_list.length / task_list.length}/>
                </div>
            </div>
            <div className={styles.task_bom}>
                <Inputs onChange={addChange}/>
                <div className={styles.task_item_box}>
                    {
                        task_list && task_list.length > 0 ? task_list.map(u => {
                            return <Item key={u.id} task_list_content_click={task_list_content_click}
                                         onChange={task_list_radio} data={u}/>
                        }) : <TaskEmpty/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Task
