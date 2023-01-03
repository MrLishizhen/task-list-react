import styles from "./index.module.less";
import {useState} from "react";

interface tab {
    name: string,
    hot: boolean
}

const Header = () => {
    const [tabs, setTabs] = useState<tab[]>([{name: '天', hot: true}, {name: '周', hot: false}])

    const tab_click = (i: number) => {
        setTabs([...tabs.map((u, index) => {
            if (i === index) {
                u.hot = true
            } else {
                u.hot = false;
            }
            return {...u}
        })])
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.tabs}>
                <div className={styles.tabs_box}>
                    {
                        tabs.map((u, i) => {
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
