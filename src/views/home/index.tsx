import styles from './index.module.less'
import React, {useContext, useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from '@/redux/hook'
import {set_home_data} from '@/redux/home_data'
import {ThemeContext} from "@/views/layout";
import {timeFormatting} from "@/util/utils";
import {get_date_list} from '@/api/home'
import Banner from './banner'
import Model from "@/components/model";
import Model_footer from './model_footer'
import Model_com from './model_com'
import Time_left from './time_left'

const Home = () => {
    const dispatch = useAppDispatch()
    const {header_tabs} = useContext(ThemeContext);
    const hot_header_tab = header_tabs.find(u => u.hot);
    const home_model = useAppSelector(state => state.home_model.data)
    const data = useAppSelector(state => state.home_data.data)
    let [loadingIs, setLoadingIs] = useState(false);

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
            dispatch(set_home_data(timeFormatting(hot_header_tab?.name, data)))
            setLoadingIs(true)
        })
    }, [hot_header_tab?.name])

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
