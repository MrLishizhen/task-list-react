import styles from './index.module.less'
import React, {useEffect} from 'react'
import Inputs from './input'
import Item from "@/components/task/item";
import TaskEmpty from "@/components/task/task_empty";
import Ring_progress from './ringProgress'
import {useState} from "react";
import {set_model_open} from '@/redux/home_model'
import {useAppDispatch} from '@/redux/hook'
import {set_task_radio} from "@/api/home";
import moment from "moment";
import {deepClone} from "@/util/utils";
import {nanoid} from 'nanoid'
import AnimatedList from "@/components/task/list";
import _ from "lodash";

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
    id: number | string
}

const Task: React.FC<{ name: string, data: data_type }> = ({name, data}) => {
    const dispatch = useAppDispatch()
    const [task_list, set_task_list] = useState<task_list[]>([])

    useEffect(() => {
        // if (!(_.isEqual(data.list, task_list))) {
        set_task_list(data.list)
        // }

    }, [data.list])
    const task_list_radio = (id: number) => {

        set_task_list([...task_list.map((u) => {
            if (u.id === id) {
                set_task_radio({id: u.id, task_radio: !u.hot_radio ? 1 : 0}).then(res => {
                    console.log(res)
                })
                return {...u, hot_radio: !u.hot_radio}
            } else {
                return {...u}
            }
        })])
    }
    const task_list_content_click = (id: number): void => {
        const hot_list = task_list.find(u => u.id === id);
        let new_data = deepClone(data)
        new_data.list = task_list;
        dispatch(set_model_open({
            model_open: true,
            hot_list,
            ...new_data
        }))
    }
    const hot_list = task_list.filter(u => u.hot_radio);
    const addChange = (e: any) => {
        if (e.charCode === 13) {
            let task_item = {
                title: e.target.value,
                hot_radio: false,
                id: nanoid(),
                date: moment().format("YYYY-MM-DD HH:mm:ss")
            }
            e.target.value = ''
            set_task_list([task_item, ...task_list])
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
                                         onChange={task_list_radio} data={{...u}}/>
                        }) : <TaskEmpty day={data.day}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Task
