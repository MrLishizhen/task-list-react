import styles from './index.module.less'
import React from "react";
import Banner from './banner'
import Model from "@/components/model";

const Home = () => {
    return (
        <div className={styles.home}>
            <Banner/>
            <Model model_open={true}></Model>
        </div>
    )
}

export default Home
