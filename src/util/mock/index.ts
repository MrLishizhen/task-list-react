import Mock from 'mockjs'
import {Random} from "mockjs";


Mock.setup({
    timeout: 1000
})

Mock.mock('/home/get_date_list', function (data) {
    let {body} = data
    let data_list = []
    if (body.indexOf(`date_name=${encodeURI('天')}`) > -1) {
        // for (let i = 0; i < 2; i++) {
        //     data_list.push({
        //         title: `这是第${i}个代办事项`,
        //         "id|1-100": 100,
        //         date: Random.now('yyyy-MM-dd') + ' ' + '@time'
        //     })
        // }
        return Mock.mock({
            'code': 200,
            'msg': '',
            'result': []
        })
    } else {
        return Mock.mock({
            'code': 200,
            'msg': '',
            'result': []
        })
    }

})

Mock.mock('/home/set_task_radio', function () {
    return Mock.mock({
        'code': 200,
        'msg': '设置成功',
        'result': []
    })
})
