// 初始化pinia
import { type App, reactive, effectScope } from "vue"
import { __pinia__ } from "./type"
import type { Pinia } from "./type"
// 给this定义类型需要放在第一个,不会影响参数
function install(this: Pinia, app: App) {
    console.log(app, this)
    app.provide(__pinia__, this)
}
function createPinia() {
    const store = new Map()
    const scope = effectScope()
    const state = scope.run(() => reactive({})) as Record<string, any>

    return {
        install,
        store,
        state,
        scope
    }
}

export default createPinia