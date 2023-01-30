import React, {useRef} from 'react'
import styles from './index.module.less'
import Task from "@/components/task";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

/*
* 1.无缝轮播
* 2.点击块自动居中
*
*
* */
const Banner: React.FC<{ name: string, data: data_type[] }> = ({name, data}) => {
    const banner_box = useRef<HTMLDivElement>(null)

    return (
        <div className={styles.banner}>
            <div className={styles.banner_box} ref={banner_box}>
                {
                    name === '天' ?
                        data.map((u: data_type,) => {
                            return (<div key={u.day} className={styles.banner_item}>
                                <Task name={name} data={u}/>
                            </div>)
                        })
                        :
                        data.length > 1 ? <Swiper
                            observer={true}
                            observeParents
                            loopAdditionalSlides={2}
                            //点击的内容会居中
                            slideToClickedSlide
                            breakpoints={{
                                960: {
                                    slidesPerView: 2,
                                    spaceBetween: 80
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30
                                },
                                1366: {
                                    slidesPerView: 4,
                                    spaceBetween: 70
                                }
                            }}
                            spaceBetween={70}
                            slidesPerView={4}
                            loop
                            initialSlide={data.findIndex(u => u.hot)}
                            centeredSlidesBounds
                            centeredSlides={true}
                        >
                            {
                                data.map((u, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <Task name={name} data={u}/>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper> : ''
                }
            </div>
        </div>
    )
}
export default Banner
