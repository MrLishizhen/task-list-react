import {deepClone} from "@/util/utils";

const useTaskData = (data:any,day:number)=>{
    const _data = deepClone(data)
    let data_item: any = _data.find((u: any) => u.day === day);
    let data_index: number = _data.findIndex((u: any) => u.day === day) || 0;

    return {
        _data,data_index,data_item
    }
}
export default useTaskData
