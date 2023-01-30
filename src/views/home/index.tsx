import styles from './index.module.less'
import React, {useContext, useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from '@/redux/hook'
import {set_home_data} from '@/redux/home_data'
import {ThemeContext} from "@/views/layout";
import {timeFormatting} from "@/util/utils";
import Banner from './banner'
import Model from "@/components/model";
import Model_footer from './model_footer'
import Model_com from './model_com'
import Time_left from './time_left'
import _ from 'lodash'

const Home = () => {
    const dispatch = useAppDispatch()
    const {header_tabs} = useContext(ThemeContext);
    const hot_header_tab = header_tabs.find(u => u.hot);
    const home_model = useAppSelector(state => state.home_model.data)
    const data: data_type[] = useAppSelector(state => state.home_data.data)
    let [loadingIs, setLoadingIs] = useState(false);

    useEffect(() => {
        setLoadingIs(false)
        const local_data = localStorage.getItem('my_week') ? JSON.parse(localStorage.getItem('my_week') || '') || [] : [];
        dispatch(set_home_data(timeFormatting(hot_header_tab?.name, local_data)))
        setLoadingIs(true)

    }, [hot_header_tab?.name])

    useEffect(() => {
        const local_data = localStorage.getItem('my_week') ? JSON.parse(localStorage.getItem('my_week') || '') || [] : [];
        const week_data = [];
        for (let i = 0; i < data.length; i++) {
            week_data.push(...data[i].list)
        }
        if (!_.isEqual(local_data, week_data)) {
            localStorage.setItem('my_week', JSON.stringify(week_data));
        }
    }, [data])
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
