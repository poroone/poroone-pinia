import type { App, EffectScope } from "vue"
export const __pinia__ = Symbol('pinia');
// 给this定义类型
export interface Pinia {
    install: (app: App) => void
    scope: EffectScope
    state: Record<string, any>
    store: Map<any, any>
}
export type SetupFunction<T = any> = () => T
export interface options {
    state?: Record<string, any> | (() => Record<string, any>)
    actions?: Record<string, any>
    getters?: Record<string, any>
}