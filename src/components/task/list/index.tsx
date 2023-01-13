import React, {useState} from "react";
import Item from "@/components/task/item";
import {useTransition, animated} from '@react-spring/web'

interface task_list {
    title: string,
    hot_radio: boolean,
    id: number | string
}

interface AnimatedList {
    data: task_list[],
    task_list_content_click: (id: number) => void,
    task_list_radio: (id: number) => void
}

const AnimatedList: React.FC<AnimatedList> = ({data = [], task_list_content_click, task_list_radio}) => {

    let height = 0
    const transitions = useTransition(
        data.map(list => ({...list, y: (height += 46) - 46})),
        {
            key: (item: any) => item.name,
            from: {height: 0, opacity: 0},
            leave: {height: 0, opacity: 0},
            // enter: ({y, height = 10}) => ({y, height, opacity: 1}),
            // update: ({y, height = 10}) => ({y, height}),
        }
    )
    return (
        <>

            {transitions((style, item, t, index) => (
                <animated.div style={{ zIndex: data.length - index, ...style }}>
                    <Item
                    key={item.id}
                    task_list_content_click={task_list_content_click}
                    onChange={task_list_radio} data={{...item}}
                    />
                </animated.div>
            ))}
            {/*{*/}
            {/*    data.map((u: task_list) => {*/}
            {/*        return <Item*/}
            {/*            key={u.id}*/}
            {/*            task_list_content_click={task_list_content_click}*/}
            {/*            onChange={task_list_radio} data={{...u}}*/}
            {/*        />*/}
            {/*    })*/}
            {/*}*/}
        </>
    )
}

export default AnimatedList
