import styles from './index.module.less'
import React, {useContext, useEffect, useState} from "react";
import Banner from './banner'
import Model from "@/components/model";
import MyEditor from '@/components/editor'
import {useAppSelector, useAppDispatch} from '@/redux/hook'
import {set_model_hot_list} from '@/redux/home_model'
import {ThemeContext} from "@/views/layout";
import {deepClone, timeFormatting} from "@/util/utils";
import Item from '@/components/task/item'
import {get_date_list} from '@/api/home'


interface data_type {
    day: number,
    week: string,
    hot: boolean,
    week_str: string,
    month_day: string,
    list: task_list[]
}

interface header_tabs_type {
    name: string,
    hot: boolean,
    start_date: string,
    end_date: string,
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
    const dispatch = useAppDispatch()
    const cont_style = {color: '#333', fontWeight: 600, fontSize: 18}
    const item_style = {padding: 0, borderWidth: 0}
    const home_model = useAppSelector(state => state.home_model.data)
    const changeItem = () => {
        let hot_list = home_model?.hot_list;
        if (hot_list) {
            dispatch(set_model_hot_list({...hot_list, hot_radio: !hot_list.hot_radio}))
        }
    }
    return (
        <div className={styles.model_com}>
            <Item item_style={item_style} onChange={changeItem} data={home_model.hot_list} cont_style={cont_style}
                  right_icon={false}/>
            <MyEditor editor_html={home_model?.hot_list.editor_html}/>
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
    const hot_header_tab = header_tabs.find(u => u.hot);
    const [data, set_data] = useState<data_type[]>([])
    const home_model = useAppSelector(state => state.home_model.data)
    let [loadingIs,setLoadingIs] = useState(false);


    useEffect(() => {
        setLoadingIs(false)
        get_date_list({
            date_name: hot_header_tab?.name || '',
            start_date: hot_header_tab?.start_date || '',
            end_date: hot_header_tab?.end_date || ''
        }).then(res => {
            let data = []
            if (res.code === 200) {
                data = res.result.map((u: task_list) => {
                    return {...u, hot_radio: false}
                })
            }

            set_data(timeFormatting(hot_header_tab?.name, data))
            setLoadingIs(true)
        })
    }, [hot_header_tab?.name])

    useEffect(() => {
        let datas = deepClone(data)
        let hot_list = home_model?.hot_list || {};
        for (let i = 0; i < datas.length; i++) {
            let list = datas[i].list;
            for (let j = 0; j < list.length; j++) {
                if (list[j].id === hot_list.id) {
                    list[j].hot_radio = hot_list?.hot_radio || false
                }
            }
        }
        set_data([...datas])
    }, [home_model])

    useEffect(() => {
        let datas = deepClone(data)
        console.log(datas, 3)
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].month_day === home_model.month_day) {
                datas[i].list = home_model.list
            }
        }
        set_data(datas)
    }, [home_model.list])
    return (
        <div className={styles.home}>
            {
                loadingIs ? <Banner name={hot_header_tab?.name || ''} data={data}/> : ""
            }
            {
                home_model.model_open ?
                    <Model {...home_model} com_content={<Model_com/>} footer_content={<Model_footer/>}
                           top_content={<Time_left/>}/> : ''
            }
        </div>
    )
}

export default Home
