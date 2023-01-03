import styles from './index.module.less'
import {Outlet} from "react-router-dom";
import Header from "@/components/header";

import Footer from "@/components/footer";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header/>
            <div className={styles.main}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}
export default Layout
