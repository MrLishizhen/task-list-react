import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {deepClone} from "@/util/utils";
import {set_home_data} from "@/redux/home_data";
import {set_model_open} from "@/redux/home_model";
import styles from "@/views/home/index.module.less";
import React from "react";
import useTaskData from "@/hooks/useTaskData";

const Model_footer = () => {
    const dispatch = useAppDispatch()
    const home_model = useAppSelector(state => state.home_model.data)
    const home_data: data_type[] = useAppSelector(state => state.home_data.data)

    const click_save_btn = () => {
        const _home_model = deepClone(home_model)
        const {_data,data_index,data_item} = useTaskData(home_data,_home_model.day)
        // const _data = deepClone(home_data)
        // let data_item: any = _data.find((u: any) => u.day === _home_model.day);
        // let data_index: number = _data.findIndex((u: any) => u.day === _home_model.day) || 0;
        _data[data_index] = {...data_item, list: [_home_model.hot_list]}
        dispatch(set_home_data(_data))
        dispatch(set_model_open(0))
    }
    const removeItem = () => {
        const {day, hot_list} = home_model;
        const data: data_type | undefined = home_data.find((u: data_type) => u.day === day);
        let index = 0;
        if (data && data.list) {
            let list = [];
            for (let i = 0; i < data.list.length; i++) {
                if (data.list[i].id !== hot_list.id) {
                    list.push(data.list[i])
                } else {
                    index = i
                }
            }
            const {_data,data_item} = useTaskData(home_data,home_model.day)
            // const _data = deepClone(home_data)
            // let data_item: any = home_data.find((u: any) => u.day === home_model.day);
            _data[index] = {...data_item, list: [...list]}
            dispatch(set_home_data(_data))
            dispatch(set_model_open(0))
        }
    }
    return (
        <div className={styles.model_footer}>
            <div className={styles.remove_btn} onClick={removeItem}>删除</div>
            <div className={styles.save_btn} onClick={click_save_btn}>保存</div>
        </div>
    )
}

export default Model_footer
