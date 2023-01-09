import styles from "./index.module.less";
import {useContext, useState} from "react";
import {ThemeContext} from '@/views/layout'
interface tab {
    name: string,
    hot: boolean
}

const Header = () => {
    const {header_tabs, tab_click} = useContext(ThemeContext)
    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.tabs}>
                <div className={styles.tabs_box}>
                    {
                        header_tabs.map((u, i) => {
                            return (<div key={u.name} onClick={() => tab_click(i)}
                                         className={`${styles.tab} ${u.hot ? styles.hot : ''}`}>
                                {u.name}
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className={styles.user}>
                <div className={styles.user_img}></div>
            </div>
        </header>
    )
}

export default Header
