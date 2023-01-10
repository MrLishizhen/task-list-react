import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from './index.module.less'
import Task from "@/components/task";
import {ThemeContext} from "@/views/layout";
import {timeFormatting} from "@/util/utils";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

interface data_type {
    day: number,
    week: string,
    hot: boolean,
    week_str: string,
    month_day: string,
    list: task_list[]
}

interface task_list {
    title: string,
    hot_radio: boolean,
    id: number
}


/*
* 1.无缝轮播
* 2.点击块自动居中
*
*
* */
const Banner:React.FC<{name:string,data:data_type[]}> = ({name,data}) => {

    const banner_box = useRef<HTMLDivElement>(null)
    // const swiper = useSwiper();


    // useEffect(() => {
    //     if (banner_box.current) {
    //         swiper && swiper.destroy(false)
    //         if (data.length === 1) {
    //         } else {
    //
    //         }
    //     }
    //
    // }, [data.length])

    return (
        <div className={styles.banner}>
            <div className={styles.banner_box} ref={banner_box}>
                {
                    name === '天' ?
                        data.map((u: data_type, i) => {
                            return (<div key={i} className={styles.banner_item}>
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
