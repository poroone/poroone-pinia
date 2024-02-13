import { watch, type EffectScope } from "vue"
import type { Pinia } from "./type"
// 清除
export function reset(pinia: Pinia, id: string, originData: any) {
    return function $reset() {
        for (let key in originData) {
            console.log("123", id)
            console.log(pinia, originData[key])
            pinia.state[id][key] = originData[key]
        }
    }
}
// 停止
export function dispose(pinia: Pinia, id: string, scope: EffectScope) {
    return function $dispose() {
        pinia.store.delete(id)
        scope.stop()
    }
}
//  侦听state的变化
export function subscribe(pinia: Pinia, id: string, scope: EffectScope) {
    return function $subscribe(callback: Function) {
        scope.run(() => {
            watch(pinia.state[id], (state) => {
                callback({ type: id }, state)
            })
        })
    }
}