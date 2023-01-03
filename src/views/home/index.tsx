import styles from './index.module.less'
import Task from "@/components/task";
const Home = () => {
    return (
        <div className={styles.home}>
            <Task></Task>
        </div>
    )
}

export default Home
