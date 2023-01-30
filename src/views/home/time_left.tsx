import {useAppSelector} from "@/redux/hook";
import styles from "@/views/home/index.module.less";
import React from "react";

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
export default Time_left
