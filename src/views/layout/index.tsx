import styles from './index.module.less'
import {Outlet} from "react-router-dom";
import Header from "@/components/header";
import React, {useState} from 'react'
import Footer from "@/components/footer";
import {getStartEndTime} from "@/util/utils";
interface header_tabs_type {
    name: string,
    hot: boolean,
    start_date: string,
    end_date: string,
}
interface head_context {
    header_tabs: header_tabs_type[],
    tab_click: (i: number) => void
}

const themes = {
    header_tabs: [{name: '天', hot: true, start_date: '', end_date: ''}, {
        name: '周',
        hot: false,
        start_date: '',
        end_date: ''
    }]
};
//构造context
export const ThemeContext: React.Context<head_context> = React.createContext({
        header_tabs: themes.header_tabs,
        tab_click: (i: number): void => {}
    }
);

const initialState = [{
    name: '天',
    hot: true,
    start_date: getStartEndTime('天')[0],
    end_date: getStartEndTime('天')[1]
}, {
    name: '周',
    hot: false,
    start_date: getStartEndTime('周')[0], end_date: getStartEndTime('周')[1]
}]
const Layout = () => {
    const [header_tabs, set_header_tabs] = useState<header_tabs_type[]>(initialState);
    // 点击切换
    const tab_click = (i: number): void => {
        set_header_tabs([...header_tabs.map((u, index) => {
            if (i === index) {
                u.hot = true
            } else {
                u.hot = false;
            }
            return {...u}
        })])
    }
    return (
        <ThemeContext.Provider value={{
            header_tabs,
            tab_click
        }}>
            <div className={styles.layout}>
                <Header/>
                <div className={styles.main}>
                    <Outlet/>
                </div>
                <Footer/>
            </div>
        </ThemeContext.Provider>
    )
}
export default Layout
