import styles from './index.module.less'
import React from 'react'
import Inputs from './input'
import Item from './item'
import TaskEmpty from "@/components/task/task_empty";
import Ring_progress from './ringProgress'
import {useState} from "react";

interface data_type {
    day:number,
    week:string,
    hot:boolean,
    week_str:string,
    month_day:string,
    list:[]
}

interface task_list {
    title: string,
    hot_radio: boolean,
    id: number
}

const Task: React.FC<{ name: string, data: data_type }> = ({name, data}) => {
    const [task_list, set_task_list] = useState<task_list[]>([...data.list])
    const task_list_click = (id: number) => {
        set_task_list([...task_list.map((u) => {
            if (u.id === id && !u.hot_radio) {
                return {...u, hot_radio: true}
            } else {
                return {...u}
            }
        })])
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
                            return <Item key={u.id} onChange={task_list_click} data={u}/>
                        }) : <TaskEmpty/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Task
