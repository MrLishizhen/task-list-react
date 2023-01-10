import styles from './index.module.less'
import React, {useContext, useEffect, useState} from "react";
import Banner from './banner'
import Model from "@/components/model";
import MyEditor from '@/components/editor'
import {useAppSelector} from '@/redux/hook'
import {ThemeContext} from "@/views/layout";
import {timeFormatting} from "@/util/utils";
import Item from '@/components/task/item'

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

const Time_left = () => {
    const {week_str, month_day} = useAppSelector(state => state.home_model.data)
    return (
        <div className={styles.time_left}>
            {
                `${week_str} ${month_day}`
            }
        </div>
    )
}
const Model_com = () => {
    const cont_style = {color: '#333', fontWeight: 600, fontSize: 18}
    const item_style = {padding: 0,borderWidth:0}
    const home_model = useAppSelector(state => state.home_model.data)
    const changeItem = () => {

    }
    return (
        <div className={styles.model_com}>
            <Item item_style={item_style} onChange={changeItem} data={home_model} cont_style={cont_style} right_icon={false}/>
            <MyEditor/>
        </div>
    )
}
const Model_footer = () => {
    return (
        <div className={styles.model_footer}>
            <div className={styles.remove_btn}>删除</div>
            <div className={styles.save_btn}>保存</div>
        </div>
    )
}
const Home = () => {
    const {header_tabs, tab_click} = useContext(ThemeContext);
    const name: string = header_tabs.find(u => u.hot)?.name || ''
    const [data, set_data] = useState<data_type[]>([])
    const home_model = useAppSelector(state => state.home_model.data)

    useEffect(() => {
        set_data(timeFormatting(name))
    }, [name])

    return (
        <div className={styles.home}>
            <Banner name={name} data={data}/>
            {
                home_model.model_open ?
                    <Model {...home_model} com_content={<Model_com/>} footer_content={<Model_footer/>}
                           top_content={<Time_left/>}/> : ''
            }
        </div>
    )
}

export default Home
