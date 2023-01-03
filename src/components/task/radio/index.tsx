import React from 'react'
import styles from './index.module.less'
import radio from '@/assets/radio_normal.svg'
import radio_press from '@/assets/radio_press.svg'
import {useState} from "react";

interface radio_type {
    is_radio: boolean,
    id: number,
    radioChange: (id: number) => void
}

const Radio: React.FC<radio_type> = ({is_radio, id, radioChange}) => {
    return (
        <div className={styles.radio} onClick={() => radioChange(id)}
             style={{background: `url(${is_radio ? radio_press : radio}) no-repeat center center/100% 100%`}}></div>
    )
}
export default Radio;
