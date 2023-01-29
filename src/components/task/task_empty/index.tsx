import styles from './index.module.less'
import React from 'react'
import kong from '@/assets/kong.svg'
import Monday from '@/assets/week/monday.svg'
import Tuesday from '@/assets/week/tuesday.svg'
import Wednesday from '@/assets/week/wednesday.svg'
import Thursday from '@/assets/week/thursday.svg'
import Friday from '@/assets/week/friday.svg'
import Saturday from '@/assets/week/saturday.svg'
import Sunday from '@/assets/week/sunday.svg'

const TaskEmpty:React.FC<{day:number}> = ({day}) => {
    // const weeks = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    let url = kong
    switch (day) {
        case 0 :
            url = Sunday
            break;
        case 1 :
            url = Monday
            break;
        case 2 :
            url = Tuesday
            break;
        case 3 :
            url = Wednesday
            break;
        case 4 :
            url = Thursday
            break;
        case 5 :
            url = Friday
            break;
        case 6 :
            url = Saturday
            break;
    }

    return (
        <div className={styles.task_empty}>
            <img className={styles.task_empty_img} src={url} alt=""/>
            <div className={styles.com}>今天没有任务，<i className={styles.font}>添加任务</i> 或放松一下吧~</div>
        </div>
    )
}
export default TaskEmpty
