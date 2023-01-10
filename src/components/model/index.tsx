import styles from './index.module.less'
import React, {useState} from 'react'
import {set_model_open} from '@/redux/home_model'
import {useAppDispatch} from '@/redux/hook'
interface model {
    model_open: boolean,//组件是否加载
    top_content: any,//头部内容
    com_content: any,//中间内容
    footer_content: any,//底部内容
    clone_icon: boolean,//是否显示删除按钮
    footer_is: boolean,//是否显示底部内容
}

const Model: React.FC<model | any> = ({model_open, top_content, com_content, footer_content, footer_is=true,clone_icon=true}) => {
    const dispatch = useAppDispatch()
    const cloneClick = ()=>{
        dispatch(set_model_open(false))
    }
    return (
        <div style={{'display': model_open ? 'block' : 'none'}} className={styles.model_box}>
            <div className={styles.model}>
                <div className={styles.model_top}>
                    <div className={styles.model_top_content}>
                        {
                            top_content
                        }
                    </div>
                    {
                        clone_icon ? <div onClick={cloneClick} className={styles.model_top_right_icon}/> : ''
                    }

                </div>
                <div className={styles.model_com}>
                    {
                        com_content
                    }
                </div>
                {
                    footer_is ? <div className={styles.model_footer}>
                        {
                            footer_content
                        }
                    </div> : ''
                }

            </div>
        </div>
    )
}
export default Model
