import styles from './index.module.less'
import {Outlet} from "react-router-dom";
import Header from "@/components/header";
import React, {useState} from 'react'
import Footer from "@/components/footer";

interface header_tabs_type {
    name: string,
    hot: boolean
}

interface head_context {
    header_tabs: header_tabs_type[],
    tab_click: (i: number) => void
}

const themes = {
    header_tabs: [{name: '天', hot: true}, {name: '周', hot: false}]
};
//构造context
export const ThemeContext: React.Context<head_context> = React.createContext({
        header_tabs: themes.header_tabs,
        tab_click: (i: number): void => {
        }
    }
);

const Layout = () => {
    const [header_tabs, set_header_tabs] = useState<header_tabs_type[]>([{name: '天', hot: true}, {
        name: '周',
        hot: false
    }]);
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
