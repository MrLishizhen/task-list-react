import {RingProgress} from '@antv/g2plot';
import {useEffect} from "react";

const Ring_progress = () => {
    let ringProgress: any = null;
    useEffect(() => {
        ringProgress = new RingProgress('container', {
            height: 50,
            width: 50,
            radius:1,
            innerRadius:0.68,
            statistic:{
                content:false,
            },
            autoFit: false,
            percent: 0.7,
            color: ['#6F42FF', '#F6F6F6'],
        });
        ringProgress.render();
        return () => {
            ringProgress.destroy()
        }
    })
    return (
        <div id={'container'}></div>
    )
}
export default Ring_progress
