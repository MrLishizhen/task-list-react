import {RingProgress} from '@antv/g2plot';
import React, {useEffect, useRef} from "react";

const Ring_progress: React.FC<{ percent: number }> = ({percent = 0}) => {
    let ringProgress: any = null;
    const container = useRef<any>(null)
    useEffect(() => {
        ringProgress = new RingProgress(container.current, {
            height: 50,
            width: 50,
            radius: 1,
            innerRadius: 0.68,
            statistic: {
                content: false,
            },
            autoFit: false,
            percent: isNaN(percent) ? 0 : percent,
            color: ['#6F42FF', '#F6F6F6'],
        });
        ringProgress.render();
        return () => {
            ringProgress.destroy()
        }
    })
    return (
        <div ref={container}></div>
    )
}
export default Ring_progress
