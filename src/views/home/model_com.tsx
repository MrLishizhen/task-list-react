import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {set_model_hot_editor_html, set_model_hot_list} from "@/redux/home_model";
import styles from "@/views/home/index.module.less";
import Item from "@/components/task/item";
import MyEditor from "@/components/editor";
import React from "react";

const Model_com = () => {
    const dispatch = useAppDispatch()
    const cont_style = {color: '#333', fontWeight: 600, fontSize: 18}
    const item_style = {padding: 0, borderWidth: 0}
    const home_model = useAppSelector(state => state.home_model.data)
    const changeItem = () => {
        let hot_list = home_model?.hot_list;
        if (hot_list) {
            dispatch(set_model_hot_list({...hot_list, hot_radio: !hot_list.hot_radio}))
        }
    }
    const up_editor = (html: string) => {
        if (html !== '') {
            dispatch(set_model_hot_editor_html(html))
        }
    }
    return (
        <div className={styles.model_com}>
            <Item day={home_model.day} key={home_model.day} item_style={item_style} onChange={changeItem}
                  data={home_model.hot_list}
                  cont_style={cont_style}
                  right_icon={false}/>
            <MyEditor getHtml={up_editor} editor_html={home_model?.hot_list.editor_html}/>
        </div>
    )
}

export default Model_com
