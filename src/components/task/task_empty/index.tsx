import styles from './index.module.less'
import kong from '@/assets/kong.svg'

const TaskEmpty = () => {
    return (
        <div className={styles.task_empty}>
            <img className={styles.task_empty_img} src={kong} alt=""/>
            <div className={styles.com}>今天没有任务，<i className={styles.font}>添加任务</i> 或放松一下吧~</div>
        </div>
    )
}
export default TaskEmpty
