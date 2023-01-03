import styles from './index.module.less'
import Inputs from './input'
import Item from './item'
import TaskEmpty from "@/components/task/task_empty";
import Ring_progress from './ringProgress'
import {useState} from "react";
interface task_list {
    title:string,
    hot_radio:boolean,
    id:number
}
const Task = () => {
    const [task_list, set_task_list] = useState<task_list[]>([
        // {
        //     title: '主页原型设计主页原型设计主页原型设计',
        //     hot_radio: true,
        //     id: 0
        // },
        // {
        //     title: '主页原型设计主页原型设计主页原型设计',
        //     hot_radio: false,
        //     id: 1
        // }
    ])
    const task_list_click = (id: number) => {
        set_task_list([...task_list.map((u) => {
            if (u.id === id && u.hot_radio === false) {
                return {...u, hot_radio: true}
            } else {
                return {...u}
            }
        })])
    }
    const addChange = (e: any) => {
        if (e.charCode === 13) {

        }
    }
    return (
        <div className={styles.task_box}>
            <div className={styles.task_top}>
                <div className={styles.task_left}>
                    <div className={styles.task_left_week_top}>
                        <span className={styles.week}>周五</span>
                        <span className={styles.quantity}>（0/6）</span>
                        <span className={styles.today}>今天</span>
                    </div>
                    <div className={styles.task_left_week_bom}>
                        10月28日
                    </div>
                </div>
                <div className={styles.task_right}>
                    <Ring_progress/>
                </div>
            </div>
            <div className={styles.task_bom}>
                <Inputs onChange={addChange}/>
                <div className={styles.task_item_box}>
                    {
                        task_list&&task_list.length > 0 ? task_list.map(u => {
                            return <Item key={u.id} onChange={task_list_click} data={u}/>
                        }) : <TaskEmpty/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Task
