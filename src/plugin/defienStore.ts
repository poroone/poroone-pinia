import { effectScope, inject, reactive, ref, isReactive, isRef, computed, EffectScope, toRefs } from "vue"
import type { options, SetupFunction, Pinia } from "./type"
import { __pinia__ } from "./type"
import { isFunction, isComputed } from "./format"
import { reset, dispose, subscribe } from "./api"
// api
function createApi(pinia: Pinia, id: string, scope: EffectScope, originData: any) {
    return {
        $reset: reset(pinia, id, originData),
        $dispose: dispose(pinia, id, scope),
        $subscribe: subscribe(pinia, id, scope)
    }
}
// 函数重载
function defienStore(id: string, option: options): SetupFunction
function defienStore(id: string, option: SetupFunction): SetupFunction
function defienStore(id: string, option: options | SetupFunction): SetupFunction {
    return () => {
        const pinia = inject<Pinia>(__pinia__)
        // 第一次进来没存过store
        if (!pinia?.store.has(id) && pinia) {
            // 处理setuo模式
            if (isFunction(option)) {
                // 处理setup函数模式
                createSetupPinia(pinia, id, option)
            } else {
                // 处理option模式
                createOptionsPinia(pinia, id, option)
            }
        }
        // console.log(pinia)
        // 如果有了直接读取
        return pinia?.store.get(id)
    }
}
// setup
function createSetupPinia(pinia: Pinia, id: string, setup: SetupFunction) {
    // setup函数 进来先执行一下函数
    const setupStore = setup()
   
    // 添加响应式
    let store = reactive(setupStore)
    let storeEffect;//进行可控制响应式 可以停止响应
    const res = pinia.scope.run(() => {
        // effectScope
        storeEffect = effectScope()
        store = reactive(createApi(pinia, id, storeEffect, setupStore))

        return storeEffect.run(() => compileSetup(pinia, id, setupStore))
    })

    // pinia的store上添加对应的id和store
    pinia.store.set(id, store)
    // proxy 不能直接被赋值 会丢失响应式的
    Object.assign(store, res)
    // console.log(store)
    // console.log(pinia)
}
//setup
function compileSetup(pinia: Pinia, id: string, setupStore: object) {

    // 第一次进来state有没有?
    !pinia.state[id] && (pinia.state[id] = {})
    // 筛选ref 和reactive 存入state
    // for in 会遍历prototype的东西 key严谨 用keyof获取他自身的属性 来确保 不是prototype的
    // 这怎么判断一个东西是不是ref 是不是reactive 是不是computed
    // isRef
    // isReactive
    // isComputed Vue3 没有
    for (let key in setupStore) {
        const element = setupStore[key as keyof typeof setupStore]
        // 如果是ref 并且不是computed计算属性 或者 是reactive 就添加到state中 ref和computed都返回的是ref
        if ((isRef(element) && !isComputed(element)) || isReactive(element)) {
            pinia.state[id][key] = element
        }
    }

    return {
        ...setupStore
    }
}
// options
function createOptionsPinia(pinia: Pinia, id: string, option: options) {
    // 进来是个对象
    const originData = isFunction(option.state) ? option.state() : option.state
    let store: Record<string, any> = {};
    let storeEffect;

    const res = pinia.scope.run(() => {
        storeEffect = effectScope()
        console.log(pinia, "pinia")
        store = reactive(createApi(pinia, id, storeEffect, originData))
        return storeEffect.run(() => compileOptions(pinia, id, store, option))
    })
    pinia.store.set(id, store)
    Object.assign(store, res)
    console.log(pinia, "pinia")
}
// options
function compileOptions(pinia: Pinia, id: string, store: any, option: options) {
    // 如果没有state创建一个state
    // 1. state需要执行一下     
    // 2.getter 变成computed
    // 3.actions this执行问题
    (!pinia.state[id]) && (pinia.state[id] = {})
    const { state, getters, actions } = option
    // state如或是函数就执行否则直接返回 并且添加了一个reactive响应式 存储到state
    const stateProxy = pinia.state[id] = toRefs(reactive(isFunction(state) ? state() : state))

    let gettersObj
    // getter不为空的话
    if (getters) {
        // 遍历了一下key 进行迭代 把getter的对象都套上computed添加到新对象中然后返回
        gettersObj = Object.keys(getters).reduce((wrapper: Record<string, any>, getterName: string) => {
            wrapper[getterName] = computed(() => getters[getterName].call(store))
            return wrapper
        }, {})
    }
    let actionsFun: Record<string, Function> = {}
    // 不为空
    if (actions) {
        // 循环遍历
        for (let event in actions) {
            // function函数是有参数的所以需要接收一下然后透传过去
            actionsFun[event] = function (...args: any[]) {
                // 通过apply传参 直接传数组
                actions[event].apply(store, args)

            }
        }
    }

    return {
        ...stateProxy, ...gettersObj, ...actionsFun
    }
}
export default defienStore