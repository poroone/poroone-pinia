
import { EffectScope, isRef } from "vue"

declare module "vue" {
    interface Ref {
        effect: EffectScope
    }
}
//类型守卫
// 如果条件成立返回true 那么一定是function
export const isFunction = (v: any): v is Function => typeof v === 'function'

// computed比ref多了一个effect属性
export const isComputed = (v: any) => !!(isRef(v) && v.effect)
// js短路逻辑 function(){return true}


