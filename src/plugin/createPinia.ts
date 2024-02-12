// 初始化pinia
import type {App} from "vue"

function install(app:App) {
    console.log(app)
}
function createPinia() {

    return {
        install
    }
}

export default createPinia