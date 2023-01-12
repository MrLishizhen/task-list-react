import styles from './index.module.less'
import React from 'react'

const Inputs:React.FC<{onChange:(e:any)=>void}> = ({onChange}) => {
    return (
        <div className={styles.inputs}>
            <span className={styles.input_icon_box}>
                <span className={styles.input_icon}></span>
                {/*<span className={styles.input_label}>正在输入</span>*/}
            </span>
            <input placeholder={'输入任务名称，按“回车键”即可添加'} onKeyPress={onChange} className={styles.input} type="text"/>
            <span className={styles.enter_icon_box}>
                <i className={styles.enter_icon}></i>
            </span>
        </div>
    )
}

export default Inputs
