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
export const timeFormatting = (time = '天'): data_type[] => {


    const data: data_type[] = [];
    if (time === '天') {
        const date = new Date();
        data.push(getItem(date))
    } else if (time === '周') {
        /*
        * 获取当前天所在的日期，
        * 根据获取到的日期 计算前几天以及后几天 凑够一周的时间
        * 根据时间获取item的内容
        * */

        let dates = getWeekTime()
        for (let i = 0; i < dates.length; i++) {
            let date = new Date(dates[i])
            data.push(getItem(date))
        }

    }
    return data
}

export const getItem = (date: any) => {
    const day = date.getDay();
    const week = ['天', '一', '二', '三', '四', '五', '六'][day];
    const month = date.getMonth() + 1;
    const getUTCDate = date.getDate();
    let item: data_type = {
        day: day === 0 ? 7 : day,
        week,
        hot: date.getDate()===new Date().getDate(),
        week_str: '周' + week,
        month_day: month + '月' + getUTCDate + '日',
        list: [
            {
                title: '主页原型设计主页原型设计主页原型设计',
                hot_radio: true,
                id: 0
            },
            {
                title: '主页原型设计主页原型设计主页原型设计',
                hot_radio: false,
                id: 1
            }
         ]
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
