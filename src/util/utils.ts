/*
* return {
*   week:number, 3
*   week_str:string,'周三',
*   month_day:string,'1月4号'
* }
*
*
*
* */
import moment from 'moment';

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

//初始化时间对象
export const timeFormatting = (time = '天', global_data = []): data_type[] => {


    const data: data_type[] = [];
    if (time === '天') {
        const date = new Date();
        data.push(getItem(date, global_data))
    } else if (time === '周') {
        /*
        * 获取当前天所在的日期，
        * 根据获取到的日期 计算前几天以及后几天 凑够一周的时间
        * 根据时间获取item的内容
        * */

        let dates = getWeekTime()
        for (let i = 0; i < dates.length; i++) {
            let date = new Date(dates[i])
            data.push(getItem(date,global_data))
        }

    }
    return data
}

export const getItem = (date: any, data: any = []) => {
    const year = date.getFullYear()
    const day = date.getDay();
    const week = ['天', '一', '二', '三', '四', '五', '六'][day];
    const month = date.getMonth() + 1;
    const getUTCDate = date.getDate();
    let month_day = (month >= 10 ? month : '0' + month + '月') + (getUTCDate >= 10 ? getUTCDate : '0' + getUTCDate + '日')
    const date_yyyy_mm_ss = year + '-' + (month >= 10 ? month : '0' + month) + '-' + (getUTCDate >= 10 ? getUTCDate : '0' + getUTCDate);

    let itemData = data.filter((u: any) => isSameDay(u.date, date_yyyy_mm_ss))

    let item: data_type = {
        day: day === 0 ? 7 : day,
        week,
        hot: date.getDate() === new Date().getDate(),
        week_str: '周' + week,
        month_day: month_day,
        list: [...itemData]
    }

    return item
}
//找出
export const getWeekTime = () => {
    // var new_Date = new Date('2023-01-01') //获取指定日期当周的一周日期
    let new_Date = new Date() //获取本周一周日期
    let timesStamp = new_Date.getTime();
    let currenDay = new_Date.getDay();
    let dates = [];
    for (let i = 0; i < 7; i++) {
        let das = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString();
        // das.replace(/[年月]/g, '.').replace(/[日上下午]/g, '');
        dates.push(das);
    }
    return dates;
}

function isSameDay(timeA: string, timeB: string) {
    // 获取两个时间的0点时间戳
    let dateA = new Date(timeA + '').setHours(0, 0, 0, 0)
    let dateB = new Date(timeB + '').setHours(0, 0, 0, 0)
    // 比较时间戳
    return dateA === dateB
}

export let deepClone = (obj: any) => {
    //判断是对象还是数组
    let objClone: any = Array.isArray(obj) ? [] : {};
    //判断obj是一个对象
    if (obj && typeof obj === "object") {
        //遍历obj的key值
        for (let key in obj) {
            //确认拿到的不是obj继承来的属性
            if (obj.hasOwnProperty(key)) {
                //如果说obj的属性或者方法也是一个对象的话
                if (obj[key] && typeof obj[key] === "object") {
                    //调用自身，把key值传进去
                    objClone[key] = deepClone(obj[key]);
                } else {
                    //说明仅仅是个属性
                    objClone[key] = obj[key];
                }
            }
        }
    }
    //return 拷贝后的对象
    return objClone;
}

/*
*
* */
export const getStartEndTime = (time: string) => {
    if (time === '天') {
        return [moment().format("YYYY-MM-DD") + ' 00:00:00', moment().format("YYYY-MM-DD") + " 59:59:59"]
    } else {
        let dates = getWeekTime();
        return [dates[0] + ' 00:00:00', dates[dates.length - 1] + " 59:59:59"]
    }
}
