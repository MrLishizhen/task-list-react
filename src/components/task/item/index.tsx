import React, {useState} from 'react'
import styles from './index.module.less'
import Radio from "@/components/task/radio";
import Model from '@/components/model'

interface propRadio {
    data: any,
    cont_style?: any,
    item_style?: any,
    onChange: (id: number) => void,
    task_list_content_click?: (id: number) => void,
    right_icon?: boolean
}

const Item: React.FC<propRadio> = ({
                                       data = {},
                                       onChange,
                                       task_list_content_click,
                                       right_icon = true,
                                       cont_style = {},
                                       item_style = {}
                                   }) => {
    const radioChange = (id: number) => {
        onChange(id)
    }
    return (
        <>
            <div className={styles.item} style={{...item_style}}>
                <Radio radioChange={radioChange} id={data.id} is_radio={data.hot_radio}/>
                <div
                    style={{...cont_style}}
                    className={`${styles.task_com} ${data.hot_radio ? styles.task_com_hot : ''}`}>主页原型设计主页原型设计主页原型设计主页原型设计主页原型设计
                </div>
                {
                    right_icon ? <div className={`${styles.tabs} ${data.hot_radio ? styles.tabs_hot : ''}`}>
                        <div className={styles.tabs_box}>
                            <div onClick={() => task_list_content_click && task_list_content_click(data.id)}
                                 className={styles.tabs_item}>编辑
                            </div>
                            <div className={styles.tabs_item}>删除</div>
                        </div>
                    </div> : ''
                }
            </div>
        </>

    )
}

export default Item
