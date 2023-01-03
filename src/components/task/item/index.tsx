import React from 'react'
import styles from './index.module.less'
import Radio from "@/components/task/radio";

interface propRadio {
    data: any,
    onChange:(id:number)=>void
}

const Item: React.FC<propRadio> = ({data,onChange}) => {
    const radioChange = (id: number) => {
        onChange(id)
    }
    return (
        <div className={styles.item}>
            <Radio radioChange={radioChange} id={data.id} is_radio={data.hot_radio}/>
            <div
                className={`${styles.task_com} ${data.hot_radio ? styles.task_com_hot : ''}`}>主页原型设计主页原型设计主页原型设计主页原型设计主页原型设计
            </div>
            <div className={`${styles.tabs} ${data.hot_radio ? styles.tabs_hot : ''}`}></div>
        </div>
    )
}

export default Item
